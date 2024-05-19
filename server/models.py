
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from config import db


metadata = MetaData()



# Join Table - many to many (users to squads)
class SquadUsers(db.Model, SerializerMixin):
   __tablename__='squadusers'
   id=db.Column(db.Integer, primary_key=True)
   membership=db.Column(db.Boolean)
   squad_id = db.Column(db.Integer, db.ForeignKey('squads.id'))
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

   squad = db.relationship('Squad', back_populates='squadusers')
   user= db.relationship('User', back_populates='squadusers')

   # serialize_rules=('-squad.squadusers', '-user.squadusers', '-squd.squad_id', '-user.user_id')
   serialize_rules=('-squad', '-user', )


# user can have many posts (one to many)
class User(db.Model, SerializerMixin):
   __tablename__ = 'users'
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(25), nullable=False)
   email = db.Column(db.String(255), nullable=False)
   # Relationships:
   posts = db.relationship('Post', back_populates='user')

   squadusers = db.relationship('SquadUsers', back_populates='user', cascade='all, delete-orphan' )

   serialize_rules=('-squadusers.user','-squadusers.squad',)


   def __repr__(self):
      return f'<User: {self.username}, email: {self.email} >'



class Squad(db.Model, SerializerMixin):
   __tablename__ = 'squads'
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(25), nullable=False)
   image = db.Column(db.String)
   description = db.Column(db.String(200))
   owner = db.Column(db.Integer, db.ForeignKey('users.id'))
   # relationships:
   posts = db.relationship('Post', back_populates='squad')
   squadusers = db.relationship('SquadUsers', back_populates='squad', cascade='all, delete-orphan' )

   serialize_rules=('-squdusers.user', '-squadusers.squad',)



   def __repr__(self):
      return f'<Squad: {self.name}, imageURL: {self.image}, description: {self.description}>'


# each post belongs to a user (one to many)
class Post(db.Model, SerializerMixin):
   __tablename__ = 'posts'

   id = db.Column(db.Integer, primary_key=True)
   body = db.Column(db.String)
   squad_id = db.Column(db.Integer, db.ForeignKey('squads.id'))
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   # Relationships:
   user = db.relationship('User', back_populates='posts')
   squad = db.relationship('Squad', back_populates='posts')

   # add ser
   # serialize_rules = (
   #    '-user.email','-user.posts', '-squad', '-squadusers',)
   
   # updated for phase 4 test
   serialize_rules = (
      '-user.email','-user.posts', '-squad.posts', '-squad.image', '-squad.description', '-squadusers',)


   def __repr__(self):
      return f'< Message: {self.body} >'