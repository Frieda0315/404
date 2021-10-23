from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from .serializers import InboxSerializer
from users.serializers import UserSerializer
from .models import Inbox
from users.models import User
# Create your views here.


@api_view(['GET', 'POST'])
def inbox_list(request, author_id):
    if request.method == 'GET':
        inbox = Inbox.objects.filter(receive_author_id=author_id)
        serializer = InboxSerializer(inbox, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        json_data = JSONParser().parse(request)
        receive_author = User.objects.get(id=author_id)
        receive_author = UserSerializer(receive_author).data
        json_data = check_inbox_type(json_data, receive_author)
        serializer = InboxSerializer(data=json_data)
        serializer.receive_author = receive_author
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def check_inbox_type(json_data, receive_author):
    if(json_data['type'] == 'Like'):
        return {'id': json_data['id'], 'like': json_data, 'receive_author': receive_author}
