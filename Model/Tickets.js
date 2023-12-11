const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    GeneratedBy: {
      type: String,
    },
    GeneratedFor: {
      type: String,
    },
    title: {
      type: String,
    },
    Description: {
      type: String,
    },
    Status: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
