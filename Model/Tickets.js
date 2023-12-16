const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    GeneratedBy: {
      type: String,
    },
    GeneratedFor: {
      type: String,
    },
    State: {
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

const TicketModel = mongoose.model("Ticket", TicketSchema);
module.exports = TicketModel;
