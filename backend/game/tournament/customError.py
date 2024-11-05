from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None:
        if "detail" in response.data:
            # Usa il messaggio "detail" se presente
            response.data = {"error": response.data["detail"]}
        else:
            # Gestione per errori in forma di dizionario con più campi
            response.data = {
                "error": " ".join(f"{k}: {v[0]}" for k, v in response.data.items())
            }
    
    return response