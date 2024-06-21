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

conn = psycopg2.connect(**db_params)
conn.autocommit = True

first_names = ["Ana", "João", "Maria", "José", "Carlos", "Pedro", "Luciana", "Beatriz", "Rafael", "Fernanda"]
last_names = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Rodrigues", "Almeida", "Ferreira", "Costa", "Ribeiro"]
email_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"]
weekdays = ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"]

def generate_random_name():
    return f"{random.choice(first_names)} {random.choice(last_names)}"

def generate_random_email(name):
    username = name.lower().replace(" ", "")
    domain = random.choice(email_domains)
    return f"{username}@{domain}"
used_emails = set() 

def generate_unique_email(name):
    while True:
        email = generate_random_email(name)
        if email not in used_emails:
            used_emails.add(email)
            return email

with conn.cursor() as cur:
    for _ in range(50):  # Create 50 users
        user_name = generate_random_name()
        user_email = generate_unique_email(user_name)
        random_weekday = random.choice(weekdays)
        random_city = random.choice(cities)

        cur.execute("""
            INSERT INTO users (name, email, password, weekdays, cities) 
            VALUES (%s, %s, 'password', %s, %s) RETURNING id;""",
            (user_name, user_email, random_weekday, random_city))
        user_id = cur.fetchone()[0]

        post_content = f'Post content by {user_name}'
        cur.execute("INSERT INTO posts (user_id, content) VALUES (%s, %s);", (user_id, post_content))

    for _ in range(50):  # Create 50 albums
        album_title = f'Album about {random.choice(["travel", "food", "nature", "family", "pets"])}'
        album_description = f'A collection of photos showcasing {album_title.lower()}'
        cur.execute("INSERT INTO albums (title, description) VALUES (%s, %s) RETURNING id;", (album_title, album_description))
        album_id = cur.fetchone()[0]

        # 50% chance to assign an album to a random user
        if random.random() < 0.5:  
            cur.execute("SELECT id FROM users ORDER BY RANDOM() LIMIT 1;")
            random_user_id = cur.fetchone()[0]
            cur.execute("INSERT INTO user_albums (user_id, album_id) VALUES (%s, %s);", (random_user_id, album_id))

conn.close()
print('DB population complete!')
