from rest_framework import serializers
from realestate.models import UsersDetails, AdminDetails, Properties, Wishlist, Reports

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UsersDetails
		fields = ('UserId', 'UserName', 'UserMail', 'UserPassword', 'PostedProperties', 'RentedProperties', 'BoughtProperties', 'WishListed')

class PropertySerializer(serializers.ModelSerializer):
    user = serializers.CharField(write_only=True)

    class Meta:
        model = Properties
        fields = '__all__'

    def create(self, validated_data):
        userName = validated_data.pop('user')  # Get the userName
        user = UsersDetails.objects.get(UserName=userName)  # Retrieve the user
        property = Properties.objects.create(user=user, **validated_data)
        user.increment_posted_properties()  # Increment the PostedProperties count
        return property

class PropertySearchSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.UserName', read_only=True)

    class Meta:
        model = Properties
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class ReportedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = '__all__'  
          
class AdminSerializer(serializers.ModelSerializer):
	class Meta:
		model = AdminDetails
		fields = ('AdminId', 'AdminName', 'AdminPass')

