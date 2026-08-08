from django.db import models


class Inquiry(models.Model):
    class ProjectType(models.TextChoices):
        RESIDENTIAL = "Residential", "Residential"
        COMMERCIAL = "Commercial", "Commercial"
        INTERIOR = "Interior", "Interior"
        RENOVATION = "Renovation", "Renovation"
        TURNKEY = "Turnkey", "Turnkey"

    class Status(models.TextChoices):
        NEW = "New", "New"
        CONTACTED = "Contacted", "Contacted"
        IN_PROGRESS = "In Progress", "In Progress"
        CONVERTED = "Converted", "Converted"
        CLOSED = "Closed", "Closed"

    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    project_type = models.CharField(max_length=20, choices=ProjectType.choices, default=ProjectType.RESIDENTIAL)
    location = models.CharField(max_length=200, blank=True)
    budget = models.CharField(max_length=120, blank=True)
    project_description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    assigned_manager = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} - {self.project_type}"