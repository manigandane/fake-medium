const User = require('./../models/user');
const Article = require('./../models/article');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addArticle: (req, res, next) => {
        let { text, title, claps, description } = req.body;
        let obj = 
                {
                    text, 
                    title, 
                    claps, 
                    description, 
                    feature_img: ''
                };

        if (req.files.image){
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                obj.feature_img = result.url != null ? result.url : '';
                saveArticle(obj);
            },
            {
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            });
        } else {
            saveArticle(obj);
        }

        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err) { 
                    res.send(err);
                } else if (!article) { 
                    res.send(400);
                } else { 
                    return article.addArticle(req.body.author_id).then((_article=>{
                        return res.send(_article);
                    }));
                }
                next();
            })
        }
    },

    getAll: (req, res, next) => {
        Article.find(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err,article) => {
            if(err) {
                res.send(err);
            } else if (!article){
                res.send(404);
            } else {
                res.send(article);
            }
            next();            
        })
    },

    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id)
        .then((article)=>{
            return article.clap().then(()=>{
                return res.json({msg: 'Done'});
            })
        })
        .catch(next);
    },

    commentArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article)=>{
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(()=> {
                return res.json({msg: "Done"});
            })
        }).catch(next);
    },

    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article) => {
            if(err) {
                res.send(err);
            } else if (!article) {
                res.send(404);
            } else {
                res.send(article);
            }
            next();
        });
    }
}