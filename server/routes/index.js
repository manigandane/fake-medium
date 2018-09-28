const userRoute = require('./user');
const articleRoute = require('./article');

module.exports = (router) => {
    console.log('setting up routes');
    userRoute(router);
    articleRoute(router);
}