from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(models.Model):
    auth_user = models.OneToOneField(
        "UserCredentials",
        on_delete=models.CASCADE,
        related_name="profile",
        null=True,      # TEMP
        blank=True
    )
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50, blank=True, null=True)
    lastname = models.CharField(max_length=50, blank=True, null=True)
    mobile_no = models.CharField(max_length=15, unique=True)
    dob = models.DateField()
    email = models.EmailField(max_length=50, unique=True)
    permanent_address = models.CharField(max_length=300)
    pincode = models.CharField(max_length=10)
    pancard_no = models.CharField(max_length=50, unique=True)
    aadharcard_no = models.CharField(max_length=12, unique=True)
    status = models.CharField(
        max_length=10,
        choices=[
            ('active', 'inactive'),
            ('Unpaid', 'Unpaid'),
        ],
        default='active'
    )

    pan_image = models.ImageField(
        upload_to="user_documents/pan/",
        blank=True,
        null=True
    )
    aadhar_image = models.ImageField(
        upload_to="user_documents/aadhar/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.firstname


class Nominee(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="nominees")
    firstname = models.CharField(max_length=50, blank=True, null=True)
    middlename = models.CharField(max_length=50, blank=True, null=True)
    lastname = models.CharField(max_length=50, blank=True, null=True)
    mobile_no = models.CharField(max_length=15, unique=True)
    dob = models.DateField()
    relationship = models.CharField(max_length=30)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.firstname


class UserCredentials(AbstractUser):
    def __str__(self):
        return self.username