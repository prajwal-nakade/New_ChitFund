from rest_framework import serializers
from .models import Users, Nominee

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
            'firstname','middlename', 'lastname', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image',
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
        fields = ['firstname', 'middlename', 'lastname', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image', 'nominees']
