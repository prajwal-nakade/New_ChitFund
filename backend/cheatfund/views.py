from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            
            access_token = tokens["access"]
            refresh_token = tokens["refresh"]
            
            res = Response()
            
            res.data = {"success" : True}
            res.set_cookie(
                key = 'access_token',
                value = access_token,
                httponly = True,
                secure = True,
                samesite = 'None',
                path = '/'
            )
            res.set_cookie(
                key = 'refresh_token',
                value = refresh_token,
                httponly = True,
                secure = True,
                samesite = 'None',
                path = '/'
            )
            return res
        except Exception as e:
                return Response(
        {'success': False, 'error': str(e)},
        status=400
    )

    

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def userEntry(request):
    serializer = UserWithNomineeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"success": True, "message": "User & nominee created"},
            status=201
        )

    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getuserEntries(request):
    try:
        entries = Users.objects.all()
        serializer = GetAllEntriesSerializer(entries, many=True)
        return Response(serializer.data, status=200)
    except:
        return Response(serializer.errors, status=400)
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, user_id):
    try:
        user = Users.objects.get(id=user_id)
        user.delete()
        return Response({'success' : True, 'message':'User Deleted Successfully!'}, status = 200)
    except Users.DoesNotExist:
        return Response({'success' : False, 'message':"User doesn't exist"}, status = 400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, user_id):
    try:
        user = Users.objects.get(id=user_id)
    except Users.DoesNotExist:
        return Response({'success' : False, 'message':"User doesn't exist"}, status = 404)
    updatedUserData = UpdateUserSerializer(user, data = request.data, partial=True)
    if updatedUserData.is_valid():
        updatedUserData.update(user, updatedUserData.validated_data )
        return Response({'success' : True, 'message' : 'User Updated Successfully!'}, status = 200)
    else:
        return Response({'success' : False, 'error' : updatedUserData.errors}, status = 400)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def toggleStatus(request, user_id):
    try:
        user = Users.objects.get(id=user_id)
    except Users.DoesNotExist:
        return Response({'success' : False, 'message':"User doesn't exist"}, status = 404)
    
    new_status = request.data.get('status')
    if new_status not in['active','inactive']:
        return Response({"message": "Invalid status"}, status=400)
    user.status = new_status
    user.save()    
    return Response({"success" : True,"message" : 'Status updated'}, status = 200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_admin(request):
    user = request.user
    
    return Response({
        'is_superuser': user.is_superuser,
        'is_staff': user.is_staff,
        'username': user.username,
    })
    

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegister(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success':True, 'data' : serializer.data})
    return Response({serializer.error})
    