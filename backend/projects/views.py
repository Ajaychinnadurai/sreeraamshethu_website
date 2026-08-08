from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import IsAdmin

from .models import Project, ProjectImage, ProjectMilestone, ProjectUpdate, Document
from .serializers import (
    ProjectListSerializer,
    ProjectDetailSerializer,
    ProjectImageSerializer,
    ProjectMilestoneSerializer,
    ProjectUpdateSerializer,
    DocumentSerializer,
)


def is_admin(user):
    return bool(user and user.is_authenticated and (user.is_admin() or user.is_staff))


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"
    permission_classes = [AllowAny]
    queryset = Project.objects.prefetch_related("images", "milestones", "updates", "documents")

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return ProjectDetailSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user

        if is_admin(user):
            # admins see every project, including private ones
            return self._apply_category(qs)

        # Public listings show only published catalogue entries.
        if self.action in ("list", "metadata"):
            return self._apply_category(qs.filter(is_public=True))

        # Detail view: clients may also view their own (possibly private) projects;
        # everyone else only sees public entries.
        if user.is_authenticated and user.is_client():
            qs = qs.filter(Q(is_public=True) | Q(client=user))
        else:
            qs = qs.filter(is_public=True)
        return self._apply_category(qs)

    def _apply_category(self, qs):
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category__iexact=category)
        return qs.distinct()


class ProjectAdminViewSet(viewsets.ModelViewSet):
    """Full CRUD for admin users."""

    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    pagination_class = None

    def get_permissions(self):
        return [IsAdmin()]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProjectImagesView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        project = Project.objects.filter(pk=pk).first()
        if not project:
            return Response({"detail": "Not found."}, status=404)
        files = request.FILES.getlist("images") or request.FILES.getlist("image")
        if not files:
            return Response({"detail": "No images provided."}, status=400)
        created = []
        for f in files:
            img = ProjectImage.objects.create(
                project=project,
                image=f,
                alt=request.data.get("alt", ""),
                caption=request.data.get("caption", ""),
            )
            created.append(ProjectImageSerializer(img).data)
        return Response(created, status=201)


class ProjectImageDeleteView(APIView):
    permission_classes = [IsAdmin]

    def delete(self, request, pk):
        img = ProjectImage.objects.filter(pk=pk).first()
        if not img:
            return Response({"detail": "Not found."}, status=404)
        img.delete()
        return Response(status=204)


class MilestoneView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, project_pk):
        project = Project.objects.filter(pk=project_pk).first()
        if not project:
            return Response({"detail": "Not found."}, status=404)
        serializer = ProjectMilestoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def patch(self, request, project_pk, milestone_pk):
        ms = ProjectMilestone.objects.filter(pk=milestone_pk, project_id=project_pk).first()
        if not ms:
            return Response({"detail": "Not found."}, status=404)
        serializer = ProjectMilestoneSerializer(ms, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class ProjectUpdateView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, project_pk):
        project = Project.objects.filter(pk=project_pk).first()
        if not project:
            return Response({"detail": "Not found."}, status=404)
        serializer = ProjectUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project, created_by=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class DocumentView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        doc = Document.objects.filter(pk=pk).first()
        if not doc:
            return Response({"detail": "Not found."}, status=404)
        doc.delete()
        return Response(status=204)