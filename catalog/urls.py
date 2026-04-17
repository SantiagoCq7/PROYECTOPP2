from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import MediaItemViewSet, recommendations_view, stats_view

router = DefaultRouter()
router.register('items', MediaItemViewSet, basename='media-item')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', stats_view, name='stats'),
    path('recommendations/', recommendations_view, name='recommendations'),
]
