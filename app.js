const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const adminRoute = require("./routes/adminroute");
const shopRoute = require("./routes/shoproute");

const sequelize = require("./db/connection");
const Product = require("./models/product");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/admin", adminRoute);
app.use(shopRoute);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is up and running in " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
