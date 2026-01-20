from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Users)
admin.site.register(Nominee)
admin.site.register(UserCredentials)
admin.site.register(Branch)
admin.site.register(ChitDetails)