from rest_framework import serializers
from .models import User,Habits,Habit

class HabitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habit
        fields = ('id','habits','title', 'completed')


class HabitsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habits
        fields = ('id','user', 'date', 'count')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'name')