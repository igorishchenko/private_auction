const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const apiRoutes = express.Router();

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/user');
const Item = require('./app/models/item');
const UserBid = require('./app/models/usersBid');

const port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', apiRoutes);


//User actions!
  app.post('/setup', (req, res, next) => {
    User.create(req.body).then((user) => {
        res.send(user);
    }).catch(next);
  });

  //route to return all users
  apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      console.log(users);
      res.json(users);
    });
  });

  apiRoutes.delete('/users/:id', (req, res) => {
    User.remove({
      id: req.params._id
    }).then((err, user) => {
      if(err){
        throw err || res.statusCode;
      } else {
        console.log("User has beeen removed!");
        res.send(user);
      }
    });
  });

  apiRoutes.get('/users/:id', (req, res) => {
    User.findOne({_id:req.params.id}, req.body).then((user)=>{
      res.send(user);
    });
  });

  apiRoutes.put('/users/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
      User.findOne({_id: req.params.id}).then((user) => {
        res.send(user);
      })
    });
  });

  //auth and token
  apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found'});
      } else if (user) {
        if (user.password !=req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password'});
        } else {
          const payload = {
            admin: user.admin
          };
          const token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn : 60*60*24
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
          });
        }
      }
    });
  });
//end of user actions

//Item action
  apiRoutes.get('/products', (req, res) => {
    Item.find({}, (err, items) => {
      try {
        console.log(items);
        res.json(items);
      } catch (err) {
        throw err || res.statusCode;
      }
    });
  });

  apiRoutes.post('/addItem', (req, res, next) => {
    Item.create(req.body).then((item) => {
        res.send(item);
    }).catch(next);
  });

  apiRoutes.delete('/deleteItem/:id', (req, res) => {
    Item.remove({
      id: req.params.id
    }).then((err, item) => {
      try {
        res.send(item);
      } catch (err) {
        throw err || res.statusCode;
      }
    });
  });

  apiRoutes.get('/product/:id', (req, res) => {
    Item.findOne({id: req.params.id}, req.body).then((item) => {
      res.send(item);
    });
  });
//end of item actions

//User Bid Action
apiRoutes.post('/userbid', (req, res, next) => {
  UserBid.find({}, (err, userbid) => {
    let filteredArr = [];
    userbid.filter(data => {
      let lastofId = data.product_id == req.body.product_id;      
      if (lastofId) {
        filteredArr.push(data);
        filteredArr.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    });
    if (filteredArr[0].currentBid == req.body.currentBid) {
      res.json({ success: false, message: 'You cant create a bid. Your\'s bid is last'});
    } else {
      UserBid.create(req.body).then((bid) => {
        res.send(bid);
      }).catch(next);
    }
  });
});

apiRoutes.get('/userbid', (req, res) => {
  UserBid.find({}, (err, usersbid) => {
    try {
      res.json(usersbid);
    } catch (err) {
      throw err || res.statusCode;
    }
  });
});

//end of user bid actions

app.get('/', (req, res) => {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
