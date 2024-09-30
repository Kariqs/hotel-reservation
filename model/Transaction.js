import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  transactionType: String,
  transactionID: String,
  transTime: Date,
  businessShortCode: String,
  billRefNumber: String,
  invoiceNumber: String,
  orgAccountBalance: String,
  thirdPartyTransID: String,
  transactionAmount: Number,
  phoneNumber: String,
  status: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
