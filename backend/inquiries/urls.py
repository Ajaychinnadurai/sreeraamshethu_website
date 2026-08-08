from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"", views.InquiryViewSet, basename="inquiry")

urlpatterns = [
    path("create/", views.InquiryCreateView.as_view(), name="inquiry-create"),
    path("", include(router.urls)),
]