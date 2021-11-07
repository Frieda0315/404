from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from users.models import User
from users.serializers import UserSerializer
from django.http.response import JsonResponse
from rest_framework.response import Response
import json
import os
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

@api_view(['GET','PUT'])
def approve_option(request):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, "../config.json")
    if request.method == 'GET':
        try:
            with open(file_path, 'r') as config_file:
                config_data = json.load(config_file)
                return JsonResponse({"approve_option":config_data["approve_option"]}, status=status.HTTP_200_OK, safe=False)
        except:
            return JsonResponse({"approve_option":"file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR, safe=False)
    elif request.method == 'PUT':
        print(request)
        print(type(request))
        new_option = JSONParser().parse(request)["approve_option"]
        config = {"approve_option" : new_option}
        try:
            with open(file_path, 'w') as config_file:
                json.dump(config,config_file)
                return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
