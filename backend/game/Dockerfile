FROM python:3.12-slim

WORKDIR /game

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install django-cors-headers

COPY . .

ENV PYTHONUNBUFFERED=1

