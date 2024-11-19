FROM python:3.12-slim

WORKDIR /authentication

COPY requirements.txt ./

RUN apt-get update && apt-get install -y postgresql-client

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install django-cors-headers

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "./wait_for_db.sh db_auth 5432 && python3 manage.py migrate && gunicorn --reload --bind 0.0.0.0:8002 authentication.wsgi:application"]
