FROM python:3.12-slim

WORKDIR /core

COPY requirements.txt ./

RUN mkdir -p media/avatars

COPY copy_avatars.sh /copy_avatars.sh
RUN chmod +x /copy_avatars.sh

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install django-cors-headers

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "./wait_for_db.sh db_core 5432 && /copy_avatars.sh && python3 manage.py migrate && gunicorn --reload --bind 0.0.0.0:8003 core.wsgi:application"]
