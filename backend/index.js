const express = require("express");
const mongoose = require("mongoose");
const dotenv =require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

// avoid url to become undefined
dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));


app.use(Express.static(__dirname+'/public'));

// connect routes
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

// connect to Heroku
app.use(express.static(path.join(__dirname, "/frontend")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/public', 'index.html'));
});

// using library nodemon
app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running")
});
