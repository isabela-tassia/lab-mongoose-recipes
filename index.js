const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data, (err, recipesList) => {
      if (err !== null) return console.error(`Error on instertMany: ${err}`);

      recipesList.map((recipe) => console.log(recipe.title));

      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        (err) => {
          if (err !== null)
            return console.error(`Error on findOneAndUpdate: ${err}`);

          console.log(`Update successful!`);

          Recipe.deleteOne({ title: "Carrot Cake" }, (err) => {
            if (err !== null)
              return console.error(`Error on deleteOne: ${err}`);

            console.log(`Deletion successful!`);
          });
        }
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
