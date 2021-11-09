#!/bin/sh
rm db.sqlite3
python manage.py migrate
python manage.py loaddata scripts/super.json
python manage.py loaddata scripts/user.json
python manage.py loaddata scripts/post.json
