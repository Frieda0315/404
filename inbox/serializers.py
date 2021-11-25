from django.db.models import manager
from rest_framework import serializers
from .models import Inbox
from posts.serializers import PostSerializer
from users.serializers import UserSerializer

from users.models import User
from posts.models import Post


class InboxSerializer(serializers.ModelSerializer):
    post = PostSerializer(many=True)
    receive_author = UserSerializer()

    def create(self, validated_data):
        author_data = validated_data.pop("receive_author")
        try:
            author = User.objects.get(id=author_data["id"])
        except User.DoesNotExist:
            author = User.objects.create(author_data)

        instance = Inbox.objects.get_or_create(
            receive_author=author)[0]

        # if validated_data.get('post', None) != None:
        #     post_data = validated_data.pop("post")
        #     post = Post.objects.get(pk=post_data[0]["id"])
        #     instance.post.add(post)
        # elif validated_data.get('like', None) != None:
        #     #print(validated_data)
        #     like_data = validated_data.pop("Like")
        #     like = Like.objects.get(pk=like_data[0]["id"])
        #     instance.like.add(like)
        post_data = validated_data.pop("post", None)
        try:
            post = Post.objects.get(pk=post_data[0]["id"])
        except Post.DoesNotExist:
            post = Post.objects.create(post_data)[0]
        instance.post.add(post)

        # like_data = validated_data.pop("Like", None)
        # like = Like.objects.get(pk=like_data[0]["id"])
        # instance.like.add(like)

        return instance

    class Meta:
        model = Inbox
        fields = ['post', 'receive_author']
        #fields = ['like', 'post', 'receive_author']
        # extra_kwargs = {
        #     'like': {'required': False},
        #     'post': {'required': False},
        # }
