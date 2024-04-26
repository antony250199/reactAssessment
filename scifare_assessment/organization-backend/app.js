const express = require("express");
const mongoose = require("mongoose");
const passport = require("./middleware/passport");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://antonyraj25:v5gYAR0VVnzndOut@cluster0.kzadmmw.mongodb.net/?retryWrites=true&w=majority&appName=Assessment@",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// Define routes
app.get("/welcome_page", (req, res) => {
  res.json({ message: "Welcome to sample project services." });
});
require("./routes/userRoutes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
