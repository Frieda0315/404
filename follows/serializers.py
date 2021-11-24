from rest_framework import serializers
from .models import Follow, FriendRequest, Friend
from users.serializers import UserSerializer
from users.models import User


class FollowSerializer(serializers.ModelSerializer):

    follower = UserSerializer()
    following = UserSerializer()

    def create(self, validated_data):
        follower_data = validated_data.pop("follower")
        following_data = validated_data.pop("following")
        follower = User.objects.get_or_create(**follower_data)[0]
        following = User.objects.get_or_create(**following_data)[0]

        return Follow.objects.create(follower=follower, following=following, **validated_data)

    class Meta:
        model = Follow
        fields = ['follower', 'following']


class FriendRequestSerializer(serializers.ModelSerializer):

    actor = UserSerializer()
    object = UserSerializer()

    def create(self, validated_data):
        object_data = validated_data.pop("object")
        actor_data = validated_data.pop("actor")
        object = User.objects.get_or_create(**object_data)[0]
        actor = User.objects.get_or_create(**actor_data)[0]

        return FriendRequest.objects.create(object=object, actor=actor, **validated_data)

    class Meta:
        model = FriendRequest
        fields = ['type', 'actor', 'object', 'summary']


class FriendSerializer(serializers.ModelSerializer):
    first_user = UserSerializer()
    second_user = UserSerializer()

    def create(self, validated_data):
        user1_data = validated_data.pop("first_user")
        user2_data = validated_data.pop("second_user")
        user1 = User.objects.get_or_create(**user1_data)[0]
        user2 = User.objects.get_or_create(**user2_data)[0]

        return Friend.objects.create(first_user=user1, second_user=user2, **validated_data)

    class Meta:
        model = Friend
        fields = ['first_user', 'second_user']
