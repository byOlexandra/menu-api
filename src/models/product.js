import { Schema, model } from 'mongoose';

export const productSchema = new Schema(
  {
    name: {
      ua: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true },
    },
    description: {
      ua: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['coffee', 'tea', 'seasonal', 'bakery', 'desserts'],
    },
    volume: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    options: {
      milkAlternatives: { type: Boolean, default: false },
      decaf: { type: Boolean, default: false },
    },

    allergens: {
      type: [String],
      enum: ['gluten', 'dairy', 'nuts', 'eggs'],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model("Product", productSchema, "menu");