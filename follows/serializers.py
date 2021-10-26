from rest_framework import serializers
from .models import Follow
from users.serializers import UserSerializer


class FollowSerializer(serializers.ModelSerializer):

    follower = UserSerializer()
    id = serializers.UUIDField()

    class Meta:
        model = Follow
        fields = ['type', 'id', 'follower']
