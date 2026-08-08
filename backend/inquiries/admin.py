from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ["full_name", "phone", "project_type", "status", "created_at"]
    list_filter = ["project_type", "status"]
    search_fields = ["full_name", "phone", "email", "location"]