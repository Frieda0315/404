from rest_framework import serializers
from .models import Follow, Inbox
from likes.serializers import LikeSerializer
from posts.serializers import PostSerializer
from users.serializers import UserSerializer
from likes.models import Like
from users.models import User
from posts.models import Post


class FollowSerializer(serializers.ModelSerializer):

    id = serializers.UUIDField()
    actor = UserSerializer()
    object = UserSerializer()

    def create(self, validated_data):
        return Follow.objects.create(**validated_data)
        # author_data = validated_data.pop('author')
        # author = User.objects.get(**author_data)
        # print(author)
        # return Comment.objects.create(author=author, **validated_data)

    class Meta:
        model = Follow
        fields = ['id', 'object', 'actor']


class InboxSerializer(serializers.ModelSerializer):

    id = serializers.UUIDField()
    post = PostSerializer(required=False)
    like = LikeSerializer(required=False)
    follow = FollowSerializer(required=False)

    receive_author = UserSerializer()

    # There are two ways to implement the operations like, post, follow
    # 1. create two apis, one for inbox and one for operation
    # 2. create one api, during sending to inbox here, it can create the object and save to the related database
    def create(self, validated_data):
        receive_author_data = validated_data.pop("receive_author")
        receive_author = User.objects.get(id=receive_author_data["id"])
        if("like" in validated_data):
            like_data = validated_data.pop("like")
            like = Like.objects.get(id=like_data["id"])
            validated_data["like"] = like
            return Inbox.objects.create(**validated_data)
        elif("post" in validated_data):
            post_data = validated_data.pop("post")
            post = Post.objects.get(id=post_data["id"])
            validated_data["post"] = post
        elif("follow" in validated_data):
            follow_data = validated_data.pop("follow")
            follow = Follow.objects.get(id=follow_data["id"])
            validated_data["follow"] = follow

        validated_data["receive_author"] = receive_author
        return Inbox.objects.create(**validated_data)

    def to_representation(self, value):
        return_object = super().to_representation(value)

        return return_object

    class Meta:
        model = Inbox
        fields = ['id', 'post', 'like', 'follow', 'receive_author']
