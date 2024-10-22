from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from oauth2_provider.views import TokenView
from .views import RegisterView, LoginView, VerifyOTPView, Enable2FAView, DeleteUserView, OAuth2CallbackView, UserInfoView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('enable-2fa/', Enable2FAView.as_view(), name='enable_2fa'),
    # path('delete-user/', DeleteUserView.as_view(), name='delete_user'),
    path('oauth/callback/', OAuth2CallbackView.as_view(), name='oauth_callback'),
    path('user-info/', UserInfoView.as_view(), name='user_info'),
]