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
from django.db import transaction

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            
            access_token = tokens["access"]
            refresh_token = tokens["refresh"]
            
            res = Response()
            
            res.data = {"success" : True, "message" : "Login Successfull"}
            res.set_cookie(
                key = 'access_token',
                value = access_token,
                httponly = True,
                secure = False,
                samesite = 'Lax',
                path = '/'
            )
            res.set_cookie(
                key = 'refresh_token',
                value = refresh_token,
                httponly = True,
                secure = False,
                samesite = 'Lax',
                path = '/'
            )
            return res
        except Exception as e:
                return Response(
        {'success': False, 'message': "Invalid Credentials"},
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

    return Response({**serializer.errors}, status=400)

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
        'success' : True,
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
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_branch(request):
    serializer = BranchCreationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True, 'message':'Branch Created Successfully'}, serializer.data, status=200)
    return Response({'success' : False}, serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_branch(request):
    try:
        branch = Branch.objects.all()
        serializer = BranchSerializer(branch, many=True)
        return Response(serializer.data, status=200)
    except:
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chitDetail(request):
    serializer = ChitDetailCreationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True, **serializer.data}, status=200)
    return Response({'success' : False}, serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_All_ChitDetails(request):
    try:
        chits = ChitDetails.objects.all()
        serializer = ChitDetailSerializer(chits, many=True)
        return Response(serializer.data, status=200)
    except:
        return Response(serializer.errors, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_ChitDetails(request, chit_id):
    try:
        chits = ChitDetails.objects.get(id=chit_id)
        serializer = ChitDetailSerializer(chits, many=False)
        return Response(serializer.data, status=200)
    except ChitDetails.DoesNotExist:
        return Response({"detail": "Chit not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        
        return res
    except:
        return Response({'success':False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chitAgreement(request):
    serializer = ChitAgreementCreateSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True, **serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'success' : False, 'error' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_ChitAgreementDetails(request, agreement_id):
    try:
        chits = ChitAgreementDetails.objects.get(id=agreement_id)
        serializer = ChitAgreementDetailsSerializer(chits, many=False)
        return Response(serializer.data, status=200)
    except ChitAgreementDetails.DoesNotExist:
        return Response({"detail": "Agreement not found"}, status=status.HTTP_404_NOT_FOUND)

from django.db.models import Exists, OuterRef
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_All_ChitAgreementDetails(request):
    try:
        # 🔥 Subquery to check if bid exists
        bid_exists = BidAgreementDetails.objects.filter(
            chitAgreement=OuterRef('pk')
        )

        # 🔥 Annotate each chit with has_bid
        chits = ChitAgreementDetails.objects.select_related('chit', 'user').annotate(
            has_bid=Exists(bid_exists)
        )

        serializer = ChitAgreementDetailsSerializer(chits, many=True)
        return Response(serializer.data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def createBidAgreement(request):
    try:
        with transaction.atomic():
            
            # 🔍 DEBUG: Print all received keys containing 'gurantor' or 'user'
            print("\n=== 📦 RECEIVED FORM DATA KEYS ===")
            for key in sorted(request.data.keys()):
                if 'gurantor' in key.lower() or key == 'user':
                    print(f"  {key}: {request.data.get(key)}")
            # Also check FILES for image uploads
            for key in request.FILES.keys():
                if 'gurantor' in key.lower():
                    print(f"  📎 FILE: {key}")
            print("=== END KEYS ===\n")

            # 🔥 Extract guarantors manually
            gurantors = []
            index = 0
            
            while True:
                prefix = f"gurantors[{index}]"

                # Try multiple ways to get firstname (debug fallback)
                firstname = (
                    request.data.get(f"{prefix}[firstname]") or 
                    request.POST.get(f"{prefix}[firstname]")
                )
                
                if not firstname:
                    break  # stop when no more guarantors

                # ✅ FIX: Get user ID with multiple fallbacks + type conversion
                user_id_raw = (
                    request.data.get(f"{prefix}[user]") or 
                    request.POST.get(f"{prefix}[user]")
                )
                
                # Convert to int if it's a string number, else fallback
                try:
                    user_id = int(user_id_raw) if user_id_raw else request.user.id
                except (ValueError, TypeError):
                    user_id = request.user.id

                print(f"🔍 Guarantor {index}: user_id={user_id}, firstname={firstname}")

                gurantor = {
                    "user": user_id,
                    "firstname": firstname,
                    "middlename": request.data.get(f"{prefix}[middlename]") or request.POST.get(f"{prefix}[middlename]"),
                    "lastname": request.data.get(f"{prefix}[lastname]") or request.POST.get(f"{prefix}[lastname]"),
                    "pancard_no": request.data.get(f"{prefix}[pancard_no]") or request.POST.get(f"{prefix}[pancard_no]"),
                    "aadharcard_no": request.data.get(f"{prefix}[aadharcard_no]") or request.POST.get(f"{prefix}[aadharcard_no]"),
                    "dob": request.data.get(f"{prefix}[dob]") or request.POST.get(f"{prefix}[dob]"),
                    "mobile_no": request.data.get(f"{prefix}[mobile_no]") or request.POST.get(f"{prefix}[mobile_no]"),
                    "pan_image": request.FILES.get(f"{prefix}[pan_image]"),
                    "aadhar_image": request.FILES.get(f"{prefix}[aadhar_image]"),
                    "aadhar_image_back": request.FILES.get(f"{prefix}[aadhar_image_back]"),
                }

                gurantors.append(gurantor)
                index += 1

            if not gurantors:
                return Response({"error": "At least one guarantor is required"}, status=400)

            print(f"✅ Extracted {len(gurantors)} guarantor(s)")

            # 🔥 Validate guarantors
            gurantor_serializer = CreateGurantorSerializer(
                data=gurantors,
                many=True,
                context={'request': request}  # Pass context for permission checks
            )
            
            if not gurantor_serializer.is_valid():
                print(f"❌ Guarantor validation errors: {gurantor_serializer.errors}")
                return Response({"error": "Guarantor validation failed", "details": gurantor_serializer.errors}, status=400)
                
            saved_gurantors = gurantor_serializer.save()
            gurantor_ids = [g.id for g in saved_gurantors]

            # 🔥 Extract bid data
            bid_user_raw = request.data.get("user") or request.POST.get("user")
            try:
                bid_user_id = int(bid_user_raw) if bid_user_raw else request.user.id
            except (ValueError, TypeError):
                bid_user_id = request.user.id

            bid_data = {
                "user": bid_user_id,
                "chitAgreement": request.data.get("chitAgreement") or request.POST.get("chitAgreement"),
                "dateofAuction": request.data.get("dateofAuction") or request.POST.get("dateofAuction"),
                "totalBidAmount": request.data.get("totalBidAmount") or request.POST.get("totalBidAmount"),
                "auctionNumber": request.data.get("auctionNumber") or request.POST.get("auctionNumber"),
                "prizedAmount": request.data.get("prizedAmount") or request.POST.get("prizedAmount"),
                "dividend": request.data.get("dividend") or request.POST.get("dividend"),
                "totalMemberofGroup": request.data.get("totalMemberofGroup") or request.POST.get("totalMemberofGroup"),
                "suretyReceived": request.data.get("suretyReceived") or request.POST.get("suretyReceived"),
                "suretiesVerified": request.data.get("suretiesVerified") or request.POST.get("suretiesVerified"),
                "dateOfPayment": request.data.get("dateOfPayment") or request.POST.get("dateOfPayment"),
                "chequeNo": request.data.get("chequeNo") or request.POST.get("chequeNo"),
                "cheqDate": request.data.get("cheqDate") or request.POST.get("cheqDate"),
                "cheqBank": request.data.get("cheqBank") or request.POST.get("cheqBank"),
                "foremanCommision": request.data.get("foremanCommision") or request.POST.get("foremanCommision"),
                "debitBankName": request.data.get("debitBankName") or request.POST.get("debitBankName"),
            }

            # 🔥 Create bid
            bid_serializer = CreateBidAgreementDetailsSerializers(data=bid_data)
            if not bid_serializer.is_valid():
                print(f"❌ Bid validation errors: {bid_serializer.errors}")
                return Response({"error": "Bid validation failed", "details": bid_serializer.errors}, status=400)
            
                
            bid_instance = bid_serializer.save()
            bid_instance.gurantor.set(gurantor_ids)

        return Response({
            "success" : True,
            "message": "Created successfully",
            "bid": bid_serializer.data,
            "gurantors": gurantor_serializer.data
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        import traceback
        print("❌ ERROR TRACEBACK:", traceback.format_exc())
        return Response({"error": str(e), "traceback": traceback.format_exc()}, status=400)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBidByChitAgreement(request, chit_id):
    try:
        bids = BidAgreementDetails.objects.filter(
            id=chit_id
        ).select_related(
            'chitAgreement',          # FK
            'chitAgreement__branch',  # for branchName
            'chitAgreement__chit'     # for nested chit
        ).prefetch_related(
            'gurantor'                # ManyToMany
        )

        serializer = BidAgreementDetailsReadSerializer(bids, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllBidAgreement(request):
    try:
        bids = BidAgreementDetails.objects.all()

        serializer = BidAgreementDetailsReadSerializer(bids, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
        