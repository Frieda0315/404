from rest_framework import serializers
from .models import AdminUser, User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField()

    def create(self, validated_data):
        # print(validated_data.pop("id"))
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.type = validated_data.get('type', instance.type)
        instance.id = validated_data.get('id', instance.id)
        instance.host = validated_data.get(
            'host', instance.host)
        instance.displayName = validated_data.get(
            'displayName', instance.displayName)

        instance.url = validated_data.get(
            'url', instance.url)
        instance.github = validated_data.get(
            'github', instance.github)
        instance.profileImage = validated_data.get(
            'profileImage', instance.profileImage)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        # instance is current data in DB, validated_data is new incoming data
        return instance

    class Meta:
        model = User
        fields = ['type', 'id', 'host',
                  'displayName', 'url',
                  'github', 'profileImage']


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
