from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsAdmin, IsClient

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = AppointmentSerializer
    pagination_class = None

    def get_permissions(self):
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin() or user.is_staff:
            return Appointment.objects.select_related("client").all()
        return Appointment.objects.filter(client=user)

    def perform_create(self, serializer):
        # New bookings are always created as Pending and tied to the requester;
        # callers cannot set their own status.
        serializer.save(client=self.request.user, status=Appointment.Status.PENDING)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        user = request.user
        if user.is_admin() or user.is_staff:
            data = request.data
        else:
            # Clients may update scheduling details but never their own status.
            data = {k: v for k, v in request.data.items() if k in ["purpose", "notes", "date", "time_slot"]}
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)