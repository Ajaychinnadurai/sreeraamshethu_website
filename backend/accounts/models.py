from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


class User(AbstractUser):
    """Custom user model with a role field for ADMIN / CLIENT."""

    class Roles(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CLIENT = "CLIENT", "Client"

    role = models.CharField(max_length=10, choices=Roles.choices, default=Roles.CLIENT)

    def is_admin(self):
        return self.role == self.Roles.ADMIN or self.is_superuser

    def is_client(self):
        return self.role == self.Roles.CLIENT


class ClientProfile(models.Model):
    """A linked profile for a CLIENT user."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=120, blank=True, default="Rameshwaram")
    state = models.CharField(max_length=100, blank=True, default="Tamil Nadu")
    company_name = models.CharField(max_length=150, blank=True)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username}"