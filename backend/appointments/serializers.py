from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            "id", "client", "client_name", "full_name", "phone", "date",
            "time_slot", "purpose", "notes", "status", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "client", "client_name", "created_at", "updated_at"]

    def get_client_name(self, obj):
        if obj.client:
            return obj.client.get_full_name() or obj.client.username
        return ""