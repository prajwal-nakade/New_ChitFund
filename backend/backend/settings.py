from pathlib import Path
from datetime import timedelta
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-b%x6g@r%co9oyjdoi4k4f$6x^g#jr03a-h1^xl&0y$8onlkfa6"

DEBUG = True

# ✅ Allow LAN IP
ALLOWED_HOSTS = ['*']


# ✅ Applications
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "cheatfund"
]


# ✅ Middleware (CORS must be high)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'cheatfund.auth.CookieAuthentication',
    )
}

ROOT_URLCONF = "backend.urls"


#  CORS (IMPORTANT - do NOT use allow all)
CORS_ALLOWED_ORIGINS = [
    "http://192.168.1.16:5173",
    "http://192.168.1.16",
    "http://localhost:5173",  
    "http://192.168.1.12:5173" 
]

CORS_ALLOW_CREDENTIALS = True


#  CSRF FIX (VERY IMPORTANT)
CSRF_TRUSTED_ORIGINS = [
    "http://192.168.1.16:5173",
    "http://192.168.1.16",
    "http://192.168.1.12:5173",
    "http://192.168.1.12:8000",
    "http://192.168.1.16"
    
]


#  COOKIE FIX (CRITICAL FOR LOGIN)
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = False   # set True in HTTPS

CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = False


#  Headers
CORS_ALLOW_HEADERS = [
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "ngrok-skip-browser-warning",
]


#  Media
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Templates
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "backend.wsgi.application"


#  JWT Config
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=9),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "USER_ID_FIELD": "username",
}


#  PostgreSQL Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "chitfund_db",
        "USER": "postgres",
        "PASSWORD": "Amrut2004.",
        "HOST": "db",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "prefer"
        }
    }
}


# Custom User Model
AUTH_USER_MODEL = 'cheatfund.UserCredentials'


# Password Validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


#  Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


#  Static files
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",   # your global static folder
]

STATIC_ROOT = BASE_DIR / "staticfiles"


#  Default PK
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"