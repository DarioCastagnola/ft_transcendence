from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tournament, Player
from .serializers import TournamentSerializer, MatchSerializer
from .views import get_user_id, get_user_info
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from rest_framework.exceptions import NotFound
from .errorResponseSerializer import ErrorResponseSerializer
from .classicTournament import ClassicTournamentManager


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    @extend_schema(
    parameters=[
        OpenApiParameter(name='Token', description='Authorization token', required=True, type=str, location=OpenApiParameter.HEADER),
    ],
    responses={
        status.HTTP_201_CREATED: TournamentSerializer,
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            response=ErrorResponseSerializer,
            description="User not found"
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                response=ErrorResponseSerializer,
                description="Validation errors"
        ),
        }
    )
    def create(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        tournament = Tournament.objects.filter(user_id=user_id).filter(closed=False).first()
        if tournament:
            return Response({"error": "You already have an open tournament"}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy() 
        data['user_id'] = user_id
        serializer = self.get_serializer(data=data)
        player = Player.objects.filter(user_id=user_id).first()
        if not player:
            username = get_user_info(request, "username")
            if username:
                player = Player.objects.create(
                    user_id=user_id, 
                    nickname=username, 
                    type=Player.PLAYER_TYPES[0][0]
                )
                player.save()
            else:
                return Response({"error": "User data could not be retrieved"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        tournament = serializer.instance
        manager = ClassicTournamentManager(tournament)
        try:
            manager.add_player(player)
        except ValueError as e:
            tournament.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
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
    def update(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            instance = self.get_object()
            if instance.user_id != user_id:
                return Response({"error": "You are not authorized to update this tournament"}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
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
    def partial_update(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            instance = self.get_object()
            if instance.user_id != user_id:
                return Response({"error": "You are not authorized to update this tournament"}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
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
    def list(self, request, *args, **kwargs):
        user_id = get_user_id(request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        queryset = self.filter_queryset(self.get_queryset().filter(user_id=user_id))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
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
    def get_queryset(self):
        user_id = get_user_id(self.request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        return Tournament.objects.filter(user_id=user_id)

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
    @action(detail=False, methods=['get'], url_path='open')
    def get_open_tournaments(self, request):
        user_id = get_user_id(self.request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        tournament = Tournament.objects.filter(user_id=user_id).filter(closed=False)
        if not tournament:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(TournamentSerializer(tournament).data)

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
    @action(detail=False, methods=['get'], url_path='closed')
    def get_closed_tournaments(self):
        user_id = get_user_id(self.request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        tournament = Tournament.objects.filter(user_id=user_id).filter(closed=True)
        if not tournament:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(TournamentSerializer(tournament).data)

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
    @action(detail=False, methods=['post'], url_path='add-player')
    def add_player(self, player):
        user_id = get_user_id(self.request)
        if not user_id:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
        if tournament.user_id != user_id:
            return Response({"error": "You are not authorized to add players to this tournament"}, status=status.HTTP_401_UNAUTHORIZED)
        tournament = self.get_object().filter(closed=False).first()
        if not tournament:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)
        manager = ClassicTournamentManager(tournament)
        manager.add_player(player)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    @extend_schema(
        responses={
            status.HTTP_200_OK: MatchSerializer,
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                response=ErrorResponseSerializer,
                description="Tournament not found"
            ),
        }
    )
    @action(detail=False, methods=['get'], url_path='next-match')
    def get_next_match(self, tournament):
        manager = ClassicTournamentManager(tournament)
        match = manager.next_round()
        if not match:
            return Response({"error": "No match found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(MatchSerializer(match).data)
    
    # @extend_schema(
    # responses={
    #     status.HTTP_200_OK: MatchSerializer,
    #     status.HTTP_404_NOT_FOUND: OpenApiResponse(
    #         response=ErrorResponseSerializer,
    #         description="Tournament not found"
    #     ),
    #     status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
    #         response=ErrorResponseSerializer,
    #         description="User not found"
    #     ),
    #     status.HTTP_400_BAD_REQUEST: OpenApiResponse(
    #         response=ErrorResponseSerializer,
    #         description="Validation errors"
    #     ),
    #     status.HTTP_200_OK: MatchSerializer,
    # }
    # )
    # @action(detail=False, methods=['post'], url_path='set-match-winner')
    # def set_match_winner(self, match, winner, draw):
    #     manager = ClassicTournamentManager(match.tournament)
    #     manager.set_match_winner(match, winner, draw)
    #     return Response(MatchSerializer(match).data)