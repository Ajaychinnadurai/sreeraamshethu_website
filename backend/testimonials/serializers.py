from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "id",
            "client_name",
            "project_type",
            "location",
            "review",
            "rating",
            "profile_image",
            "image_url",
            "is_published",
            "created_at",
        ]
        read_only_fields = ["image_url"]

    def get_image_url(self, obj):
        if obj.profile_image:
            return obj.profile_image.url
        return None