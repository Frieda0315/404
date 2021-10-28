from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import serializers, status
from rest_framework.response import Response
from .serializers import InboxSerializer
from users.serializers import UserSerializer
from likes.serializers import LikeSerializer
from .models import Inbox
from users.models import User
from follows.models import Follow, FriendRequest
from follows.serializers import FriendRequestSerializer
from posts.models import Post
from backend.helper import *
# Create your views here.


def handleFollowRequest(json_data, receiver):
    try:
        actor = User.objects.get(pk=json_data["actor"]["id"])
    except User.DoesNotExist:
        return JsonResponse({"error": "Actor not found"}, status=status.HTTP_404_NOT_FOUND)
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
    print([post.__dict__])
    inbox_data = {"post": [post.__dict__], "receive_author": receiver.__dict__}
    inbox_data["post"][0]["author"] = post.author.__dict__
    inbox_seralizer = InboxSerializer(data=inbox_data)
    if inbox_seralizer.is_valid():
        return save_method(inbox_seralizer)
        # inbox_seralizer.save()
    else:
        return JsonResponse(inbox_seralizer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
def inbox_list(request, author_id):
    try:
        receiver = User.objects.get(pk=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        json_data = JSONParser().parse(request)
        # if json_data["type"] == "follow":
        #     return handleFollowRequest(json_data, receiver)
        # if json_data["type"] == "post":
        return handlePostRequest(json_data, receiver)

    return JsonResponse({"error": "Author found"}, status=status.HTTP_404_NOT_FOUND)

# def add_like(like_object):
#     serializer = LikeSerializer(data=like_object)
#     if serializer.is_valid():
#         if save_method(serializer).status_code == status.HTTP_201_CREATED:
#             return True
#     return False


# # TODO: change the error returned value to err message
# def check_inbox_type(json_data, receive_author):
#     if(json_data["type"] == "Like"):
#         if(not add_like(json_data)):
#             return False
#         return {"id": json_data["id"], "like": json_data, "receive_author": receive_author}
#     elif(json_data["type"] == "Post"):
#         return {"id": json_data["id"], "post": json_data, "receive_author": receive_author}
#     elif(json_data["type"] == "Follow"):
#         return {"id": json_data["id"], "follow": json_data, "receive_author": receive_author}
#     return False


# def add_to_json(inbox_item):
#     if(inbox_item["like"] != None):
#         return inbox_item["like"]
#     elif(inbox_item["post"] != None):
#         return inbox_item["post"]
#     elif(inbox_item["follow"] != None):
#         return inbox_item["follow"]
#     return


# @api_view(['GET', 'POST'])
# def inbox_list(request, author_id):
#     if request.method == 'GET':
#         inbox = Inbox.objects.filter(receive_author_id=author_id)
#         serializer = InboxSerializer(inbox, many=True)
#         json_array = []
#         for item in serializer.data:
#             json_array.append(add_to_json(item))
#         if(len(json_array) == 0 or json_array[0] == None):
#             return JsonResponse([], safe=False)
#         return JsonResponse(json_array, safe=False)
#     elif request.method == 'POST':
#         json_data = JSONParser().parse(request)
#         try:
#             receive_author = User.objects.get(id=author_id)
#         except User.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         receive_author = UserSerializer(receive_author).data
#         json_data = check_inbox_type(json_data, receive_author)
#         if(not json_data):
#             return JsonResponse({"state": False, "error": "incorrect post body"}, status=status.HTTP_400_BAD_REQUEST)
#         serializer = InboxSerializer(data=json_data)
#         serializer.receive_author = receive_author
#         if serializer.is_valid():
#             return save_method(serializer)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
