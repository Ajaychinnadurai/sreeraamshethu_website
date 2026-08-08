from django.utils import timezone
from accounts.models import User, ClientProfile
from projects.models import Project, ProjectImage, ProjectMilestone, ProjectUpdate, Document
from inquiries.models import Inquiry
from appointments.models import Appointment
from testimonials.models import Testimonial


def _project_summary(p):
    return {
        "id": p.id,
        "title": p.title,
        "slug": p.slug,
        "category": p.category,
        "status": p.status,
        "completion_percentage": p.completion_percentage,
        "current_phase": p.current_phase,
        "location": p.location,
        "cover_url": p.cover_image.url if p.cover_image else None,
    }


def get_client_dashboard_data(user):
    projects = user.projects.prefetch_related("milestones", "images", "updates", "documents")

    project_data = []
    for p in projects:
        milestones = [
            {
                "id": m.id,
                "title": m.title,
                "completed": m.completed,
                "due_date": m.due_date.isoformat() if m.due_date else None,
                "description": m.description,
            }
            for m in p.milestones.all()
        ]
        project_data.append({
            "project": _project_summary(p),
            "milestones": milestones,
            "images": [
                {"id": i.id, "url": i.image.url if i.image else None, "caption": i.caption}
                for i in p.images.all()
            ],
            "updates": [
                {"id": u.id, "title": u.title, "body": u.body,
                 "image": u.image.url if u.image else None, "created_at": u.created_at.isoformat()}
                for u in p.updates.all()
            ],
            "documents": [
                {"id": d.id, "title": d.title, "url": d.document.url if d.document else None,
                 "doc_type": d.doc_type}
                for d in p.documents.all()
            ],
        })

    upcoming = Appointment.objects.filter(
        client=user, status__in=["Approved", "Pending"]
    ).order_by("date").values("id", "date", "time_slot", "purpose", "status")

    profile = None
    if hasattr(user, "profile"):
        profile = {
            "phone": user.profile.phone,
            "address": user.profile.address,
            "city": user.profile.city,
            "state": user.profile.state,
            "company_name": user.profile.company_name,
        }

    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.get_full_name() or user.username,
            "role": user.role,
            "profile": profile,
        },
        "projects": project_data,
        "appointments": list(upcoming),
    }


def get_admin_dashboard_data():
    return {
        "counts": {
            "projects": Project.objects.count(),
            "clients": User.objects.filter(role=User.Roles.CLIENT).count(),
            "inquiries": Inquiry.objects.count(),
            "new_inquiries": Inquiry.objects.filter(status=Inquiry.Status.NEW).count(),
            "appointments": Appointment.objects.count(),
            "pending_appointments": Appointment.objects.filter(status=Appointment.Status.PENDING).count(),
            "testimonials": Testimonial.objects.count(),
            "documents": Document.objects.count(),
        },
        "recent_inquiries": list(
            Inquiry.objects.order_by("-created_at")[:8].values(
                "id", "full_name", "phone", "project_type", "status", "created_at"
            )
        ),
        "recent_appointments": list(
            Appointment.objects.order_by("-created_at")[:8].values(
                "id", "full_name", "date", "time_slot", "status"
            )
        ),
        "projects": [
            {
                **_project_summary(p),
                "client_name": (p.client.get_full_name() or p.client.username) if p.client else None,
            }
            for p in Project.objects.select_related("client").order_by("-created_at")[:20]
        ],
    }