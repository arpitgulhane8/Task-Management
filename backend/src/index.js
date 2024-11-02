require("dotenv").config();
const connectDB = require("./db/index");
const app = require("./app.js");

//connection with DB
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR:", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB CONNECTION FAIL !!", err);
  });


 
  