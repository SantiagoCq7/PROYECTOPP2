from django.db.models import Avg, Count
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import MediaItem
from .serializers import MediaItemSerializer


class MediaItemViewSet(viewsets.ModelViewSet):
	serializer_class = MediaItemSerializer
	queryset = MediaItem.objects.all()

	def get_queryset(self):
		queryset = super().get_queryset()
		genre = self.request.query_params.get('genre')
		if genre:
			queryset = queryset.filter(genre__iexact=genre)
		return queryset


@api_view(['GET'])
def stats_view(request):
	watched_items = MediaItem.objects.filter(watched=True)
	top_genre_data = (
		watched_items.values('genre').annotate(total=Count('id')).order_by('-total').first()
	)
	avg_rating = watched_items.aggregate(avg=Avg('rating')).get('avg') or 0
	total_watched = watched_items.count()

	return Response(
		{
			'top_genre': top_genre_data['genre'] if top_genre_data else None,
			'total_watched': total_watched,
			'total_favorites': MediaItem.objects.filter(is_favorite=True).count(),
			'average_rating': round(float(avg_rating), 2) if avg_rating else 0,
			'watched_movies': watched_items.filter(content_type='movie').count(),
			'watched_series': watched_items.filter(content_type='series').count(),
		}
	)


@api_view(['GET'])
def recommendations_view(request):
	watched_items = MediaItem.objects.filter(watched=True)
	top_genre_data = (
		watched_items.values('genre').annotate(total=Count('id')).order_by('-total').first()
	)

	if not top_genre_data:
		return Response({'results': []})

	favorite_genre = top_genre_data['genre']
	recommendations = (
		MediaItem.objects.filter(watched=False, genre__iexact=favorite_genre)
		.order_by('-rating', '-year')[:5]
	)

	serializer = MediaItemSerializer(recommendations, many=True)
	return Response({'favorite_genre': favorite_genre, 'results': serializer.data})
