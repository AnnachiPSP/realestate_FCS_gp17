from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def say_hello(request):
    sample = "Some data from the backend"
    return JsonResponse({'sample': sample})