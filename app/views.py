from django.shortcuts import render
from rest_framework import viewsets
from .models import User,Habits,Habit
from .serializers import UserSerializer,HabitsSerializer,HabitSerializer

class UserView(viewsets.ModelViewSet):
 
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def put(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id=None):
        user = User.objects.filter(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HabitsView(viewsets.ModelViewSet):
 
    serializer_class = HabitsSerializer
    queryset = Habits.objects.all()

    def get_queryset(self):
        queryset = Habits.objects.all()
        user = self.request.query_params.get('user')
        date = self.request.query_params.get('date')
        print(date)
        if user:
            queryset = queryset.filter(user=user)
        if date:
            queryset = queryset.filter(date=date)
        return queryset
    
    def put(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = HabitsSerializer(habits, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        habits = Habits.objects.filter(id=id)
        habits.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HabitView(viewsets.ModelViewSet):
 
    serializer_class = HabitSerializer
    queryset = Habit.objects.all()

    def get_queryset(self):
        queryset = Habit.objects.all()
        habits = self.request.query_params.get('habits')
        title = self.request.query_params.get('title')
        if habits:
            queryset = queryset.filter(habits=habits)
        if title:
            queryset = queryset.filter(title=title)
        return queryset
    
    def put(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = HabitSerializer(habit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        habit = Habit.objects.filter(id=id)
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)