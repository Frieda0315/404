from rest_framework import serializers
from .models import Comment
from users.serializers import UserSerializer
from users.models import User


class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer()
    published = serializers.DateTimeField()
    id = serializers.UUIDField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = User.objects.get(**author_data)
        print(author)
        return Comment.objects.create(author=author, **validated_data)

    class Meta:
        model = Comment
        fields = ['type', 'author', 'comment',
                  'contentType', 'published', 'id']
