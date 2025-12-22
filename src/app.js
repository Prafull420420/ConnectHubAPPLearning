
const express= require("express");
const mongoose= require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

//const { use } = require("react");
const User= require("./models/user");
const userRoutes = require("./routes/userRoutes");

const PORT=3000;
//const express= require("express");

const app = express();
app.use(express.json());
app.use(cookieParser());

//app.use("/", userRoutes);
app. use("/", authRouter);

// ⭐ Simple home route
app.get("/", (req, res) => {
    res.send("Welcome to DevTinder Backend!");
});
app.get('/example', 
  (req, res, next) => {
    res.send('First handler executed');
    console.log('First handler executed');
     
    next('route');
  },
  (req, res) => {
    res.send('This will run');
  }
);
app.get('/skip', (req, res) => {
  res.send('Skipped to this handler!');
});
// MongoDB connection string
const databaseUrl =
  "mongodb+srv://Prafull_pand79_mongo:8Learning8%401993@nodejslearning.f1fythq.mongodb.net/?appName=NodeJSLearning";
 
  mongoose.connect(databaseUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  const user = new User({
  name: 'Akshad Jaiswal',
  email: 'akshad@example.com',
  password: 'securepassword',
  age: 22
});
    user.save()
      .then(doc => console.log('User saved:', doc))
      .catch(err => console.error('Save error:', err));
//app.get('/success', (req, res) => res.status(200).send('Success!'));
app.get('/success',(req,res)=>res.status(200).json({message:"This is a JSON response"}));
app.get('/created', (req, res) => res.status(201).send('Resource created'));
app.get('/no-content', (req, res) => res.status(204).send());
app.get('/bad-request', (req, res) => res.status(400).send('Bad request'));
app.get('/unauthorized', (req, res) => res.status(401).send('Unauthorized'));
app.get('/not-found', (req, res) => res.status(404).send('Resource not found'));
app.get('/server-error', (req, res) => res.status(500).send('Internal server error'));

app.listen(3000,()=>
{

    console.log("Server Prafull is listening");
}


);
//module.exports= app;

