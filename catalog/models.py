from django.db import models


class MediaItem(models.Model):
	TYPE_CHOICES = [
		('movie', 'Pelicula'),
		('series', 'Serie'),
	]

	title = models.CharField(max_length=200)
	content_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
	genre = models.CharField(max_length=100)
	year = models.PositiveIntegerField()
	poster_url = models.URLField(blank=True)
	description = models.TextField(blank=True)
	watched = models.BooleanField(default=False)
	is_favorite = models.BooleanField(default=False)
	rating = models.PositiveSmallIntegerField(default=1)
	owner = models.ForeignKey('auth.User', related_name='media_items', on_delete=models.CASCADE, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-updated_at', '-created_at']

	def __str__(self):
		return f'{self.title} ({self.get_content_type_display()})'
