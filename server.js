const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/billingDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const billSchema = new mongoose.Schema({
    customerName: String,
    items: Array,
    subtotal: Number,
    tax: Number,
    grandTotal: Number,
    date: { type: Date, default: Date.now }
});

const Bill = mongoose.model("Bill", billSchema);

app.post("/save-bill", async (req, res) => {
    const bill = new Bill(req.body);
    await bill.save();
    res.json({ message: "Bill saved successfully" });
});

app.get("/bills", async (req, res) => {
    const bills = await Bill.find().sort({ date: -1 });
    res.json(bills);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});