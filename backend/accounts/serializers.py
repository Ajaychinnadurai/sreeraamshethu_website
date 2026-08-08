from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ClientProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "full_name", "role"]

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username


class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = ["phone", "address", "city", "state", "company_name", "profile_image"]


class ProfileSerializer(serializers.ModelSerializer):
    profile = ClientProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role", "profile"]
        read_only_fields = ["role"]


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, allow_blank=True, required=False)
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"username": "Username already taken."})
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "Email already registered."})
        return attrs

    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        validated_data.pop("password2", None)
        password = validated_data.pop("password")
        user = User(**validated_data, role=User.Roles.CLIENT)
        user.set_password(password)
        user.save()
        ClientProfile.objects.create(user=user, phone=phone)
        return user