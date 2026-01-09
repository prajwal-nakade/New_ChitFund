from rest_framework import serializers
from .models import Users, Nominee

class UserWithNomineeSerializer(serializers.ModelSerializer):
    nominee_name = serializers.CharField(write_only=True)
    nominee_mobile = serializers.CharField(write_only=True)
    nominee_dob = serializers.DateField(write_only=True)
    relationship = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = [
            'name', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image',
            'nominee_name', 'nominee_mobile',
            'nominee_dob', 'relationship'
        ]
    def create(self, validated_data):
        nominee_data = {
            "name": validated_data.pop("nominee_name"),
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
        fields = ['name', 'mobile_no', 'dob', 'relationship']

    
class GetAllEntriesSerializer(serializers.ModelSerializer):
    nominees = NomineeSerializer(many=True, read_only = True)
    class Meta:
        model = Users
        fields = ['name', 'mobile_no', 'dob', 'email',
            'permanent_address', 'pincode',
            'pancard_no', 'aadharcard_no',
            'pan_image', 'aadhar_image', 'nominees']
