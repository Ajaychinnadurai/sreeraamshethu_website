from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["client_name", "project_type", "rating", "is_published", "location"]
    list_filter = ["is_published", "rating"]
    search_fields = ["client_name", "project_type"]