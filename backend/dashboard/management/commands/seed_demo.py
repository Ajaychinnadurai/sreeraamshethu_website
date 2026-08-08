"""Seed demo data: python manage.py seed_demo"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import date, timedelta

from accounts.models import ClientProfile
from projects.models import (
    Project, ProjectImage, ProjectMilestone, ProjectUpdate, Document,
)
from inquiries.models import Inquiry
from appointments.models import Appointment
from testimonials.models import Testimonial

User = get_user_model()


class Command(BaseCommand):
    help = "Populate the database with demo data."

    def handle(self, *args, **options):
        admin, _ = User.objects.get_or_create(
            username="admin",
            defaults={"email": "admin@example.com", "role": User.Roles.ADMIN, "is_staff": True, "is_superuser": True},
        )
        if _:
            admin.set_password("admin@123456")
            admin.role = User.Roles.ADMIN
            admin.is_staff = True
            admin.is_superuser = True
            admin.save()
        self.stdout.write(self.style.SUCCESS("Admin: admin / admin@123456"))

        client_user, _ = User.objects.get_or_create(
            username="client",
            defaults={"email": "client@example.com", "role": User.Roles.CLIENT},
        )
        client_user.set_password("client@123456")
        client_user.first_name = "Ravi"
        client_user.last_name = "Kumar"
        client_user.save()
        ClientProfile.objects.get_or_create(
            user=client_user,
            defaults={"phone": "+91 99999 99999", "address": "Mandapam Road, Rameswaram", "city": "Rameshwram"},
        )
        self.stdout.write(self.style.SUCCESS("Client: client / client@123456"))

        second_client, _ = User.objects.get_or_create(
            username="ashok",
            defaults={"email": "ashok@example.com", "role": User.Roles.CLIENT},
        )
        second_client.set_password("client@123456")
        second_client.first_name = "Ashok"
        second_client.last_name = "Meena"
        second_client.save()
        ClientProfile.objects.get_or_create(
            user=second_client,
            defaults={"phone": "+91 98888 88888", "address": "Agnitheertham Road, Rameswaram", "city": "Rameswaram"},
        )

        projects_spec = [
            {
                "slug": "the-coastal-residence", "title": "The Coastal Residence",
                "category": "Residential", "location": "Rameswaram, Tamil Nadu", "year": 2025,
                "short_description": "A coastal villa engineered for durability, light and calm modern living in Rameswaram.",
                "overview": "A 4,200 sq ft luxury villa designed to withstand the coastal climate while embracing open air and natural light.",
                "design_concept": "Contemporary architecture blended with coastal heritage, courtyards, natural ventilation and layered light.",
                "materials": "Reinforced concrete, marine-grade coating, terracotta accents, natural stone cladding.",
                "area_sqft": 4200, "duration_months": 14, "status": "Completed", "completion_percentage": 100,
                "current_phase": "Handover", "featured": True, "client": client_user,
            },
            {
                "slug": "bayfront-commercial-centre", "title": "Bayfront Commercial Centre",
                "category": "Commercial", "location": "Rameswaram, Tamil Nadu", "year": 2026,
                "short_description": "A commercial premise designed around function, flow and long-term value.",
                "overview": "A multi-tenant commercial centre that prioritises efficient planning and tenant circulation.",
                "design_concept": "A robust structural grid with clear circulation and an architectural facade tuned for coastal conditions.",
                "materials": "Architectural steel, glass, anti-corrosion cladding and exposed concrete.",
                "area_sqft": 12000, "duration_months": 16, "status": "In Progress", "completion_percentage": 72,
                "current_phase": "Interior Finishing", "featured": True, "client": second_client,
            },
            {
                "slug": "serene-villa-interiors", "title": "Serene Villa Interiors",
                "category": "Interiors", "location": "Rameswaram, Tamil Nadu", "year": 2025,
                "short_description": "Contemporary interiors that balance material, light and calm.",
                "overview": "A bespoke interior project balancing warm minimalism with contemporary tranquillity.",
                "design_concept": "Interlaced neutrals, warm timber, soft lighting and curated furniture pieces.",
                "materials": "Warm oak, limestone, brushed brass and handwoven textiles.",
                "area_sqft": 2600, "status": "Completed", "completion_percentage": 100,
                "current_phase": "Handover", "featured": True, "client": client_user,
            },
            {
                "slug": "heritage-home-renovation", "title": "Heritage Home Renovation",
                "category": "Renovation", "location": "Rameswaram, Tamil Nadu", "year": 2025,
                "short_description": "A thoughtful modern renovation of a heritage family home.",
                "overview": "Restoring a heritage residence while adding modern layouts, services and detailing.",
                "design_concept": "Respect for heritage balanced with functional modern planning.",
                "materials": "Recycled teak, lime plaster, stone masonry and modern fixtures.",
                "area_sqft": 1900, "status": "Completed", "completion_percentage": 100,
                "current_phase": "Handover", "featured": False, "client": None,
            },
            {
                "slug": "compact-contemporary-home", "title": "Compact Contemporary Home",
                "category": "Residential", "location": "Ramanathapuram, Tamil Nadu", "year": 2026,
                "short_description": "A smart, compact home built for modern coastal living.",
                "overview": "A space-efficient home that maximises usability and light on a small footprint.",
                "design_concept": "Compact planning, dual-purpose spaces and light-frame construction.",
                "materials": "Concrete, steel frames, composite cladding.",
                "area_sqft": 1100, "duration_months": 10, "status": "In Progress", "completion_percentage": 40,
                "current_phase": "Structural Work", "featured": False, "client": second_client,
            },
        ]

        projects = []
        for spec in projects_spec:
            client = spec.pop("client", None)
            s, created = Project.objects.get_or_create(
                slug=spec["slug"], defaults={**spec, "client": client},
            )
            if created:
                # milestones
                ProjectMilestone.objects.get_or_create(
                    project=s, title="Site Assessment & Layout",
                    defaults={"description": "Survey, layout and feasibility.", "completed": True},
                )
                ProjectMilestone.objects.get_or_create(
                    project=s, title="Foundation",
                    defaults={"description": "Excavation and foundations.", "completed": True},
                )
                ProjectMilestone.objects.get_or_create(
                    project=s, title="Structural Work",
                    defaults={"description": "Frame and structural core.", "completed": s.status == "Completed"},
                )
                ProjectMilestone.objects.get_or_create(
                    project=s, title="Interior Finishing",
                    defaults={"description": "Finishes, services and detailing.",
                              "completed": s.status == "Completed"},
                )
            projects.append(s)

        # Sep commit helper
        for p in projects:
            ProjectUpdate.objects.get_or_create(
                project=p, title=f"{p.title} — update note",
                defaults={
                    "body": "Work progressed according to plan with materials and site quality checked at each stage.",
                    "created_by": admin,
                },
            )

        # demo document
        Document.objects.get_or_create(
            title="Construction Agreement — Demo",
            defaults={
                "doc_type": "Contract",
                "project": projects[0],
                "client": client_user,
                "uploaded_by": admin,
            },
        )

        inquiries_spec = [
            {"full_name": "Meera Raman", "phone": "+91 91234 56789", "email": "meera@example.com",
             "project_type": "Residential", "budget": "60-80 Lakh", "project_description": "Looking to build a 3BHK in Rameswaram."},
            {"full_name": "Arun Prakash", "phone": "+91 90000 11111", "email": "arun@example.com",
             "project_type": "Interior", "budget": "10-15 Lakh", "project_description": "Full home interiors for a renovated flat."},
            {"full_name": "Lakshmi N", "phone": "+91 94444 22222", "email": "lakshmi@example.com",
             "project_type": "Turnkey", "budget": "₹1 Cr+", "project_description": "Turnkey construction of a commercial building."},
        ]
        for q in inquiries_spec:
            Inquiry.objects.get_or_create(
                full_name=q["full_name"], phone=q["phone"],
                defaults={"email": q["email"], "project_type": q["project_type"],
                          "budget": q["budget"], "project_description": q["project_description"]},
            )

        Appointment.objects.get_or_create(
            client=client_user, date=date.today() + timedelta(days=5), time_slot="11:00 AM",
            defaults={"full_name": "Ravi Kumar", "phone": "+91 99999 99999", "status": "Approved", "purpose": "Project walkthrough"},
        )

        testimonials_spec = [
            {"client_name": "Vijay", "project_type": "Residential", "review": "From planning to execution, the entire process was handled with professionalism and attention to detail.", "rating": 5},
            {"client_name": "Priya", "project_type": "Interiors", "review": "The interiors are exactly what I imagined. Clean, elegant and perfectly finished.", "rating": 5},
            {"client_name": "Suresh", "project_type": "Renovation", "review": "Transparent communication and quality workmanship from start to finish.", "rating": 5},
        ]
        for t in testimonials_spec:
            Testimonial.objects.get_or_create(
                client_name=t["client_name"], defaults=t,
            )

        self.stdout.write(self.style.SUCCESS(f"Done. {Project.objects.count()} projects, {User.objects.filter(role='CLIENT').count()} clients, {Inquiry.objects.count()} inquiries."))