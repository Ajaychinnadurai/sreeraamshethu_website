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
        if not self.request.user.is_authenticated or not (self.request.user.is_admin() or self.request.user.is_staff):
            return Testimonial.objects.filter(is_published=True)
        return super().get_queryset()