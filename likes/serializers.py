from rest_framework import serializers

from posts.serializers import PostSerializer
from comments.serializers import CommentSerializer
from users.serializers import UserSerializer
from .models import Like
from users.models import User

# from users.models import User


class LikeSerializer(serializers.ModelSerializer):

    author = UserSerializer()
    id = serializers.UUIDField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = User.objects.get(**author_data)
        validated_data["author"] = author
        return Like.objects.create(**validated_data)

    class Meta:
        model = Like
        fields = ['id', 'type', 'author', 'summary', 'object']
