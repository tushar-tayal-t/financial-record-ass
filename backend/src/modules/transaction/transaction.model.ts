import mongoose, {Schema, Document, Types} from "mongoose";

export interface TransactionInterface extends Document {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  note: string;
  createdBy: Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<TransactionInterface> = new Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true
  }
}, {timestamps: true});

export const Transaction = mongoose.model<TransactionInterface>("transaction", userSchema);