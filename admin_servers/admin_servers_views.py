from re import T
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework import status
from users.models import User
from users.serializers import UserSerializer
from .serializers import NodeSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http.response import JsonResponse
from rest_framework.response import Response
import json
import os
from .models import Node
# Create your views here.
'''
1. get all users
2. filter pending users
3. approve/reject
('''


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def handle_signup_request(request, id):
    pending_users = User.objects.filter(uuid=id, pending=True)
    if not pending_users:
        return JsonResponse({"error": "no such author"}, status=status.HTTP_400_BAD_REQUEST)
    pending_users[0].pending = False
    pending_users[0].save()  # save Django object
    # change from Django object to serializer
    pending_user_seralizer = UserSerializer(pending_users[0])

    return JsonResponse(pending_user_seralizer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_signup_requests(request):
    pending_user_objects = User.objects.filter(
        pending=True)  # filter to an array of danjo object
    pending_users_seralizer = UserSerializer(pending_user_objects, many=True)
    return JsonResponse(pending_users_seralizer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET', 'PUT'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def approve_option(request):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, "../config.json")
    if request.method == 'GET':
        try:
            with open(file_path, 'r') as config_file:
                config_data = json.load(config_file)
                return JsonResponse({"approve_option": config_data["approve_option"]}, status=status.HTTP_200_OK, safe=False)
        except:
            return JsonResponse({"approve_option": "file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR, safe=False)
    elif request.method == 'PUT':
        print(request)
        print(type(request))
        new_option = JSONParser().parse(request)["approve_option"]
        config = {"approve_option": new_option}
        try:
            with open(file_path, 'w') as config_file:
                json.dump(config, config_file)
                return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def node_list(request):
    if request.method == 'GET':
        nodes = Node.objects.all()
        serialzier = NodeSerializer(nodes, many=True)
        return JsonResponse(serialzier.data, status=status.HTTP_200_OK, safe=False)
    elif request.method == 'POST':
        new_node = JSONParser().parse(request)
        existing_nodes = Node.objects.filter(pk=new_node["url"])
        if existing_nodes:
            return Response({"error": "node url already exists!!"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = NodeSerializer(data=new_node)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def delete_node(request):
    if request.method == 'DELETE':
        url = JSONParser().parse(request)["url"]
        try:
            node = Node.objects.get(url=url)
        except:
            return JsonResponse({"Error": "couldn't find the node"}, status=status.HTTP_400_BAD_REQUEST)
        # if current post is owned by this author, then delete
        node.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
