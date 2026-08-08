from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

public_router = DefaultRouter()
public_router.register(r"", views.ProjectViewSet, basename="project")

admin_router = DefaultRouter()
admin_router.register(r"admin/projects", views.ProjectAdminViewSet, basename="project-admin")

urlpatterns = public_router.urls

urlpatterns += [
    path("", include(admin_router.urls)),
    path("<int:pk>/images/", views.ProjectImagesView.as_view(), name="project-images"),
    path("images/<int:pk>/", views.ProjectImageDeleteView.as_view(), name="project-image-delete"),
    path("<int:project_pk>/milestones/", views.MilestoneView.as_view(), name="project-milestones"),
    path("<int:project_pk>/milestones/<int:milestone_pk>/", views.MilestoneView.as_view(), name="project-milestone-detail"),
    path("<int:project_pk>/updates/", views.ProjectUpdateView.as_view(), name="project-updates"),
    path("documents/", views.DocumentView.as_view(), name="documents"),
    path("documents/<int:pk>/", views.DocumentView.as_view(), name="document-detail"),
]