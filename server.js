let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/database'),
    morgan = require('morgan');
    
//Connecting mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database connected')
},
error => {
  console.log('Database could not be connected :' + error)
})

mongoose.set('useFindAndModify', false);

// Setting up express
const app = express();
app.use(morgan('dev')); // log every request in console.log();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

//Api root
const userRoute = require('./routes/student.routes')
const query = require('./routes/query.route')
const userhistory = require('./routes/userhistory.route')
const userinfo = require('./routes/userinfo.route');
const fileToDownload = require('./routes/filedownload.route');
app.use('/endpoint', userRoute)
app.use('/query', query)
app.use('/userhistory', userhistory)
app.use('/userinfo', userinfo)
app.use('/filetodownload', fileToDownload)

// Create port
const port = process.env.PORT || 8080;

//Connecting port
const server = app.listen(port, console.log('Port connected to: ' + port))

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next({'message':'404 not found'});
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));
