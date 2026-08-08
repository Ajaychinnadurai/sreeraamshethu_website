from rest_framework import serializers
from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            "id", "full_name", "phone", "email", "project_type", "location",
            "budget", "project_description", "status", "assigned_manager",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "assigned_manager", "created_at", "updated_at"]