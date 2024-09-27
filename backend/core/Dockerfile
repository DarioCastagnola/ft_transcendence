FROM python:3.12-slim

WORKDIR /core

COPY requirements.txt ./

RUN mkdir -p media/avatars

COPY copy_avatars.sh /copy_avatars.sh
RUN chmod +x /copy_avatars.sh

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

