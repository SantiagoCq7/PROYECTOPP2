from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_mediaitem_is_favorite'),
    ]

    operations = [
        migrations.AddField(
            model_name='mediaitem',
            name='poster_url',
            field=models.URLField(blank=True),
        ),
    ]
