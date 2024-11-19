FROM python:3.12-slim

WORKDIR /game

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install django-cors-headers

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "./wait_for_db.sh db_game 5432 && python3 manage.py migrate && gunicorn --reload --bind 0.0.0.0:8004 game.wsgi:application"]
