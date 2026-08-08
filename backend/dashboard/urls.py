from django.urls import path
from . import views

urlpatterns = [
    path("client/", views.ClientDashboardView.as_view(), name="client-dashboard"),
    path("admin/", views.AdminDashboardView.as_view(), name="admin-dashboard"),
    path("admin/clients/", views.AdminClientsView.as_view(), name="admin-clients"),
    path("config/", views.PublicConfigView.as_view(), name="public-config"),
    path("sitemap.xml/", views.SitemapView.as_view(), name="sitemap"),
    path("robots.txt/", views.RobotsView.as_view(), name="robots"),
]