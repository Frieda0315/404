from django.http.response import JsonResponse
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .serializers import FollowSerializer
from .models import Follow
from users.models import User
from users.serializers import UserSerializer
from backend.helper import *
import uuid
from django.forms.models import model_to_dict

# Create your views here.
@api_view(['GET'])
def follower_list(request, author_id):
    try:
        following = User.objects.get(pk=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "no such author"}, status=status.HTTP_404_NOT_FOUND)
    followers = Follow.objects.filter(following=following)
    follow_serializer = FollowSerializer(followers, many=True)
    follower_list = []
    for follow in follow_serializer.data:
        follower_list.append(follow["follower"])
    # follower_serializer.data
    return JsonResponse(follower_list, status=status.HTTP_200_OK, safe=False)

@api_view(['GET', 'PUT', 'DELETE'])
def follower_detail(request, author_id, foreign_author_id):
    if(author_id==foreign_author_id):
        return JsonResponse({"error": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        following = User.objects.get(pk=author_id)
        follower = User.objects.get(pk=foreign_author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "cannot find the author or the follower"}, status=status.HTTP_404_NOT_FOUND)

    follow = Follow.objects.filter(following=following, follower=follower)

    if(request.method == "DELETE"):
        if(not follow):
            return JsonResponse({"error": "cannot find the follow"}, status=status.HTTP_404_NOT_FOUND)
        follow[0].delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif(request.method == "PUT"):
        if(follow):
            return JsonResponse({"error": "follower already added"}, status=status.HTTP_400_BAD_REQUEST)
        following = {
            "user_name": UserSerializer(following).data["user_name"],
            "github_name": UserSerializer(following).data["github_name"],
            "type": UserSerializer(following).data["type"],
            "id": UserSerializer(following).data["id"]
        }
        follower = {
            "user_name": UserSerializer(follower).data["user_name"],
            "github_name": UserSerializer(follower).data["github_name"],
            "type": UserSerializer(follower).data["type"],
            "id": UserSerializer(follower).data["id"]
        }
        follow_data = {"type": "follow", "following": following, "follower": follower}
        follow_seralizer = FollowSerializer(data=follow_data)
        if(follow_seralizer.is_valid()):
            return save_method(follow_seralizer)
        else:
            return JsonResponse(follow_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif(request.method == "DELETE"):
        if(not follow):
            return JsonResponse({"error": "No follow relationship found"}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({"error": "follower already added"}, status=status.HTTP_400_BAD_REQUEST)