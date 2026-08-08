from django.conf import settings
from django.db import models


class Project(models.Model):
    class Category(models.TextChoices):
        RESIDENTIAL = "Residential", "Residential"
        COMMERCIAL = "Commercial", "Commercial"
        INTERIORS = "Interiors", "Interiors"
        RENOVATION = "Renovation", "Renovation"

    class Status(models.TextChoices):
        PLANNING = "Planning", "Planning"
        IN_PROGRESS = "In Progress", "In Progress"
        COMPLETED = "Completed", "Completed"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    category = models.CharField(max_length=30, choices=Category.choices)
    location = models.CharField(max_length=200, default="Rameshwaram, Tamil Nadu")
    year = models.PositiveIntegerField(null=True, blank=True)
    short_description = models.TextField(max_length=400, blank=True)
    overview = models.TextField(blank=True)
    design_concept = models.TextField(blank=True)
    materials = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    hero_image = models.ImageField(upload_to="projects/hero/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLANNING)
    completion_percentage = models.PositiveIntegerField(default=0)
    current_phase = models.CharField(max_length=120, blank=True)
    area_sqft = models.PositiveIntegerField(blank=True, null=True)
    duration_months = models.PositiveIntegerField(blank=True, null=True)
    budget = models.DecimalField(max_digits=14, decimal_places=2, blank=True, null=True)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="projects",
    )
    featured = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-featured", "-created_at"]

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="projects/gallery/")
    alt = models.CharField(max_length=200, blank=True)
    caption = models.CharField(max_length=200, blank=True)
    is_before = models.BooleanField(default=False, help_text="Mark as before image for before/after.")
    is_after = models.BooleanField(default=False, help_text="Mark as after image for before/after.")
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.project.title} image {self.id}"


class ProjectMilestone(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="milestones")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    completed_on = models.DateField(null=True, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title


class ProjectUpdate(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="updates")
    title = models.CharField(max_length=200)
    body = models.TextField()
    image = models.ImageField(upload_to="projects/updates/", blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Document(models.Model):
    class DocType(models.TextChoices):
        CONTRACT = "Contract", "Contract"
        INVOICE = "Invoice", "Invoice"
        PLAN = "Plan", "Plan"
        REPORT = "Report", "Report"
        OTHER = "Other", "Other"

    title = models.CharField(max_length=200)
    document = models.FileField(upload_to="documents/")
    doc_type = models.CharField(max_length=20, choices=DocType.choices, default=DocType.OTHER)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True, related_name="documents")
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="documents",
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="uploads"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title