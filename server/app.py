
from config import app

from flask import Flask, request, make_response, jsonify, session, abort
from flask_cors import CORS
# from flask_migrate import Migrate
from models import Squad, User, Post, SquadUsers, db
from flask_restful import Resource


cors = CORS(app, origins="http://localhost:4000")

# Home - for server testing only  ################
@app.route('/')
def home():
    return '<h1> This is home - server is running </h1>'


# SQUADS  ###################################################
@app.route('/squads', methods=['GET', 'POST'])
def squads():
    if request.method == 'GET':
        squads = Squad.query.all()

        response = make_response(
            jsonify([squad.to_dict() for squad in squads]),
            200,
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        squad = Squad(
            name=data['name'],
            image=data['image'],
            description=data['description'],
            owner = data['owner']
        )

        db.session.add(squad)
        db.session.commit()

        response = make_response(
            jsonify(squad.to_dict()),
            201,
        )

    return response

# For Phase 4 test
# Button that allows me to view all my posts and their associated podsquad
@app.route('/posts/<int:user_id>', methods=['GET'])
def get_all_my_posts(user_id):

    posts= Post.query.filter_by(user_id=user_id).all()

    # for post in posts:
    #     print(f'Posting: {post.body}, Squad: {post.squad.name}')

    response = make_response(
        jsonify([post.to_dict() for post in posts]),
        201
    )

    return response


# END  - for test


@app.route('/squads/<int:id>', methods=['PATCH', 'DELETE'])
def squads_by_id(id):
    squad = Squad.query.filter_by(id=id).first()

    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(squad, attr, data[attr])
            
        db.session.add(squad)
        db.session.commit()

        response = make_response(
            jsonify(squad.to_dict()),
            200,
        )

    elif request.method == 'DELETE':
        db.session.delete(squad)
        db.session.commit()

        response = make_response(
            jsonify({'deleted': True}),
            200,
        )

    return response

# POSTS ############################################# 
@app.route('/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'GET':
        posts = Post.query.all()

        response = make_response(
            jsonify([post.to_dict() for post in posts]),
           200,
        )    
    elif request.method == 'POST':
        data = request.get_json()
        post = Post(
            body=data['body'],
            squad_id=data['squad_id'],
            user_id=data['user_id']
        )
        db.session.add(post)
        db.session.commit()

        response = make_response(
            jsonify(post.to_dict()),
            201,
        )
    return response


@app.route('/posts/<int:id>', methods=['DELETE', 'PATCH'])
def deletepost(id):
    if request.method == 'DELETE':
        post = Post.query.filter_by(id=id).first()
        if request.method == 'DELETE':
            db.session.delete(post)
            db.session.commit()

            response = make_response(
                jsonify({'deleted': True}),
                200,
        )
    elif request.method == 'PATCH':
        post = Post.query.filter_by(id=id).first()

        if request.method == 'PATCH':
            data = request.get_json()
            for attr in data:
                setattr(post, attr, data[attr])
                
            db.session.add(post)
            db.session.commit()

            response = make_response(
                jsonify(post.to_dict()),
                200,
            )


    return response


# USERS - post new user and put user into session ###################
@app.route('/users', methods=['POST'])
def create_user():
    form_json = request.get_json()
    new_user = User(
        username=form_json['name'],
        email=form_json['email'],
    )

    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id

    response = make_response(
        new_user.to_dict(),
        201,
    )

    return response



# SQUADUSERS - who is a member of a squad?
@app.route('/squadusers', methods=['POST', 'GET'])
def join_squad():
    if request.method == 'GET':
        squadusers = SquadUsers.query.all()

        response = make_response(
            jsonify([squaduser.to_dict() for squaduser in squadusers]),
           200,
        )   
    elif request.method == 'POST':
        data = request.get_json()
        squaduser=SquadUsers(
            squad_id=data['squad_id'],
            user_id=data['user_id'],
            membership=data['membership']
        )
        db.session.add(squaduser)
        db.session.commit()

        response = make_response(
            jsonify(squaduser.to_dict()),
            201,
        )

    return response
    
# SQUADUSERS --- DELETE
@app.route('/squadusers/<int:id>', methods=['DELETE'])
def deletemembership(id):
    membership = SquadUsers.query.filter_by(id=id).first()
    if request.method == 'DELETE':
        db.session.delete(membership)
        db.session.commit()

        response = make_response(
            jsonify({'deleted': True}),
            200,
        )

    return response




# LOGIN ###########################
@app.route('/login', methods=['POST'])
def post():
    user=User.query.filter_by(username=request.get_json()['name']).first()
    session['user_id'] = user.id
    # import ipdb; ipdb.set_trace()
    response = make_response(
        user.to_dict(),
        200
    )
    return response


# ############# Authorized?  ##################
@app.route('/authorized', methods=['GET'])
def get():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if user:
        response = make_response(
            user.to_dict(),
            200
        )
        return response
    else:
        abort(401, "Unauthorized")

# ############# Logout ##################

@app.route('/logout', methods=['DELETE'])
def delete():
    session['user_id'] = None
    response = make_response("", 204)
    return response



if __name__ == "__main__":
  app.run(port=5555, debug=True)




