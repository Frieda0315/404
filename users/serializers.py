from rest_framework import serializers
from .models import AdminUser, User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    user_name = serializers.CharField(required=True)
    github_name = serializers.CharField(required=True)
    type = serializers.CharField(required=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return User.objects.create(**validated_data)

    class Meta:
        model = User
        fields = ['id', 'user_name', 'github_name',
                  'type', 'host', 'profileImage']


class AdminUserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    user_name = serializers.CharField(required=True)
    type = serializers.CharField(required=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return AdminUser.objects.create(**validated_data)

    class Meta:
        model = AdminUser
        fields = ['id', 'user_name', 'type']
