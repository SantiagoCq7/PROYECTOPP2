from django.core.management.base import BaseCommand

from catalog.models import MediaItem


SEED_ITEMS = [
    {
        "title": "Inception",
        "content_type": "movie",
        "genre": "Ciencia Ficcion",
        "year": 2010,
        "description": "Un ladrón entra en sueños para robar secretos corporativos.",
        "watched": True,
        "is_favorite": True,
        "rating": 5,
    },
    {
        "title": "Interstellar",
        "content_type": "movie",
        "genre": "Ciencia Ficcion",
        "year": 2014,
        "description": "Una misión espacial busca salvar a la humanidad.",
        "watched": True,
        "is_favorite": True,
        "rating": 5,
    },
    {
        "title": "Blade Runner 2049",
        "content_type": "movie",
        "genre": "Ciencia Ficcion",
        "year": 2017,
        "description": "Un replicante descubre un secreto que puede cambiar el mundo.",
        "watched": False,
        "is_favorite": False,
        "rating": 4,
    },
    {
        "title": "Dune",
        "content_type": "movie",
        "genre": "Ciencia Ficcion",
        "year": 2021,
        "description": "El heredero de una casa noble enfrenta su destino en Arrakis.",
        "watched": False,
        "is_favorite": False,
        "rating": 4,
    },
    {
        "title": "The Matrix",
        "content_type": "movie",
        "genre": "Ciencia Ficcion",
        "year": 1999,
        "description": "Un hacker descubre la verdad sobre su realidad.",
        "watched": True,
        "is_favorite": True,
        "rating": 5,
    },
    {
        "title": "Breaking Bad",
        "content_type": "series",
        "genre": "Drama",
        "year": 2008,
        "description": "Un profesor de química se convierte en fabricante de metanfetamina.",
        "watched": True,
        "is_favorite": True,
        "rating": 5,
    },
    {
        "title": "The Bear",
        "content_type": "series",
        "genre": "Drama",
        "year": 2022,
        "description": "Un chef vuelve a su ciudad para salvar el restaurante familiar.",
        "watched": False,
        "is_favorite": False,
        "rating": 4,
    },
    {
        "title": "Succession",
        "content_type": "series",
        "genre": "Drama",
        "year": 2018,
        "description": "Una familia multimillonaria lucha por el control de su imperio.",
        "watched": True,
        "is_favorite": False,
        "rating": 4,
    },
    {
        "title": "Parasite",
        "content_type": "movie",
        "genre": "Thriller",
        "year": 2019,
        "description": "Dos familias de clases sociales opuestas cruzan sus destinos.",
        "watched": True,
        "is_favorite": False,
        "rating": 5,
    },
    {
        "title": "Mindhunter",
        "content_type": "series",
        "genre": "Thriller",
        "year": 2017,
        "description": "Agentes del FBI entrevistan asesinos seriales para entender su mente.",
        "watched": False,
        "is_favorite": False,
        "rating": 4,
    },
    {
        "title": "The Last of Us",
        "content_type": "series",
        "genre": "Aventura",
        "year": 2023,
        "description": "Un contrabandista protege a una joven en un mundo postapocalíptico.",
        "watched": True,
        "is_favorite": True,
        "rating": 5,
    },
    {
        "title": "Mad Max: Fury Road",
        "content_type": "movie",
        "genre": "Aventura",
        "year": 2015,
        "description": "Persecución frenética en un desierto postapocalíptico.",
        "watched": False,
        "is_favorite": False,
        "rating": 4,
    },
]


class Command(BaseCommand):
    help = "Carga datos de prueba en catalog.MediaItem"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Elimina todos los MediaItem antes de sembrar datos",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            deleted, _ = MediaItem.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Registros eliminados: {deleted}"))

        created_count = 0
        updated_count = 0

        for item_data in SEED_ITEMS:
            _, created = MediaItem.objects.update_or_create(
                title=item_data["title"],
                defaults=item_data,
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        total_items = MediaItem.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Seed completado. Creados: {created_count}, actualizados: {updated_count}, total actual: {total_items}."
            )
        )