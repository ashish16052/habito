from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user',views.UserView,'user')
router.register('habits',views.HabitsView,'habits')
router.register('habit',views.HabitView,'habit')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]