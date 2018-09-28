const User = require('./../models/user');
const Article = require('./../models/article');

module.exports = {
    addUser: (req, res, next) => {
        new User(req.body).save((err, newUser) => {
            if(err) {
                res.send(err);
            } else if (!newUser) {
                res.send(400);
            } else {
                res.send(newUser);
            }
            next();
        });
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id).then((err, user) => {
            if(err) {
                res.send(err);
            } else if (!user) {
                res.send(400);
            } else {
                res.send(user);
            }
            next();
        });
    },

    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(()=> {
                return res.json({msg: 'followed!'});
            });
        }).catch(next);
    },

    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then((_user)=>{
            return User.find({'following' : req.params.id}).then((users)=>{
                users.forEach((u)=>{
                    _user.addFollower(u);
                });

                return Article.find({'author': req.params.id}).then((_articles)=>{
                    return res.json({user: _user, articles: _articles});
                });
            });
        }).catch((err) => {
            console.error(err);
        });
    }
};