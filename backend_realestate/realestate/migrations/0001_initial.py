# Generated by Django 4.2.7 on 2023-11-03 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UsersDetails',
            fields=[
                ('UserId', models.AutoField(primary_key=True, serialize=False)),
                ('UserName', models.CharField(max_length=500)),
                ('UserMail', models.CharField(max_length=500)),
                ('UserPassword', models.CharField(max_length=50)),
                ('PostedProperties', models.IntegerField()),
                ('RentedProperties', models.IntegerField()),
                ('BoughtProperties', models.IntegerField()),
                ('WishListed', models.IntegerField()),
            ],
        ),
    ]
