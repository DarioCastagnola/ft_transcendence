import requests
import jwt
import requests
from django.http import JsonResponse
from django.conf import settings


def get_user_info(token):
    url = 'http://authentication:8002/api/auth/user-info/'
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return None
    

def validate_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({"detail": "Authorization header not provided"}, status=400)
    
    parts = auth_header.split()
    if len(parts) != 2 or parts[0] != 'Bearer':
        return JsonResponse({"detail": "Authorization header must be 'Bearer <token>'"}, status=400)
    
    token = parts[1]

    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return decoded_token, auth_header
    except jwt.ExpiredSignatureError:
        return JsonResponse({"detail": "Token has expired"}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({"detail": "Invalid token"}, status=401)

def forward_request(request, endpoint):
    validation_result = validate_token(request)

    if isinstance(validation_result, JsonResponse):
        return validation_result

    decoded_token, auth_header = validation_result

    headers = {'Authorization': auth_header}
    response = requests.get(endpoint, headers=headers)

    return JsonResponse(response.json(), status=response.status_code)


def get_user_id(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({"detail": "Authorization header not provided"}, status=400)
    
    parts = auth_header.split()
    if len(parts) != 2 or parts[0] != 'Bearer':
        return JsonResponse({"detail": "Authorization header must be 'Bearer <token>'"}, status=400)
    
    token = parts[1]

    url = 'http://authentication:8002/api/auth/user-info/'
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()['id']
    else:
        return None