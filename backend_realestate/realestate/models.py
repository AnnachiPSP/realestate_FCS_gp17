from django.db import models

class UsersDetails(models.Model):

	UserId = models.AutoField(primary_key=True)
	UserName = models.CharField(max_length=500)
	UserMail = models.CharField(max_length=500)
	UserPassword = models.CharField(max_length=50)
	PostedProperties = models.IntegerField(default=0)
	RentedProperties = models.IntegerField(default=0)
	BoughtProperties = models.IntegerField(default=0)
	WishListed = models.IntegerField(default=0)

	def increment_posted_properties(self):
		self.PostedProperties += 1
		self.save()

	def increment_wishlist_count(self):
		self.WishListed += 1
		self.save()

	def decrement_wishlist_count(self):
		self.WishListed -= 1
		self.save()

class Properties(models.Model):
	
	propertyId = models.AutoField(primary_key=True)
	user = models.ForeignKey('UsersDetails', on_delete=models.CASCADE)
	selling_type = models.CharField(max_length=10, choices=[('Buy', 'Buy'), ('Rent', 'Rent')])
	coast = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
	emi = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
	rent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
	deposit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
	location = models.CharField(max_length=500)
	property_type = models.CharField(max_length=100)
	deal_made = models.BooleanField(default=False)
	reports = models.IntegerField(default=0)

	def increment_reports_count(self):
		self.reports += 1
		self.save()

	def decrement_reports_count(self):
		self.reports -= 1
		self.save()

class Wishlist(models.Model):
    user = models.ForeignKey('UsersDetails', on_delete=models.CASCADE)
    property = models.ForeignKey('Properties', on_delete=models.CASCADE)

class Reports(models.Model):
    property = models.ForeignKey('Properties', on_delete=models.CASCADE, related_name='property_reports')
    user = models.ForeignKey('UsersDetails', on_delete=models.CASCADE)
	
class AdminDetails(models.Model):
	AdminId = models.AutoField(primary_key=True)
	AdminName = models.CharField(max_length=500)
	AdminPass = models.CharField(max_length=50)