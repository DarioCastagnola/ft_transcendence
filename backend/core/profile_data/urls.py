from django.urls import path
from .views import UserInfoView, VerifyTokenView, UserProfileDetail, UserProfileUpdate

urlpatterns = [
    path('verify-token/', VerifyTokenView.as_view(), name='verify-token'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('user-profile/<int:user_id>/', UserProfileDetail.as_view(), name='user-profile-detail'),
    path('user-profile/', UserProfileUpdate.as_view(), name='user-profile-update'),
]