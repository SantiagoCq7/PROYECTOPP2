from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


TEST_USERS = [
    {
        'username': 'testuser',
        'email': 'testuser@cinelog.dev',
        'password': 'Test1234!',
        'is_staff': False,
    },
    {
        'username': 'admin',
        'email': 'admin@cinelog.dev',
        'password': 'Admin1234!',
        'is_staff': True,
        'is_superuser': True,
    },
]


class Command(BaseCommand):
    help = 'Crea usuarios de prueba predefinidos para desarrollo.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Elimina los usuarios de prueba existentes antes de crearlos de nuevo.',
        )

    def handle(self, *args, **options):
        if options['reset']:
            usernames = [u['username'] for u in TEST_USERS]
            deleted, _ = User.objects.filter(username__in=usernames).delete()
            self.stdout.write(self.style.WARNING(f'  {deleted} usuario(s) eliminado(s).'))

        for data in TEST_USERS:
            username = data['username']
            if User.objects.filter(username=username).exists():
                self.stdout.write(self.style.WARNING(f'  [SKIP] "{username}" ya existe.'))
                continue

            username_str: str = str(data['username'])
            email_str: str = str(data['email'])
            password_str: str = str(data['password'])

            if data.get('is_superuser'):
                user = User.objects.create_superuser(
                    username=username_str,
                    email=email_str,
                    password=password_str,
                )
                user.is_staff = True
                user.save()
            else:
                user = User.objects.create_user(
                    username=username_str,
                    email=email_str,
                    password=password_str,
                    is_staff=bool(data.get('is_staff', False)),
                )

            self.stdout.write(
                self.style.SUCCESS(
                    f'  [OK] Usuario creado: {user.username} | {data["email"]} | pass: {data["password"]}'
                )
            )

        self.stdout.write(self.style.SUCCESS('\nSeed de usuarios completado.'))
