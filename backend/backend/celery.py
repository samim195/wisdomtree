import os
from celery import Celery
from celery.schedules import crontab  # Import crontab for periodic scheduling

# Set default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Load task modules from all registered Django app configs
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in Django apps
app.autodiscover_tasks()

# Define Celery Beat schedule for periodic tasks
app.conf.beat_schedule = {
    'fetch_coinbase_every_hour': {
        'task': 'products.tasks.fetch_coinbase_data',
        'schedule': crontab(minute=0, hour='*'),  # Runs every hour
    },
}

