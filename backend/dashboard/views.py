from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse

from accounts.permissions import IsAdmin
from accounts.models import User

from projects.models import Project, ProjectImage, ProjectMilestone, ProjectUpdate, Document
from inquiries.models import Inquiry
from appointments.models import Appointment
from testimonials.models import Testimonial
from .serializers import get_client_dashboard_data, get_admin_dashboard_data


class ClientDashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication required."}, status=401)
        if not user.is_client() or user.is_staff:
            return Response({"detail": "Not allowed."}, status=403)
        data = get_client_dashboard_data(user)
        return Response(data)


class AdminDashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication required."}, status=401)
        if not (user.is_admin() or user.is_staff):
            return Response({"detail": "Not allowed."}, status=403)
        data = get_admin_dashboard_data()
        return Response(data)


class AdminClientsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if not user.is_authenticated or not (user.is_admin() or user.is_staff):
            return Response({"detail": "Not allowed."}, status=403)
        clients = User.objects.filter(role=User.Roles.CLIENT).select_related("profile")
        return Response([
            {
                "id": c.id,
                "username": c.username,
                "email": c.email,
                "full_name": c.get_full_name() or c.username,
                "phone": c.profile.phone if hasattr(c, "profile") else "",
                "active": c.is_active,
                "has_projects": c.projects.exists(),
            }
            for c in clients
        ])


class PublicConfigView(APIView):
    """Serve public site config (contact info, integrations) for the frontend."""

    permission_classes = [AllowAny]

    def get(self, request):
        from django.conf import settings
        return Response({
            "business_name": "Sree Raam Shethu Constructions & Interiors",
            "location": "Rameshwaram, Tamil Nadu, India",
            "phone": settings.CONTACT_PHONE,
            "email": settings.CONTACT_EMAIL,
            "whatsapp": settings.WHATSAPP_NUMBER,
            "ga_measurement_id": settings.GA_MEASUREMENT_ID,
            "gtm_id": settings.GTM_ID,
            "maps_embed": "https://www.google.com/maps/embed?pb=Rameshwaram",
        })


class SitemapView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        base = request.build_absolute_uri("/").rstrip("/")
        routes = ["", "about", "services", "projects", "interiors", "process", "contact"]
        urls = [f"{base}/{r}" for r in routes]
        projects = Project.objects.filter(is_public=True)
        chapters = [f"{base}/projects/{p.slug}" for p in projects]
        body = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"]
        for u in urls + chapters:
            body.append(f"  <url><loc>{u}</loc></url>")
        body.append("</urlset>")
        return HttpResponse("\n".join(body), content_type="application/xml")


class RobotsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        base = request.build_absolute_uri("/").rstrip("/")
        text = f"User-agent: *\nDisallow: /admin/\nDisallow: /client/\nAllow: /\n\nSitemap: {base}/api/dashboard/sitemap.xml/\n"
        return HttpResponse(text, content_type="text/plain")