from django.urls import path
from .views import *

urlpatterns = [
    path('userEntry/', userEntry, name="userEntry")
]
