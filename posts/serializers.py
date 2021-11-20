from rest_framework import serializers

from .models import Post
from users.models import User
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True, allow_blank=True)
    author = UserSerializer()

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        print(author_data)
        author = User.objects.get(**author_data)
        print(author)
        validated_data["author"] = author
        
        return Post.objects.create(**validated_data)

    # class Meta:
    #     model = Post
    #     fields = ['id', 'title', 'content',
    #               'published', 'author', 'image', 'visibility']

    class Meta:
        model = Post
        fields = ['id', 'type', 'title', 'content', 'contentType',
                  'published', 'author', 'visibility', 'source', 'origin']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.published = validated_data.get(
            'published', instance.published)
        instance.visibility = validated_data.get(
            'visibility', instance.visibility)

        instance.contentType = validated_data.get(
            'contentType', instance.contentType)
        instance.source = validated_data.get(
            'source', instance.source)
        instance.origin = validated_data.get(
            'origin', instance.origin)
        instance.save()
        # instance is current data in DB, validated_data is new incoming data
        return instance
