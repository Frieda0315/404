from rest_framework import serializers
from .models import Comment, Comments
from users.serializers import UserSerializer
from users.models import User


class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer()
    published = serializers.DateTimeField()
    id = serializers.CharField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = User.objects.get_or_create(**author_data)[0]
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
