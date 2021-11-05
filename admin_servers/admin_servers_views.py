from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from users.models import User
from users.serializers import UserSerializer
from django.http.response import JsonResponse
# Create your views here.
'''
1. get all users
2. filter pending users
3. approve/reject
('''

@api_view(['POST'])
def handle_signup_request(request, id):
    pending_users = User.objects.filter(pk=id, pending=True)
    if not pending_users:
        return JsonResponse({"error":"no such author"}, status=status.HTTP_400_BAD_REQUEST)
    pending_users[0].pending = False
    pending_users[0].save()                                   #save Django object
    pending_user_seralizer = UserSerializer(pending_users[0]) #change from Django object to serializer
    
    return JsonResponse(pending_user_seralizer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_signup_requests(request):
    pending_user_objects = User.objects.filter(pending=True) # filter to an array of danjo object
    pending_users_seralizer = UserSerializer(pending_user_objects, many=True)
    return JsonResponse(pending_users_seralizer.data, status=status.HTTP_200_OK, safe=False)
