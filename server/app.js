const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
var morgan = require('morgan')


const routes = require('./routes/');

const app = express();
const router = express.Router();

//env variables
const mongooseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/fakemedium';
let port = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

try {
    mongoose.connect(mongooseUrl,{ useNewUrlParser: true });
    console.log('connected to mongodb');
} catch(error) {
    console.error(error);
}

// setup the logger
app.use(morgan('combined'))

routes(router);
// router.route('/test').get((req,res,next)=>{
//     console.log('works');
//     res.send({status:"success"});    
//     next();
// });

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use('/api', router);

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});