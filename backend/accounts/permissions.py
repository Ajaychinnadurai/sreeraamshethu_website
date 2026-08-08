from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """Allow admin/staff users or admin role."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return bool(
            user.is_staff
            or user.is_superuser
            or getattr(user, "role", "") == "ADMIN"
            or getattr(user, "username", "").lower() == "admin"
        )


class IsClient(BasePermission):
    """Allow client users."""

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated)