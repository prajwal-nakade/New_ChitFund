from django.urls import path
from .views import *

urlpatterns = [
    path('userEntry/', userEntry, name="userEntry"),
    path('getallentries/', getuserEntries, name="getuserEntries"),
    path('deleteUser/<int:user_id>/', deleteUser, name='deleteUser'),
    path('updateUser/<int:user_id>/', updateUser, name='updateUser'),
    path('toggleStatus/<int:user_id>/', toggleStatus, name='toggleStatus'),
    path('login/', CustomTokenObtainPairView.as_view(), name='adminlogin'),
    path('is-admin/', is_admin, name="is_admin"),
    path('register/', register, name='register'),
    path('createBranch/', create_branch, name='create_branch'),
    path('getBranch/', get_branch, name='get_branch'),
    path('createChit/', create_chitDetail, name='create_chitDetail'),
    path('getAllChits/', get_All_ChitDetails, name='get_All_ChitDetails'),
    path('getChit/<int:chit_id>/', get_ChitDetails, name='get_ChitDetails'),
    path('logout/', logout, name='get_ChitDetails'),
]
