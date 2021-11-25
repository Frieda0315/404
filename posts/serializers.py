from rest_framework import serializers

from comments.models import Comments
from comments.serializers import CommentsSerializer

from .models import Post
from users.models import User
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    author = UserSerializer()
    commentsSrc = CommentsSerializer()
    categories = serializers.JSONField()
    count = serializers.IntegerField()
    published = serializers.DateTimeField()
    unlisted = serializers.BooleanField()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        try:
            author = User.objects.get(id=author_data.id)
        except User.DoesNotExist:
            author = User.objects.create(author_data)
        validated_data["author"] = author

        comments_data = validated_data.pop('commentsSrc')
        comments_data.pop("comments")
        comments = Comments.objects.get_or_create(**comments_data)[0]
        validated_data["commentsSrc"] = comments

        return Post.objects.create(**validated_data)

    class Meta:
        model = Post
        fields = ['type', 'title', 'id', 'source', 'origin', 'description',
                  'contentType', 'content', 'author', 'categories',
                  'count', 'comments', 'commentsSrc', 'published',
                  'visibility', 'unlisted']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.source = validated_data.get(
            'source', instance.source)
        instance.origin = validated_data.get(
            'origin', instance.origin)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.contentType = validated_data.get(
            'contentType', instance.contentType)
        instance.content = validated_data.get('content', instance.content)
        instance.categories = validated_data.get(
            'categories', instance.categories)
        instance.count = validated_data.get(
            'count', instance.count)
        instance.comments = validated_data.get(
            'comments', instance.comments)
        instance.published = validated_data.get(
            'published', instance.published)
        instance.visibility = validated_data.get(
            'visibility', instance.visibility)
        instance.unlisted = validated_data.get(
            'unlisted', instance.unlisted)

        instance.save()
        # instance is current data in DB, validated_data is new incoming data
        return instance
