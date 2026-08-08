from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/projects/", include("projects.urls")),
    path("api/inquiries/", include("inquiries.urls")),
    path("api/appointments/", include("appointments.urls")),
    path("api/testimonials/", include("testimonials.urls")),
    path("api/dashboard/", include("dashboard.urls")),
]

# Ensure uploaded media files and static files are served in both dev and production internet deployments
urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
]