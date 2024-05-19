# from config import app
from app import app
from models import Squad, User, Post, SquadUsers, db


def create_squads():
  squads = []

  squads.append(Squad(name='Sunday Sitdown', image='https://m.media-amazon.com/images/I/51+HNJBn0LL._SL500_.jpg', description='Conversations with Willie Geist and speical guests', owner=1))

  squads.append(Squad(name='Armchair Expert', image='https://i.iheart.com/v3/url/aHR0cHM6Ly9tZWdhcGhvbmUuaW1naXgubmV0L3BvZGNhc3RzLzFmNmJmY2VjLTIyNzQtMTFlZS04ZWQxLTU3NTcxOTQ0ZDgyZi9pbWFnZS9Bcm1jaGFpcl9FeHBlcnRfLV9BX1Nwb3RpZnlfUG9kY2FzdC5qcGc_aXhsaWI9cmFpbHMtNC4zLjEmbWF4LXc9MzAwMCZtYXgtaD0zMDAwJmZpdD1jcm9wJmF1dG89Zm9ybWF0LGNvbXByZXNz?ops=fit(960%2C960)', description='Dax Shepard dishing adivce', owner=2))    
  
  squads.append(Squad(name='Don\'t Ask Tig', image='https://img.apmcdn.org/62790abdbd1ccfe17022faf1b235df1100d97628/square/77795b-20200622-don-t-ask-tig-podcast-tile.jpg', description='The adivce you shouldn\'t have asked for', owner=3))
  
  squads.append(Squad(name='We Can Do Hard Things', image='https://i.scdn.co/image/ab67656300005f1f31936fcc7887c8a10ba9af9d', description='Tune in for Inspiration when you need it', owner=1))

  return squads


def create_users():
  users = []

  users.append(User(username='Rachel', email='rachel@gmail.com')) 
  users.append(User(username='Mike', email='mike@gmail.com'))
  users.append(User(username='Sam', email='sam@gmail.com'))  
    
  return users


def create_posts():
  posts = []

  posts.append(Post(body="This podcast makes my day", squad_id=1, user_id=1)) 
  posts.append(Post(body="Thank you for tackling hard things with us.", squad_id=1,user_id=2)) 
  posts.append(Post(body="Never disappoints!!", squad_id=1, user_id=3)) 
  posts.append(Post(body="Love it!", squad_id=2, user_id=1)) 
  posts.append(Post(body="Love this pod!", squad_id=2, user_id=2)) 
  posts.append(Post(body="always informative/ thought provoking.", squad_id=2, user_id=1)) 
  posts.append(Post(body="Love ❤️ the pod.", squad_id=3, user_id=3)) 
  posts.append(Post(body="You inspire me every time!!.", squad_id=2, user_id=2)) 
  posts.append(Post(body="love this", squad_id=3, user_id=3)) 
  posts.append(Post(body="Big love 🤙", squad_id=4, user_id=1)) 
  posts.append(Post(body="Love this pod!", squad_id=4, user_id=3)) 
  posts.append(Post(body="Keeping it real", squad_id=4, user_id=1)) 
  
  return posts


def create_squad_users():
    squadusers=[]
    squadusers.append(SquadUsers(squad_id=1, user_id=1, membership=True))
    squadusers.append(SquadUsers(squad_id=2, user_id=1, membership=True))
    squadusers.append(SquadUsers(squad_id=3, user_id=1, membership=True))
    squadusers.append(SquadUsers(squad_id=4, user_id=1, membership=True))

    

    return squadusers

if __name__ == "__main__":
  with app.app_context():
    print("clearing database...")
    Squad.query.delete()
    User.query.delete()
    Post.query.delete()
    SquadUsers.query.delete()

    print("seeding squads...")
    squads = create_squads()
    db.session.add_all(squads)
    db.session.commit()

    print("seeding users...")
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print("seeding posts...")
    posts = create_posts()
    db.session.add_all(posts)
    db.session.commit()

    print("seeding squadusers...")
    squadusers = create_squad_users()
    db.session.add_all(squadusers)
    db.session.commit()

    print("Done seeding!")
