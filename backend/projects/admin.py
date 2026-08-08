from django.contrib import admin
from .models import (
    Project,
    ProjectImage,
    ProjectMilestone,
    ProjectUpdate,
    Document,
)


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


class ProjectMilestoneInline(admin.TabularInline):
    model = ProjectMilestone
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "location", "year", "status", "featured", "is_public"]
    list_filter = ["category", "status", "featured"]
    search_fields = ["title", "location"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectImageInline, ProjectMilestoneInline]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ["project", "alt", "is_before", "is_after"]
    list_filter = ["project"]


@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ["title", "project", "created_at"]
    list_filter = ["project"]


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ["title", "doc_type", "project", "client", "uploaded_at"]
    list_filter = ["doc_type"]