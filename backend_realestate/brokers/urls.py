from django.urls import path
from brokers import views

urlpatterns = [
    path('userdetail', views.userApi),
	path('userdetail/<int:id>', views.userApi),
	path('adminApi/<str:adminName>/', views.adminApi),
	path('adminApi', views.adminApi),	
	path('userNameApi/<str:userName>', views.userNameApi),
	path('postproperty', views.manageProperties),
	path('postproperty/<str:selling_type>/<str:location>/<str:property_type>/', views.manageProperties),
	path('userproperties/<str:userName>/', views.getUserProperties),
	path('update_wishlist/', views.update_wishlist),
	path('update_reports/', views.update_reports),
	path('get_wishlisted_properties/<str:userName>/', views.get_wishlisted_properties),
	path('get_reported_properties', views.get_reported_properties),
	path('generate_otp/', views.generate_otp),
    path('validate_otp/', views.validate_otp),
]