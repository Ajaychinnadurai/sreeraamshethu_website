from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ["client", "full_name", "date", "time_slot", "status"]
    list_filter = ["status", "date"]
    search_fields = ["full_name", "phone", "client__username"]