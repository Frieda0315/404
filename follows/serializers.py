from rest_framework import serializers
from .models import Follow
from users.serializers import UserSerializer
from users.models import User

class FollowSerializer(serializers.ModelSerializer):

    follower = UserSerializer()
    following = UserSerializer()

    def create(self, validated_data):
        follower_data = validated_data.pop("follower")
        following_data = validated_data.pop("following")
        follower = User.objects.get(**follower_data)
        following = User.objects.get(**following_data)

        return Follow.objects.create(follower=follower, following=following, **validated_data)


    class Meta:
        model = Follow
        fields = ['type', 'follower', 'following']
