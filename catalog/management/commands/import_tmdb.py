from django.core.management.base import BaseCommand, CommandError

from catalog.models import MediaItem
from catalog.services.tmdb_client import TMDBClientError, discover, get_genres, to_media_item_payload


class Command(BaseCommand):
    help = 'Importa peliculas/series desde TMDB a catalog.MediaItem (paginado)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--type',
            choices=['movie', 'series', 'both'],
            default='both',
            help='Tipo de contenido a importar',
        )
        parser.add_argument(
            '--pages',
            type=int,
            default=1,
            help='Cantidad de paginas a importar por tipo (max recomendado: 500)',
        )
        parser.add_argument(
            '--language',
            default='es-ES',
            help='Idioma de TMDB para titulos/sinopsis',
        )
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Elimina el catalogo actual antes de importar',
        )

    def handle(self, *args, **options):
        pages = options['pages']
        if pages < 1:
            raise CommandError('--pages debe ser mayor o igual a 1')

        if options['reset']:
            deleted, _ = MediaItem.objects.all().delete()
            self.stdout.write(self.style.WARNING(f'Registros eliminados: {deleted}'))

        selected_type = options['type']
        content_types = ['movie', 'series'] if selected_type == 'both' else [selected_type]

        total_created = 0
        total_updated = 0
        total_skipped = 0

        try:
            for content_type in content_types:
                self.stdout.write(f'Importando tipo: {content_type}')
                tmdb_content_type = 'movie' if content_type == 'movie' else 'tv'
                genre_map = get_genres(tmdb_content_type, options['language'])

                for page in range(1, pages + 1):
                    response = discover(tmdb_content_type, page, options['language'])
                    results = response.get('results', [])
                    if not results:
                        break

                    for raw_item in results:
                        payload = to_media_item_payload(raw_item, content_type, genre_map)
                        if not payload:
                            total_skipped += 1
                            continue

                        item, created = MediaItem.objects.get_or_create(
                            title=payload['title'],
                            content_type=payload['content_type'],
                            year=payload['year'],
                            defaults={
                                'genre': payload['genre'],
                                'description': payload['description'],
                                'rating': payload['rating'],
                                'watched': False,
                                'is_favorite': False,
                            },
                        )

                        if created:
                            total_created += 1
                            continue

                        changed = False
                        if item.genre != payload['genre']:
                            item.genre = payload['genre']
                            changed = True
                        if item.description != payload['description']:
                            item.description = payload['description']
                            changed = True

                        if changed:
                            item.save(update_fields=['genre', 'description', 'updated_at'])
                            total_updated += 1

                    self.stdout.write(f'  Pagina {page}/{pages} procesada')

        except TMDBClientError as exc:
            raise CommandError(str(exc)) from exc

        self.stdout.write(
            self.style.SUCCESS(
                'Importacion completada. '
                f'Creados: {total_created}, actualizados: {total_updated}, omitidos: {total_skipped}, total catalogo: {MediaItem.objects.count()}'
            )
        )
