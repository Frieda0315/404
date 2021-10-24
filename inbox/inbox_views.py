from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import InboxSerializer
from users.serializers import UserSerializer
from likes.serializers import LikeSerializer
from .models import Inbox
from users.models import User
from backend.helper import *
# Create your views here.


def add_like(like_object):
    serializer = LikeSerializer(data=like_object)
    if serializer.is_valid():
        if save_method(serializer).status_code == status.HTTP_201_CREATED:
            return True
    return False


# TODO: change the error returned value to err message
def check_inbox_type(json_data, receive_author):
    if(json_data['type'] == 'Like'):
        if(not add_like(json_data)):
            return False
        return {'id': json_data['id'], 'like': json_data, 'receive_author': receive_author}
    elif(json_data['type'] == 'Post'):
        return {'id': json_data['id'], 'post': json_data, 'receive_author': receive_author}
    elif(json_data['type'] == 'Follow'):
        return {'id': json_data['id'], 'follow': json_data, 'receive_author': receive_author}
    return False


def add_to_json(inbox_item):
    if(inbox_item['like'] != None):
        return inbox_item['like']
    elif(inbox_item['post'] != None):
        return inbox_item['post']
    elif(inbox_item['follow'] != None):
        return inbox_item['follow']
    return


@api_view(['GET', 'POST'])
def inbox_list(request, author_id):
    if request.method == 'GET':
        inbox = Inbox.objects.filter(receive_author_id=author_id)
        serializer = InboxSerializer(inbox, many=True)
        json_array = []
        for item in serializer.data:
            json_array.append(add_to_json(item))
        if(len(json_array) == 0 or json_array[0] == None):
            return JsonResponse([], safe=False)
        return JsonResponse(json_array, safe=False)
    elif request.method == 'POST':
        json_data = JSONParser().parse(request)
        try:
            receive_author = User.objects.get(id=author_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        receive_author = UserSerializer(receive_author).data
        json_data = check_inbox_type(json_data, receive_author)
        if(not json_data):
            return JsonResponse({"state": False, "error": "incorrect post body"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = InboxSerializer(data=json_data)
        serializer.receive_author = receive_author
        if serializer.is_valid():
            return save_method(serializer)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
