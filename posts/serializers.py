from rest_framework import serializers
from .models import Post
import uuid

class PostSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        #generate a new uuid4 postID
        #validated_data = validated_data.pop('id')
        # id = uuid.uuid4()
        # return Post.objects.create(id=id, **validated_data)
        return Post.objects.create(**validated_data)


    class Meta:
        model = Post
        fields = ['id', 'title', 'content','published','author']
