import requests
import requests

def get_user_id(request):
    access_token = request.COOKIES.get('access_token')
    refresh_token = request.COOKIES.get('refresh_token')
    if not access_token:
        return None  
    
    url = 'http://authentication:8002/api/auth/user-info/'
    
    cookies = {'access_token': access_token, 'refresh_token': refresh_token}
    
    response = requests.get(url, cookies=cookies)

    if response.status_code == 200:
        return response.json().get('id') 
    else:
        return None