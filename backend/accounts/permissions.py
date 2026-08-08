from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """Allow only admin/staff users."""

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and (user.is_admin() or user.is_staff))


class IsClient(BasePermission):
    """Allow only client users."""

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.is_client() and not user.is_staff)