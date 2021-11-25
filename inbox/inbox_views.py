
from django.db.models.base import Model

import json

from django.http.response import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response

from likes.models import Like
from .serializers import InboxSerializer
from likes.serializers import LikeSerializer
from .models import Inbox
from users.models import User
from follows.models import Follow, FriendRequest
from follows.serializers import FriendRequestSerializer
from posts.models import Post
from posts.serializers import PostSerializer
from backend.helper import *
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
import uuid


def handleFollowRequest(json_data, receiver):
    # try:
    #     uuid_data = user_id_parser(json_data["actor"])
    #     actor = User.objects.get(uuid=uuid_data)
    # except User.DoesNotExist:
    #     return JsonResponse({"error": "Actor not found"}, status=status.HTTP_404_NOT_FOUND)
    try:
        actor = User.objects.get(id=json_data["actor"].id)
    except User.DoesNotExist:
        actor = User.objects.create(json_data["actor"])
    existing_request = FriendRequest.objects.filter(
        object=receiver, actor=actor)
    if existing_request:
        return JsonResponse({"error": "Already requested"}, status=status.HTTP_400_BAD_REQUEST)
    existing_follow = Follow.objects.filter(
        follower=actor, following=receiver)
    if existing_follow:
        return JsonResponse({"error": "Already following"}, status=status.HTTP_400_BAD_REQUEST)
    request_serializer = FriendRequestSerializer(data=json_data)
    if request_serializer.is_valid():
        return save_method(request_serializer)
    else:
        return JsonResponse(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def handlePostRequest(json_data, receiver):
    # TODO: check if the db post is same as input post
    try:
        post = Post.objects.get(pk=json_data["id"])
    except Exception as e:
        return JsonResponse({"error": "cannot find this post"}, status=status.HTTP_404_NOT_FOUND)

    new_id = uuid.uuid4()
    json_data["id"] = new_id
    print(json_data)
    new_post_serializer = PostSerializer(data=json_data)
    if new_post_serializer.is_valid():
        new_post = new_post_serializer.save()
        new_post.shared = True
        new_post.save()
    else:
        print(new_post_serializer.errors)
        return JsonResponse(new_post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        new_post = Post.objects.get(pk=new_id)
    except Exception as e:
        return JsonResponse({"error": "cannot find this post"}, status=status.HTTP_404_NOT_FOUND)

    inbox_data = {"post": [new_post.__dict__],
                  "receive_author": receiver.__dict__}
    inbox_data["post"][0]["author"] = new_post.author.__dict__
    inbox_seralizer = InboxSerializer(data=inbox_data)
    if inbox_seralizer.is_valid():
        return save_method(inbox_seralizer)
    else:
        return JsonResponse(inbox_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)


def handleLikeRequest(json_data, receiver):
    # TODO: check if the db post is same as input post
    like_object = json_data["object"]
    liker_object = json_data["author"]
    try:
        liker = User.objects.get(id=liker_object.id)
    except User.DoesNotExist:
        liker = User.objects.create(liker_object)
    if likeExist(liker, like_object):
        return JsonResponse({}, status=status.HTTP_202_ACCEPTED)
    like_seralizer = LikeSerializer(data=json_data)
    if like_seralizer.is_valid():
        return save_method(like_seralizer)
    else:
        return JsonResponse(like_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if likeExist(liker, like_object):
    #     return JsonResponse({}, status=status.HTTP_202_ACCEPTED)
    # else:
    #     like_seralizer = LikeSerializer(data=json_data)
    #     if like_seralizer.is_valid():
    #         save_method(like_seralizer)
    #     else:
    #         return JsonResponse(like_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
    # try:
    #     like = Like.objects.get(pk=like_id)
    # except Exception as e:
    #     return JsonResponse({"error": "like failed"}, status=status.HTTP_404_NOT_FOUND)
    # inbox_data = {"like": [like.__dict__], "receive_author": receiver.__dict__}
    # inbox_data["like"][0]["author"] = like.author.__dict__
    # inbox_data["like"][0]["id"] = like_id
    # inbox_seralizer = InboxSerializer(data=inbox_data)
    # if inbox_seralizer.is_valid():
    #     return save_method(inbox_seralizer)
    # else:
    #     return JsonResponse(inbox_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)


def likeExist(liker, like_object):
    try:
        Like.objects.get(author=liker, object=like_object)
    except Like.DoesNotExist:
        return False
    return True


@api_view(['POST', 'GET', 'DELETE'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def inbox_list(request, author_id):
    try:
        receiver = User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
    # Post a shared post or a like or a friend request
    if request.method == 'POST':
        json_data = JSONParser().parse(request)
        if json_data["type"] == "Follow":
            return handleFollowRequest(json_data, receiver)
        elif json_data["type"] == "post":

            return handlePostRequest(json_data, receiver)
        elif json_data["type"] == "Like":
            return handleLikeRequest(json_data, receiver)
    # Get shared posts
    elif request.method == 'GET':
        try:
            inbox = Inbox.objects.get(receive_author=receiver)
        except Inbox.DoesNotExist:
            return JsonResponse([], status=status.HTTP_200_OK, safe=False)
        post_serializer = PostSerializer(inbox.post.all(), many=True)
        post_json = {"type": "inbox", "author": author_id,
                     "items": post_serializer.data}
        return JsonResponse(post_json, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        try:
            inbox = Inbox.objects.get(receive_author=receiver)
        except Inbox.DoesNotExist:
            return JsonResponse([], status=status.HTTP_404_NOT_FOUND, safe=False)
        inbox.post.all().delete()
        friend_requests = FriendRequest.objects.filter(object=receiver)
        print(friend_requests)
        friend_requests.delete()
        print(author_id)
        Like.objects.filter(object__contains="author/" +
                            str(author_id)).update(inbox=False)
        return Response(status=status.HTTP_204_NO_CONTENT)

    return JsonResponse({"error": "Author found"}, status=status.HTTP_404_NOT_FOUND)
