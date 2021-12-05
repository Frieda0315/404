from rest_framework import serializers
from .models import Comment, Comments
from users.serializers import UserSerializer
from users.models import User


class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer()
    id = serializers.CharField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        try:
            author = User.objects.get(id=author_data["id"])
        except User.DoesNotExist:
            author = User.objects.create(author_data)
        return Comment.objects.create(author=author, **validated_data)

    class Meta:
        model = Comment
        fields = ['type', 'author', 'comment',
                  'contentType', 'published', 'id']


class CommentsSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    comments = CommentSerializer(many=True)
    post = serializers.CharField()

    def create(self, validated_data):
        return Comments.objects.create(**validated_data)

    class Meta:
        model = Comments
        fields = ['type', 'page', 'size',
                  'post', 'id', 'comments']
