const articleController = require('./../controllers/article.ctrl');
const multipart = require('connect-multiparty')();

module.exports = (router) => {
    router.route('/articles').get(articleController.getAll);
    router.route('/article/:id').get(articleController.getArticle);
    router.route('/article').post(multipart, articleController.addArticle);
    router.route('article/clap').post(articleController.clapArticle);
    router.route('/article/comment').post(articleController.commentArticle);
}
