from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FollowSerializer, FriendSerializer
from .models import Follow, Friend, FriendRequest
from users.models import User
from users.serializers import UserSerializer
from backend.helper import *

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
    if(author_id == foreign_author_id):
        return JsonResponse({"error": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        following = User.objects.get(pk=author_id)
        follower = User.objects.get(pk=foreign_author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "cannot find the author or the follower"}, status=status.HTTP_404_NOT_FOUND)

    # try to find the follow relationship
    follow = Follow.objects.filter(following=following, follower=follower)

    if(request.method == "DELETE"):
        if(not follow):
            return JsonResponse({"error": "cannot find the follow"}, status=status.HTTP_404_NOT_FOUND)
        follow[0].delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif(request.method == "PUT"):
        friend_request = FriendRequest.objects.filter(
            actor=follower, object=following)
        if follow:
            return JsonResponse({"error": "follower already added"}, status=status.HTTP_400_BAD_REQUEST)
        if not friend_request:
            return JsonResponse({"error": "haven't requested yet"}, status=status.HTTP_400_BAD_REQUEST)
        following_dict = {
            "user_name": UserSerializer(following).data["user_name"],
            "github_name": UserSerializer(following).data["github_name"],
            "type": UserSerializer(following).data["type"],
            "id": UserSerializer(following).data["id"]
        }
        follower_dict = {
            "user_name": UserSerializer(follower).data["user_name"],
            "github_name": UserSerializer(follower).data["github_name"],
            "type": UserSerializer(follower).data["type"],
            "id": UserSerializer(follower).data["id"]
        }
        follow_data = {"following": following_dict, "follower": follower_dict}
        follow_seralizer = FollowSerializer(data=follow_data)
        if follow_seralizer.is_valid():
            result = save_method(follow_seralizer)
            friend_request[0].delete()
            reverse_follow = Follow.objects.filter(
                following=follower, follower=following)
            if reverse_follow:
                friend_data = {"first_user": following_dict,
                               "second_user": follower_dict}
                friend_seralizer = FriendSerializer(data=friend_data)
                if friend_seralizer.is_valid():
                    try:
                        friend_seralizer.save()
                    except Exception as e:
                        return JsonResponse({"error": "fail to store friend"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return JsonResponse(friend_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
            return result
        else:
            return JsonResponse(follow_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif(request.method == "GET"):
        if(not follow):
            return JsonResponse({"result": "No follow relationship found"}, status=status.HTTP_200_OK)
        return JsonResponse({"result": "Follow relationship found"}, status=status.HTTP_200_OK)

    return JsonResponse({"error": "follower already added"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def friend_list(request, author_id):
    try:
        author = User.objects.get(pk=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "author not found"})
    friend1_pairs = Friend.objects.filter(second_user=author)
    friend2_pairs = Friend.objects.filter(first_user=author)
    friends = []
    for friend in friend1_pairs:
        friends.append(friend.first_user)
    for friend in friend2_pairs:
        friends.append(friend.second_user)

    friend_seralizer = UserSerializer(friends, many=True)
    author_seralizer = UserSerializer(author)
    return_json = {"type": "friends", "author": author_seralizer.data,
                   "friends": friend_seralizer.data}
    return JsonResponse(return_json, status=status.HTTP_200_OK)
