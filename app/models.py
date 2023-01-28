from django.db import models

class User(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
         return self.name

class Habits(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, null=False)
    date = models.CharField(max_length=100)
    count = models.IntegerField(default=0)

    def __str__(self):
         return self.date

class Habit(models.Model):
    habits = models.ForeignKey(Habits,on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=200)
    completed = models.BooleanField()
    
    def __str__(self):
        return self.title