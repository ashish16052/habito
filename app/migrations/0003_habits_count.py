# Generated by Django 4.1.5 on 2023-01-26 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_user_age_habits_habit'),
    ]

    operations = [
        migrations.AddField(
            model_name='habits',
            name='count',
            field=models.IntegerField(default=0),
        ),
    ]
