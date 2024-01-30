import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://WebDeveloper:webdev@maincluster.cq4nipw.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "otp",
    }
  )
  .then(() => {
    console.log("DB Connected");
  });

const schema = mongoose.Schema({
  otp: Number,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5s" },
  },
});

const model = mongoose.model("model", schema, "otp");

const app = express();

app.get("/", async (req, res) => {
  await model.create({ otp: 123 });
  res.end();
});

app.listen(500);
