from django.urls import path
from .views import UserProfileDetail, UserProfileUpdate, AddFriendView, RemoveFriendView, IsOnline, UpdateLastSeen

urlpatterns = [
    path('user-profile/<int:user_id>/', UserProfileDetail.as_view(), name='user-profile-detail'),
    path('user-profile/', UserProfileUpdate.as_view(), name='user-profile-update'),
    path('add-friend/', AddFriendView.as_view(), name='add-friend'),
    path('remove-friend/', RemoveFriendView.as_view(), name='remove-friend'),
    path('is-online/<int:user_id>/', IsOnline.as_view(), name='is-online'),
    path('update-last-seen/', UpdateLastSeen.as_view(), name='update-last-seen'),
]