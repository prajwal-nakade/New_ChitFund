from django.db import models, transaction
from django.contrib.auth.models import AbstractUser

class Users(models.Model):
    auth_user = models.OneToOneField(
        "UserCredentials",
        on_delete=models.CASCADE,
        related_name="profile",
        null=True,      # TEMP
        blank=True,
    )
    CustomerID = models.CharField(max_length=20, unique=True,  editable=False)
    def save(self, *args, **kwargs):
        if not self.CustomerID:
            with transaction.atomic():
                last_user = (
                    Users.objects
                    .select_for_update()
                    .exclude(CustomerID__isnull=True)
                    .order_by('-id')
                    .first()
                )

                if last_user and last_user.CustomerID:
                    last_number = int(last_user.CustomerID.replace("CUST", ""))
                else:
                    last_number = 0

                self.CustomerID = f"CUST{last_number + 1:05d}"

        super().save(*args, **kwargs)

    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15)
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
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15)
    dob = models.DateField()
    relationship = models.CharField(max_length=30)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.firstname


class UserCredentials(AbstractUser):
    def __str__(self):
        return self.username
    
class Branch(models.Model):
    branchName = models.CharField(max_length=100)
    branchLocation = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.branchName
    
    
class ChitDetails(models.Model):
    application_id = models.PositiveBigIntegerField(
        unique=True,
        null=True,
        editable=False
    )
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    ByLawsNumber = models.CharField(max_length=50)
    BylawsDate = models.DateField()
    GroupCode = models.CharField(max_length=50)
    TicketNmber = models.CharField(max_length=50)
    ChitValue = models.IntegerField()
    Duration = models.IntegerField()
    DurationCategory = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.application_id:
            with transaction.atomic():
                last_app = (
                    ChitDetails.objects
                    .select_for_update()
                    .order_by("-application_id")
                    .exclude(application_id__isnull=True)
                    .first()
                )
                self.application_id = (
                    last_app.application_id + 1 if last_app else 1
                )

        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.ByLawsNumber
    
    
class ChitAgreementDetails(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    chit = models.ForeignKey(ChitDetails, on_delete=models.CASCADE)
    conducts_of_chits = models.CharField(max_length=50)
    number_of_tickets = models.CharField(max_length=10)
    number_of_installments = models.IntegerField()
    installment_amount = models.FloatField()
    scheduled_auction_time = models.TimeField()
    scheduled_auction_day = models.DateField()
    scheduled_last_date_of_payment = models.DateField()
    date_of_commencement = models.DateField()
    date_of_termination = models.DateField()
    first_auction_date = models.DateField()
    auction_frequency = models.DateField()
    auction_session_start = models.TimeField()
    auction_session_end = models.TimeField()
    register_bank_branch = models.CharField(max_length=200)
    foreman_name = models.CharField(max_length=100)
    company_reg_number = models.CharField(max_length=100)
    deposit_bank_name = models.CharField(max_length=200)
    deposit_receipt_no = models.CharField(max_length=200)
    deposit_date = models.DateField()
    term_month = models.CharField(max_length=10)
    prize_collection = models.CharField(max_length=60)
    jurisdiction_place = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    