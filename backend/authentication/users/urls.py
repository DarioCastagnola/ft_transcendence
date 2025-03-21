from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from oauth2_provider.views import TokenView
from .views import RegisterView, LoginView, VerifyOTPView, Enable2FAView, DeleteUserView, OAuth2CallbackView, UserInfoView, LogoutView, TokenRefreshCookieView, is_Oauth2View, UserListView
from .views import TokenRefreshCookieView, UpdateUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('enable-2fa/', Enable2FAView.as_view(), name='enable_2fa'),
    # path('delete-user/', DeleteUserView.as_view(), name='delete_user'),
    path('oauth/callback/', OAuth2CallbackView.as_view(), name='oauth_callback'),
    path('user-info/', UserInfoView.as_view(), name='user_info'),
    path('token/refresh-cookie/', TokenRefreshCookieView.as_view(), name='token_refresh_cookie'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('is-oauth2/', is_Oauth2View.as_view(), name='is_oauth2'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('update-user/', UpdateUserView.as_view(), name='update_user'),
]