from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Tournament
from .serializers import TournamentSerializer
from .views import get_user_id
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from rest_framework.exceptions import NotFound
from .errorResponseSerializer import ErrorResponseSerializer


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    @extend_schema(
    parameters=[
        OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
    ],
    responses={
        status.HTTP_200_OK: TournamentSerializer,
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="User not found"
        ),
        }
    )
    def create(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy() 
        data['id_user'] = user_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    
    @extend_schema(
    parameters=[
        OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
    ],
    responses={
        status.HTTP_204_NO_CONTENT: OpenApiResponse(None),
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="Tournament not found"
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="User not found"
        ),
        }
    )
    def destroy(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            tournament = self.get_object()  
            if tournament.user_id != user_id:
                return Response({"error": "You are not authorized to delete this tournament"}, status=status.HTTP_401_UNAUTHORIZED)
            self.perform_destroy(tournament)  
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @extend_schema(
    parameters=[
        OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
    ],
    responses={
        status.HTTP_200_OK: TournamentSerializer,
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="Tournament not found"
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="User not found"
        ),
        }
    )
    def retrieve(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            instance = self.get_object()
            if instance.user_id != user_id:
                return Response({"error": "You are not authorized to view this tournament"}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except NotFound:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        