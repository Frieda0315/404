from django.db import IntegrityError
from django.http.response import JsonResponse
from rest_framework import status


def save_method(serializer):
    try:
        serializer.save()
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


def user_id_parser(request_data):
    uuid_data = request_data["id"].split("/")[-1]
    if uuid_data == "":
        uuid_data = request_data["id"].split("/")[-2]
    return uuid_data


def comment_id_parser(request_data):
    uuid_data = request_data["id"].split("/")[-1]
    if uuid_data == "":
        uuid_data = request_data["id"].split("/")[-2]
    return uuid_data
