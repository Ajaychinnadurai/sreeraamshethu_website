from rest_framework import serializers
from .models import (
    Project,
    ProjectImage,
    ProjectMilestone,
    ProjectUpdate,
    Document,
)


class ProjectImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ["id", "url", "alt", "caption", "is_before", "is_after"]

    def get_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class ProjectMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMilestone
        fields = [
            "id", "title", "description", "due_date", "completed", "completed_on", "sort_order",
        ]


class ProjectUpdateSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    created_by = serializers.CharField(source="created_by.username", read_only=True, default="")

    class Meta:
        model = ProjectUpdate
        fields = ["id", "title", "body", "image", "image_url", "created_by", "created_at"]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class DocumentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ["id", "title", "url", "doc_type", "project", "client", "uploaded_at"]

    def get_url(self, obj):
        if obj.document:
            return obj.document.url
        return None


class ProjectListSerializer(serializers.ModelSerializer):
    cover_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "category", "location", "year",
            "short_description", "cover_url", "status", "featured",
        ]

    def get_cover_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None


class ProjectDetailSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    milestones = ProjectMilestoneSerializer(many=True, read_only=True)
    updates = ProjectUpdateSerializer(many=True, read_only=True)
    documents = serializers.SerializerMethodField()
    hero_url = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "category", "location", "year", "short_description",
            "overview", "design_concept", "materials", "cover_image", "hero_image",
            "hero_url", "cover_url", "status", "completion_percentage", "current_phase",
            "area_sqft", "duration_months", "budget", "client", "client_name", "images",
            "milestones", "updates", "documents", "featured", "is_public", "created_at",
        ]
        read_only_fields = ["cover_url", "hero_url"]

    def get_hero_url(self, obj):
        if obj.hero_image:
            return obj.hero_image.url
        if obj.cover_image:
            return obj.cover_image.url
        return None

    def get_cover_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

    def get_client_name(self, obj):
        if obj.client:
            return obj.client.get_full_name() or obj.client.username
        return None

    def get_documents(self, obj):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        if not (user and user.is_authenticated):
            return []
        if user.is_admin() or user.is_staff or obj.client_id == user.id:
            return DocumentSerializer(obj.documents.all(), many=True).data
        return []