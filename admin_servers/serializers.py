from rest_framework import serializers
from .models import Node




class NodeSerializer(serializers.ModelSerializer):


    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Node.objects.create(**validated_data)

    class Meta:
        model = Node
        fields = ['url', 'user_name','password']
