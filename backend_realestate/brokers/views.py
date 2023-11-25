from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
import json
import random
import string
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from brokers.models import UsersDetails, AdminDetails, Properties, Wishlist, Reports
from brokers.serializers import UserSerializer, AdminSerializer, PropertySerializer, PropertySearchSerializer

@csrf_exempt
def generate_otp(request):
    if request.method == 'POST':
        try:
            # Get JSON data from request.body
            data = json.loads(request.body.decode('utf-8'))

            name = data.get('name')
            
            if(name == "surya"):										# checks if otp is to be sent to the admin
                user = AdminDetails.objects.get(AdminName=name)
                recipient_list = ["surya20138@iiitd.ac.in"]
            else:														# checks if otp is sent to the user
                user = UsersDetails.objects.get(UserName=name)
                recipient_list = [user.UserMail]
                
            characters = string.digits
            otp = ''.join(random.choice(characters) for _ in range(6))

            user.otpvalidation = otp
            user.save()

            subject = 'Your OTP for Login'
            message = f'Your OTP is: {otp}'
            from_email = settings.EMAIL_HOST_USER
            send_mail(subject, message, from_email, recipient_list)

            return JsonResponse({"success": True})
        
        except Exception as e:
            return JsonResponse({"error": str(e)})



@csrf_exempt
def validate_otp(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            name = data.get('name')
            otp = data.get('otp')

            if(name == "surya"): 										# checks if otp is to be sent to the admin
                user = AdminDetails.objects.get(AdminName=name)
                recipient_list = ["surya20138@iiitd.ac.in"]
            else: 														# checks if otp is sent to the user
                user = UsersDetails.objects.get(UserName=name)
                recipient_list = [user.UserMail]

            if user.otpvalidation == otp:
                
                subject = 'Login Success!!'
                message = 'You have successfully logged in to the RealEstate web site! of Group17!!'
                from_email = settings.EMAIL_HOST_USER
                send_mail(subject, message, from_email, recipient_list)
                
                user.otpvalidation = 0
                user.save()

                return JsonResponse({'response': 1}, status=200)
            else:
                return JsonResponse({'response': 0}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def  userApi(request, id=0):
    if request.method=='GET':
        users = UsersDetails.objects.all()
        user_serializer = UserSerializer(users, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    
    elif request.method=='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added successfully!!", safe=False)
        return JsonResponse(0, safe=False)
    
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        users = UsersDetails.objects.get(UserId=user_data['UserId'])
        user_serializer = UserSerializer(users, data = user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method == 'DELETE':
        users = UsersDetails.objects.get(UserId=id)
        users.delete()
        return JsonResponse("Deleted Successfully")

@csrf_exempt
def  userNameApi(request, userName=None):
    if request.method=='GET':

        if userName:

            try:
                user = UsersDetails.objects.get(UserName=userName)
                user_serializer = UserSerializer(user)
                return JsonResponse(user_serializer.data)
            except UsersDetails.DoesNotExist:
                return JsonResponse(0, safe=False)
            
@csrf_exempt
def manageProperties(request, selling_type=None, location=None, property_type=None):
    try:
        if request.method == 'GET':
            properties = Properties.objects.filter(
                selling_type=selling_type,
                location=location,
                property_type=property_type
            ).select_related('user')

            if not properties.exists():
                return JsonResponse(0, safe=False)

            property_serializer = PropertySearchSerializer(properties, many=True)
            return JsonResponse(property_serializer.data, safe=False)

        elif request.method == 'POST':
            property_data = JSONParser().parse(request)
            property_serializer = PropertySerializer(data=property_data)

            if property_serializer.is_valid():
                property_serializer.save()
                return JsonResponse(property_serializer.data, status=201)

            return JsonResponse(property_serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)


@csrf_exempt
def getUserProperties(request, userName):
    if request.method == 'GET':
        try:
            user = UsersDetails.objects.get(UserName=userName)
            properties = Properties.objects.filter(user=user.UserId)
            if not properties.exists():
                return JsonResponse(0, safe=False)
            property_serializer = PropertySerializer(properties, many=True)
            return JsonResponse(property_serializer.data, safe=False)
        except UsersDetails.DoesNotExist:
            return JsonResponse(0, safe=False)

@csrf_exempt
def update_wishlist(request):
    if request.method == 'POST':
        try:
            # Get JSON data from request.body
            data = json.loads(request.body.decode('utf-8'))

            property_id = data.get('property_id')
            user_name = data.get('user_name')

            property = Properties.objects.get(propertyId=property_id)
            user = UsersDetails.objects.get(UserName=user_name)

            if Wishlist.objects.filter(property=property, user=user).exists():
                Wishlist.objects.filter(property=property, user=user).delete()
                user.decrement_wishlist_count()
            else:
                Wishlist.objects.create(property=property, user=user)
                user.increment_wishlist_count()

            return JsonResponse({"success": True})
        
        except Exception as e:
            return JsonResponse({"error": str(e)})
        

@csrf_exempt
def update_reports(request):

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            property_id = data.get('property_id')
            user_name = data.get('user_name')

            property = Properties.objects.get(propertyId=property_id)
            user = UsersDetails.objects.get(UserName=user_name)

            # Check if the property is already reported by the user
            if Reports.objects.filter(property=property, user=user).exists():
                property.decrement_reports_count()
                Reports.objects.filter(property=property, user=user).delete()
            else:
                property.increment_reports_count()
                Reports.objects.create(property=property, user=user)

            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"error": str(e)})
        
@csrf_exempt
def get_reported_properties(request):
    properties = Properties.objects.filter(reports__gt=0)
    property_serializer = PropertySerializer(properties, many=True)
    return JsonResponse(property_serializer.data, safe=False)
        
@csrf_exempt
def get_wishlisted_properties(request, userName):
    if request.method == 'GET':
        try:
            user = UsersDetails.objects.get(UserName=userName)
            wishlisted_properties = Wishlist.objects.filter(user=user).values_list('property', flat=True)
            properties = Properties.objects.filter(propertyId__in=wishlisted_properties)

            if not properties.exists():
                return JsonResponse(0, safe=False)

            property_serializer = PropertySearchSerializer(properties, many=True)
            return JsonResponse(property_serializer.data, safe=False)

        except UsersDetails.DoesNotExist:
            return JsonResponse(0, safe=False)

@csrf_exempt
def adminApi(request, adminName=None):
    if request.method=='GET':

        if adminName:

            try:
                admins = AdminDetails.objects.get(AdminName=adminName)
                admin_serializer = AdminSerializer(admins)
                return JsonResponse(admin_serializer.data, safe=False)
            except AdminDetails.DoesNotExist:
                return JsonResponse(0, safe=False)
            
        else:
            admins = AdminDetails.objects.all()
            admin_serializer = AdminSerializer(admins, many=True)
            return JsonResponse(admin_serializer.data, safe=False)

    
    elif request.method=='POST':
        admin_data = JSONParser().parse(request)
        admin_serializer = AdminSerializer(data=admin_data)
        if admin_serializer.is_valid():
            admin_serializer.save()
            return JsonResponse("Added successfully!!", safe=False)
        return JsonResponse("Failed to Add", safe=False)