from django.db import models


class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    project_type = models.CharField(max_length=120, blank=True)
    location = models.CharField(max_length=200, blank=True, default="Rameshwaram, Tamil Nadu")
    review = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5, help_text="1-5")
    profile_image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_name} - {self.rating} stars"