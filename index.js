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
});

const model = mongoose.model("model", schema, "otp");

const app = express();

app.get("/", async (req, res) => {
  let otp = await model.create({ otp: 123 });
  let otpId = otp.id;
  console.log(otpId);
  setTimeout(() => {
    async function deleteOtp() {
      await model.findByIdAndDelete(otpId);
    }
    deleteOtp();

    res.json({
      msg: "otp deleted",
    });
  }, 15000);

  res.end();
});

app.listen(500);
