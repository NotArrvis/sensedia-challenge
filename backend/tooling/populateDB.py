import psycopg2
import random
import uuid
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os



load_dotenv()

db_params = {
    'dbname': os.getenv('DB_DATABASE'),
    'user': os.getenv('DB_USERNAME'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}

print(db_params)

conn = psycopg2.connect(**db_params)
conn.autocommit = True

weekdays = ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]

with conn.cursor() as cur:
    for i in range(50):
        user_name = f'User_{uuid.uuid4()}'
        user_email = f'{user_name.lower()}@example.com'


        random_weekday_index = random.randint(0, 6)
        random_weekday = weekdays[random_weekday_index]

        cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"]
        random_city = random.choice(cities)

        cur.execute("""
            INSERT INTO users (name, email, password, weekdays, cities) 
            VALUES (%s, %s, 'password', %s, %s) RETURNING id;""",
            (user_name, user_email, random_weekday, random_city))
        user_id = cur.fetchone()[0]

        post_content = f'Post content by {user_name}'
        cur.execute("INSERT INTO posts (user_id, content) VALUES (%s, %s);", (user_id, post_content))

    for i in range(50):
        album_title = f'Album_{uuid.uuid4()}'
        album_description = f'Description for {album_title}'
        cur.execute("INSERT INTO albums (title, description) VALUES (%s, %s) RETURNING id;", (album_title, album_description))
        album_id = cur.fetchone()[0]

        if random.choice([True, False]):
            cur.execute("SELECT id FROM users ORDER BY RANDOM() LIMIT 1;")
            random_user_id = cur.fetchone()[0]
            cur.execute("INSERT INTO user_albums (user_id, album_id) VALUES (%s, %s);", (random_user_id, album_id))

conn.close()
print('DB population complete!')
