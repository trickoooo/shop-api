const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const adminRoute = require('./routes/adminroute');
const shopRoute = require('./routes/shoproute');

const sequelize = require('./db/connection');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);

//Associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync()
  .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if(!user) {
      return User.create({
        firstName: "Patrick",
        lastName: "Castro",
        email: "patricp.castro@gmail.com"
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user);
    app.listen(port, () => {
      console.log('Server is up and running in ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
