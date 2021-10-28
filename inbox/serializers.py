from rest_framework import serializers
from .models import Inbox
from likes.serializers import LikeSerializer
from posts.serializers import PostSerializer
from users.serializers import UserSerializer
from likes.models import Like
from users.models import User
from posts.models import Post
import json


class InboxSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    receive_author = UserSerializer()

    def create(self, validated_data):
        # print(validated_data)
        author_data = validated_data.pop("receive_author")
        post_data = validated_data.pop("post")
        post_author_id = post_data["author"]["id"]
        author = User.objects.get(**author_data)
        post = Post.objects.get(pk=post_data["id"])
        post_author = User.objects.get(pk=post_author_id)
        print(type(post_author))
        return Inbox.objects.create(receive_author=author, post=post, **validated_data)

    class Meta:
        model = Inbox
        fields = ['post', 'receive_author']
