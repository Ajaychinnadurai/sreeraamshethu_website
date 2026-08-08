from django.conf import settings
from django.db import models


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        APPROVED = "Approved", "Approved"
        RESCHEDULED = "Rescheduled", "Rescheduled"
        CANCELLED = "Cancelled", "Cancelled"
        COMPLETED = "Completed", "Completed"

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments"
    )
    full_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    date = models.DateField()
    time_slot = models.CharField(max_length=20, blank=True)
    purpose = models.CharField(max_length=200, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "time_slot"]

    def __str__(self):
        return f"{self.full_name or self.client} - {self.date}"