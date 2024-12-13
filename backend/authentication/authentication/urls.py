from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView # type: ignore
from rest_framework.permissions import AllowAny

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/auth/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/auth/docs/', SpectacularSwaggerView.as_view(), name='swagger-ui'),
    
]