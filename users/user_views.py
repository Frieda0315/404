from django.http.response import JsonResponse
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import AdminUserSerializer, UserSerializer
from .models import User, AdminUser
import json
import os
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def author_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def author_detail(request, id):
    """
    Retrieve, update or delete a user profile info.
    """
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return JsonResponse({"error": "author not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        user_json_data = JSONParser().parse(request)
        existing_users = User.objects.filter(
            user_name=user_json_data["user_name"])
        if(user.user_name != user_json_data["user_name"] and existing_users):
            return JsonResponse({"error": "user_name already exists"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user, data=user_json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# need user object (including password)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def signup(request):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, "../config.json")

    user_json_data = JSONParser().parse(request)
    current_user = User.objects.filter(
        Q(user_name=user_json_data["user_name"]) | Q(pk=user_json_data["id"]))
    if(current_user):
        return JsonResponse({"error": "author already exists"}, status=status.HTTP_400_BAD_REQUEST)
    password = user_json_data.pop("password")
    new_user_serializer = UserSerializer(data=user_json_data)
    if new_user_serializer.is_valid():
        try:
            with open(file_path, 'r') as config_file:
                config_data = json.load(config_file)
        except:
            return JsonResponse({"approve_option": "file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR, safe=False)

        new_user_object = new_user_serializer.save()
        new_user_object.password = password
        if not config_data["approve_option"]:
            new_user_object.pending = False
        new_user_object.save()
        return JsonResponse(new_user_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(new_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# need username and password


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def login(request):
    login_json_data = JSONParser().parse(request)
    user_name = login_json_data["user_name"]
    password = login_json_data["password"]
    print(user_name)
    print(password)
    if((not user_name) or (not password)):
        return JsonResponse({"error": "incorrect form data"}, status=status.HTTP_400_BAD_REQUEST)
    existing_user = User.objects.filter(user_name=user_name, password=password)
    print(existing_user)
    if(existing_user):
        existing_user_serializer = UserSerializer(existing_user[0])
        return JsonResponse(existing_user_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({"error": "invalid credential"}, status=status.HTTP_401_UNAUTHORIZED)


'''
admin's signup
'''


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def admin_signup(request):
    user_json_data = JSONParser().parse(request)
    current_admin_user = AdminUser.objects.filter(
        Q(user_name=user_json_data["user_name"]) | Q(pk=user_json_data["id"]))
    if(current_admin_user):
        return JsonResponse({"error": "admin user already exists"}, status=status.HTTP_400_BAD_REQUEST)
    password = user_json_data.pop("password")
    new_admin_user_serializer = AdminUserSerializer(data=user_json_data)
    if new_admin_user_serializer.is_valid():
        new_admin_user_object = new_admin_user_serializer.save()
        new_admin_user_object.password = password
        new_admin_user_object.save()
        return JsonResponse(new_admin_user_serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse(new_admin_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
admin's login
'''


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def admin_login(request):
    login_json_data = JSONParser().parse(request)
    user_name = login_json_data["user_name"]
    password = login_json_data["password"]
    if ((not user_name) or (not password)):
        return JsonResponse({"error": "incorrect form data"}, status=status.HTTP_400_BAD_REQUEST)
    existing_adminUser = AdminUser.objects.filter(
        user_name=user_name, password=password)
    if (existing_adminUser):
        existing_adminUser_serializer = AdminUserSerializer(
            existing_adminUser[0])
        return JsonResponse(existing_adminUser_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({"error": "incorrect credentil"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def pending_author_list(request):
    if request.method == 'GET':
        pending_author_list = User.objects.filter(pending=True)
        pending_author_seralizer = UserSerializer(
            pending_author_list, many=True)
        return JsonResponse(pending_author_seralizer.data, status=status.HTTP_200_OK, safe=False)
    elif request.method == 'POST':
        pending_author_data = JSONParser().parse(request)
        print(pending_author_data)
        try:
            author = User.objects.get(
                id=pending_author_data["author_id"], pending=True)
        except User.DoesNotExist:
            return JsonResponse({"error": "pending author not found"}, status=status.HTTP_404_NOT_FOUND)
        if pending_author_data["action"] == "approve":
            author.pending = False
            author.save()
            new_author_serializer = UserSerializer(author)
            return JsonResponse(new_author_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"error": "action not supported"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def current_author_list(request):
    current_author_list = User.objects.filter(pending=False)
    current_author_seralizer = UserSerializer(current_author_list, many=True)
    return JsonResponse(current_author_seralizer.data, status=status.HTTP_200_OK, safe=False)
