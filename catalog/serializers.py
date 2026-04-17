from rest_framework import serializers

from .models import MediaItem


class MediaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaItem
        fields = '__all__'

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError('La calificacion debe estar entre 1 y 5.')
        return value
