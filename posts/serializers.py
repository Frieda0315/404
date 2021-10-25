from rest_framework import serializers
from .models import Post
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)
    author = UserSerializer()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        # generate a new uuid4 postID
        #validated_data = validated_data.pop('id')
        # id = uuid.uuid4()
        # return Post.objects.create(id=id, **validated_data)

        # at here, backend API only receive the unique postID, and it is must be provided.
        # author_data = validated_data.pop("author")
        return Post.objects.create(**validated_data)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content',
                  'published', 'author', 'image', 'visibility']
