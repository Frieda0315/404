#!/bin/sh
rm db.sqlite3
python manage.py migrate
python manage.py loaddata scripts/super.json

