from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsAdmin

from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    http_method_names = ["get", "post", "patch", "delete", "put"]
    pagination_class = None

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAdmin()]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return Testimonial.objects.filter(is_published=True)
        if getattr(user, "is_staff", False) or getattr(user, "is_superuser", False) or getattr(user, "role", "") == "ADMIN":
            return Testimonial.objects.all()
        return Testimonial.objects.filter(is_published=True)