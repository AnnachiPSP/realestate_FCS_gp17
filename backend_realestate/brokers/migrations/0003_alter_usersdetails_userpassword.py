# Generated by Django 4.2.7 on 2023-11-21 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brokers', '0002_admindetails_otpvalidation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersdetails',
            name='UserPassword',
            field=models.CharField(max_length=5000),
        ),
    ]
