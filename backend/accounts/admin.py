from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, ClientProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ["username", "email", "role", "is_staff", "is_active"]
    list_filter = ["role", "is_staff"]
    fieldsets = UserAdmin.fieldsets + (("Role", {"fields": ("role",)}),)


@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "phone", "city", "state"]
    search_fields = ["user__username", "user__email", "phone"]