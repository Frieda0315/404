from rest_framework import serializers

from posts.serializers import PostSerializer
from comments.serializers import CommentSerializer
from users.serializers import UserSerializer
from .models import Like
from users.models import User
from posts.models import Post
from comments.models import Comment
# from users.models import User


class LikeSerializer(serializers.ModelSerializer):

    author = UserSerializer()
    comment = CommentSerializer(allow_null=True)
    post = PostSerializer()
    id = serializers.UUIDField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = User.objects.get(**author_data)
        post_data = validated_data.pop('post')
        post = Post.objects.get(**post_data)
        comment_data = validated_data.pop('comment')
        comment = Comment.objects.get(id=comment_data["id"])
        validated_data["author"] = author
        validated_data["post"] = post
        validated_data["comment"] = comment
        return Like.objects.create(**validated_data)

    class Meta:
        model = Like
        fields = ['type', 'author', 'post',
                  'comment', 'summary', 'id']
