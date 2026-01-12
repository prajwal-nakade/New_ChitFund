from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

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
def getuserEntries(request):
    try:
        entries = Users.objects.all()
        serializer = GetAllEntriesSerializer(entries, many=True)
        return Response(serializer.data, status=200)
    except:
        return Response(serializer.errors, status=400)
    
    
@api_view(['DELETE'])
def deleteUser(request, user_id):
    try:
        user = Users.objects.get(id=user_id)
        user.delete()
        return Response({'success' : True, 'message':'User Deleted Successfully!'})
    except Users.DoesNotExist:
        return Response({'success' : False, 'message':"User doesn't exist"})