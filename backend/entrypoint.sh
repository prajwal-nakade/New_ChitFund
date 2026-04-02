#!/bin/sh

echo "Waiting for database..."
sleep 5

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
exec gunicorn --bind 0.0.0.0:8000 backend.wsgi:application