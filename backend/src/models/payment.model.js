import mongoose, { Schema } from "mongoose";


const payemntSchema = new Schema(
  {
    bankAccount: {
      type: String,
      required: true,
      trim: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);


export const Payments = mongoose.model("Payment", payemntSchema);
