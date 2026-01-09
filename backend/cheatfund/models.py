from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15, unique=True)
    dob = models.DateField()
    email = models.EmailField(max_length=50, unique=True)
    permanent_address = models.CharField(max_length=300)
    pincode = models.CharField(max_length=10)
    pancard_no = models.CharField(max_length=50, unique=True)
    aadharcard_no = models.CharField(max_length=12, unique=True)

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
        return self.name


class Nominee(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="nominees")
    name = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15, unique=True)
    dob = models.DateField()
    relationship = models.CharField(max_length=30)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
