from django.urls import path
from .views import *

urlpatterns = [
    path('userEntry/', userEntry, name="userEntry"),
    path('getallentries/', getuserEntries, name="getuserEntries"),
    path('deleteUser/<int:user_id>/', deleteUser, name='deleteUser'),
    path('updateUser/<int:user_id>/', updateUser, name='updateUser'),
    path('toggleStatus/<int:user_id>/', toggleStatus, name='toggleStatus')
]
