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
        post_data = validated_data.pop("post")
        author = User.objects.get(**author_data)
        post = Post.objects.get(pk=post_data[0]["id"])

        posts = []
        posts.append(post)

        instance = Inbox.objects.get_or_create(
            receive_author=author)[0]

        instance.post.set(posts)
        return instance

    class Meta:
        model = Inbox
        fields = ['post', 'receive_author']
