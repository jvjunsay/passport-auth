const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
var session = require('express-session');

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(session({secret: "Shh, its a secret!"}));

mongoose.connect(
  'mongodb+srv://jv:jvpogi@testdb-ayccz.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

// const createSchema = async () => {
//   const schema = new Schema(
//     {
//       name: String
//     },
//     {
//       capped: { size: 1024 },
//       bufferCommands: false,
//       autoCreate: false // disable `autoCreate` since `bufferCommands` is false
//     }
//   );

//   const Model = mongoose.model('Test', schema);
//   // Explicitly create the collection before using it
//   // so the collection is capped.
//   await Model.createCollection();
// };

// createSchema();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening to: ${PORT}`);
});
