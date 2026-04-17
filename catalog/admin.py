from django.contrib import admin
from .models import MediaItem


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
	list_display = ('title', 'content_type', 'genre', 'year', 'watched', 'rating')
	list_filter = ('content_type', 'genre', 'watched')
	search_fields = ('title', 'genre')
