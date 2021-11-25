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
        try:
            follower = User.objects.get(id=follower_data["id"])
        except User.DoesNotExist:
            follower = User.objects.create(follower_data)
        try:
            following = User.objects.get(id=following_data["id"])
        except User.DoesNotExist:
            following = User.objects.create(following_data)

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
        try:
            object = User.objects.get(id=object_data["id"])
        except User.DoesNotExist:
            object = User.objects.create(object_data)
        try:
            actor = User.objects.get(id=actor_data["id"])
        except User.DoesNotExist:
            actor = User.objects.create(actor_data)

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
        try:
            user1 = User.objects.get(id=user1_data["id"])
        except User.DoesNotExist:
            user1 = User.objects.create(user1_data)
        try:
            user2 = User.objects.get(id=user2_data["id"])
        except User.DoesNotExist:
            user2 = User.objects.create(user2_data)

        return Friend.objects.create(first_user=user1, second_user=user2, **validated_data)

    class Meta:
        model = Friend
        fields = ['first_user', 'second_user']
