from config import app, db
# import email
from random import choice as rc, randint

# from faker import Faker

from app import app
from models import db, User, Squad


with app.app_context():
  #  Delete all rows in tables
  Squad.query.delete()

  #  add squads
  s1 = Squad(name='Sunday Sitdown', image='https://image.simplecastcdn.com/images/4bf8292b-a5be-4d3a-a88c-328f0f42e38f/79d98736-2db7-473a-b591-191163d66a87/3000x3000/ss-jonbatiste-episodicartwork.jpg?aid=rss_feed', description='Conversations with Willie Geist and speical guests')
  s2 = Squad(name='Armchair Expert', image='https://i.iheart.com/v3/url/aHR0cHM6Ly9tZWdhcGhvbmUuaW1naXgubmV0L3BvZGNhc3RzLzFmNmJmY2VjLTIyNzQtMTFlZS04ZWQxLTU3NTcxOTQ0ZDgyZi9pbWFnZS9Bcm1jaGFpcl9FeHBlcnRfLV9BX1Nwb3RpZnlfUG9kY2FzdC5qcGc_aXhsaWI9cmFpbHMtNC4zLjEmbWF4LXc9MzAwMCZtYXgtaD0zMDAwJmZpdD1jcm9wJmF1dG89Zm9ybWF0LGNvbXByZXNz', description='Dax Shepard dishing adivce')
  s3 = Squad(name='Don\'t Ask Tig', image='https://img.apmcdn.org/62790abdbd1ccfe17022faf1b235df1100d97628/normal/56a01d-20200622-don-t-ask-tig-podcast-tile.jpg', description='The adivce you shouldn\'t have asked for')
  s4 = Squad(name='We Can Do Hard Things', image='https://m.media-amazon.com/images/M/MV5BNjhiYTg1NDAtMTZmOS00YzA0LWI2YjMtMjQ4NTVlMWI3OTUwXkEyXkFqcGdeQXVyMTU3MzMwNQ@@._V1_.jpg', description='Tune in for Inspriation when you need it')

  db.session.add_all([s1, s2, s3, s4])
  db.session.commit()



   

# fake = Faker()

# usernames = [fake.first_name() for i in range(4)]
# if "Duane" not in usernames:
#     usernames.append("Duane")

# def make_users():

#     User.query.delete()
    
#     users = []

#     for i in range(3):
#         user = User(
#             email=fake.email(),
#             name=fake.name()
#         )
#         users.append(user)

#     db.session.add_all(users)
#     db.session.commit()  


# if __name__ == "__main__":
#   with app.app_context():
#     make_users()
#     # remove pass and write your seed data
