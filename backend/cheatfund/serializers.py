from rest_framework import serializers
from .models import *

class UserWithNomineeSerializer(serializers.ModelSerializer):
    nominee_firstname = serializers.CharField(write_only=True)
    nominee_middlename = serializers.CharField(write_only=True)
    nominee_lastname = serializers.CharField(write_only=True)
    nominee_mobile = serializers.CharField(write_only=True)
    nominee_dob = serializers.DateField(write_only=True)
    relationship = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = [
            'id', 'firstname','middlename', 'lastname', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image', 'created_at', 
            'nominee_firstname', 'nominee_middlename', 'nominee_lastname', 'nominee_mobile',
            'nominee_dob', 'relationship'
        ]
    def create(self, validated_data):
        nominee_data = {
            "firstname": validated_data.pop("nominee_firstname"),
            "middlename": validated_data.pop("nominee_middlename"),
            "lastname": validated_data.pop("nominee_lastname"),
            "mobile_no": validated_data.pop("nominee_mobile"),
            "dob": validated_data.pop("nominee_dob"),
            "relationship": validated_data.pop("relationship"),
        }

        user = Users.objects.create(**validated_data)

        Nominee.objects.create(
            user=user,
            **nominee_data
        )

        return user
    
class NomineeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nominee
        fields = ['firstname', 'middlename', 'lastname',  'mobile_no', 'dob', 'relationship']

    
class GetAllEntriesSerializer(serializers.ModelSerializer):
    nominees = NomineeSerializer(many=True, read_only = True)
    class Meta:
        model = Users
        fields = ['id', 'firstname', 'middlename', 'lastname', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode','created_at',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image', 'nominees', 'status', 'CustomerID']

class UserSerializer(serializers.ModelSerializer):
    nominees = NomineeSerializer(many = True,read_only=True)
    class Meta:
        model = Users
        fields = ['id', 'firstname', 'middlename', 'lastname', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode','created_at',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image', 'status', 'nominees']
        

class UpdateUserSerializer(serializers.Serializer):
    #user field
    firstname = serializers.CharField(required=False)
    middlename = serializers.CharField(required=False)
    lastname = serializers.CharField(required=False)
    mobile_no = serializers.CharField(required=False)
    dob = serializers.DateField(required=False)
    email = serializers.EmailField(required=False)
    permanent_address = serializers.CharField(required=False)
    pincode = serializers.CharField(required=False)
    pancard_no = serializers.CharField(required=False)
    aadharcard_no = serializers.CharField(required=False)
    pan_image = serializers.ImageField(required=False)
    aadhar_image = serializers.ImageField(required=False)
    
    #Nominee Fields
    nominee_firstname = serializers.CharField(required=False)
    nominee_middlename = serializers.CharField(required=False)
    nominee_lastname = serializers.CharField(required=False)
    nominee_mobile = serializers.CharField(required=False)
    nominee_dob = serializers.DateField(required=False)
    relationship = serializers.CharField(required=False)
    
    def update(self, instance, validated_data):
        user_field = [
            'firstname', 'middlename', 'lastname', 'mobile_no', 'dob',
            'email', 'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image'
        ]
        for field in user_field:
            if field in validated_data:
                setattr(instance, field, validated_data[field])
        instance.save()
        
        nominee = Nominee.objects.get(user=instance)
        nominee_fields = {
        'firstname': 'nominee_firstname',
        'middlename': 'nominee_middlename',
        'lastname': 'nominee_lastname',
        'mobile_no': 'nominee_mobile',
        'dob': 'nominee_dob',
        'relationship': 'relationship'
    }
        
        for model_field, serializer_field in nominee_fields.items():
            if serializer_field in validated_data:
                setattr(nominee, model_field, validated_data[serializer_field])
        
        nominee.save()
        
        return instance
    
    
class UserRegister(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = UserCredentials
        fields = ['username', 'password', 'email']
        
    def create(self, validated_data):
        user = UserCredentials(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
class BranchCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['branchName', 'branchLocation', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        branch = Branch(
            branchName = validated_data['branchName'],
            branchLocation = validated_data['branchLocation'],
        )
        
        branch.save()
        return branch

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'branchName', 'branchLocation', 'created_at', 'updated_at']
        
class ChitDetailCreationSerializer(serializers.ModelSerializer):
    branchName = serializers.CharField(source='branch.branchName', read_only=True)
    application_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = ChitDetails
        fields = ['id', 'user', 'branch', 'ByLawsNumber', 'BylawsDate', 'GroupCode', 'TicketNmber', 'ChitValue', 'Duration', 'DurationCategory', 'created_at', 'updated_at', 'branchName', 'application_id']
        
class ChitDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    branchName = serializers.CharField(source='branch.branchName', read_only=True)
    
    class Meta:
        model = ChitDetails
        fields = ['id', 'user','branch', 'ByLawsNumber', 'BylawsDate', 'GroupCode', 'TicketNmber', 'ChitValue', 'Duration', 'DurationCategory', 'created_at', 'updated_at', 'branchName', 'application_id']
        


class ChitAgreementCreateSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only = True)
    # chit = ChitDetailSerializer(read_only = True)
    branchName = serializers.CharField(source='branch.branchName', read_only=True)
    
    class Meta:
        model = ChitAgreementDetails
        fields = ['id', 'user', 'branch', 'chit', 'conducts_of_chits', 'branchName',
        'number_of_tickets',
        'number_of_installments',
        'installment_amount',
        'scheduled_auction_time',
        'scheduled_auction_day',
        'scheduled_last_date_of_payment',
        'date_of_commencement',
        'date_of_termination',
        'first_auction_date',
        'auction_frequency' ,
        'auction_session_start',
        'auction_session_end',
        'register_bank_branch',
        'foreman_name',
        'company_reg_number',
        'deposit_bank_name',
        'deposit_receipt_no',
        'deposit_date', 
         'term_month',
         'prize_collection',
         'jurisdiction_place','created_at', 'updated_at',]
        read_only_fields = ('created_at', 'updated_at')
        
        
class ChitAgreementDetailsSerializer(serializers.ModelSerializer):
    chit = ChitDetailSerializer(read_only = True)
    branchName = serializers.CharField(source='branch.branchName', read_only=True)
    
    class Meta:
        model = ChitAgreementDetails
        fields = ['id', 'user', 'branch', 'chit', 'conducts_of_chits', 'branchName',
        'number_of_tickets',
        'number_of_installments',
        'installment_amount',
        'scheduled_auction_time',
        'scheduled_auction_day',
        'scheduled_last_date_of_payment',
        'date_of_commencement',
        'date_of_termination',
        'first_auction_date',
        'auction_frequency' ,
        'auction_session_start',
        'auction_session_end',
        'register_bank_branch',
        'foreman_name',
        'company_reg_number',
        'deposit_bank_name',
        'deposit_receipt_no',
        'deposit_date', 
         'term_month',
         'prize_collection',
         'jurisdiction_place','created_at', 'updated_at',]
        