// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import TransactionModel from "./models/Transaction.js";
// import mongoose from "mongoose";

// dotenv.config();

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/api/test", (req, res) => {
//   res.json({ message: "test ok2" });
// });

// app.post("/api/transaction", async (req, res) => {
//   await mongoose.connect(process.env.MONGO_URL);
//   const { name, description, datetime, price } = req.body;
//   const transaction = await TransactionModel.create({
//     name,
//     description,
//     datetime,
//     price,
//   });

//   res.json(transaction);
// });

// app.get("/api/transactions", async (req, res) => {
//   await mongoose.connect(process.env.MONGO_URL);
//   const transactions = await TransactionModel.find();
//   res.json(transactions);
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });










import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import TransactionModel from "./models/Transaction.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 5000;

// Connect to MongoDB once when the server starts
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "test ok2" });
});

app.post("/api/transaction", async (req, res) => {
  try {
    const { name, description, datetime, price } = req.body;
    console.log('Received data:', { name, description, datetime, price });

    // Validate data
    if (!name || !description || !datetime || isNaN(price)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Create a new transaction
    const transaction = await TransactionModel.create({
      name,
      description,
      datetime: new Date(datetime),
      price: parseFloat(price),
    });

    res.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete("/api/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TransactionModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
