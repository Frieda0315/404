from django.db import IntegrityError
from django.http.response import JsonResponse
from rest_framework import status


def save_method(serializer):
    try:
        serializer.save()
    except IntegrityError:
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
