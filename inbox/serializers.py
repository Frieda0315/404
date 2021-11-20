from django.db.models import manager
from rest_framework import serializers
from .models import Inbox
from posts.serializers import PostSerializer
from users.serializers import UserSerializer
from likes.serializers import LikeSerializer
from users.models import User
from likes.models import Like
from posts.models import Post


class InboxSerializer(serializers.ModelSerializer):
    post = PostSerializer(many=True, required=False)
    like = LikeSerializer(many=True, required=False)
    receive_author = UserSerializer()

    def create(self, validated_data):
        author_data = validated_data.pop("receive_author")
        author = User.objects.get(**author_data)

        instance = Inbox.objects.get_or_create(
            receive_author=author)[0]

        if validated_data.get('post', None) != None:
            post_data = validated_data.pop("post")
            post = Post.objects.get(pk=post_data[0]["id"])
            instance.post.add(post)
        elif validated_data.get('like', None) != None:
            #print(validated_data)
            like_data = validated_data.pop("like")
            like = Like.objects.get(pk=like_data[0]["id"])
            instance.like.add(like)
        # post_data = validated_data.pop("post", None)
        # post = Post.objects.get(pk=post_data[0]["id"])
        # instance.post.add(post)

        # like_data = validated_data.pop("like", None)
        # like = Like.objects.get(pk=like_data[0]["id"])
        # instance.like.add(like)

        return instance

    class Meta:
        model = Inbox
        fields = ['like', 'post', 'receive_author']
        # extra_kwargs = {
        #     'like': {'required': False}, 
        #     'post': {'required': False}, 
        # }
