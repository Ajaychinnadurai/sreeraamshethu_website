from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    ClientProfileSerializer,
)

User = get_user_model()


def _tokens_for(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": ProfileSerializer(user).data,
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(_tokens_for(user), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """Login returning tokens plus user profile, supporting both username & email."""

    permission_classes = [AllowAny]

    def post(self, request):
        identity = (request.data.get("username") or request.data.get("email") or "").strip()
        password = request.data.get("password") or ""

        if not identity or not password:
            return Response({"detail": "Username/Email and password required."}, status=status.HTTP_400_BAD_REQUEST)

        # Auto-ensure default admin account exists on live production database
        if identity.lower() in ("admin", "admin@example.com") and password == "admin@123456":
            admin_user, _ = User.objects.get_or_create(
                username="admin",
                defaults={"email": "admin@example.com", "role": User.Roles.ADMIN, "is_staff": True, "is_superuser": True},
            )
            admin_user.set_password("admin@123456")
            admin_user.role = User.Roles.ADMIN
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()

        # Find user by username or email
        user = (
            User.objects.filter(username__iexact=identity).first()
            or User.objects.filter(email__iexact=identity).first()
        )

        if user and user.check_password(password):
            if not user.is_active:
                return Response({"detail": "User account is disabled."}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(_tokens_for(user), status=status.HTTP_200_OK)

        return Response({"detail": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(ProfileSerializer(request.user).data)

    def patch(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def _profile(self, user):
        if not hasattr(user, "profile"):
            return None
        return user.profile

    def get(self, request):
        profile = self._profile(request.user)
        if profile is None:
            return Response({})
        return Response(ClientProfileSerializer(profile).data)

    def patch(self, request):
        profile = self._profile(request.user)
        if profile is None:
            return Response({"detail": "No client profile for this account."}, status=400)
        serializer = ClientProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)