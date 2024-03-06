from config import app, db
import email
from random import choice as rc, randint

from faker import Faker

from app import app
from models import db, User

fake = Faker()

usernames = [fake.first_name() for i in range(4)]
if "Duane" not in usernames:
    usernames.append("Duane")

def make_users():

    User.query.delete()
    
    users = []

    for i in range(3):
        user = User(
            email=fake.email(),
            name=fake.name()
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()  


if __name__ == "__main__":
  with app.app_context():
    make_users()
    # remove pass and write your seed data
