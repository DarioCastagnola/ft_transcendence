from django.urls import path
from .views import hello_world, VerifyTokenView

urlpatterns = [
    path('hello_world/', hello_world, name='hello_world'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify-token'),
]