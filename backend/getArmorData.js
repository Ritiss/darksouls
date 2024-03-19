const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        title: String,
        type: String,
        phys_defense: Number,
        magic_defense: Number,
        fire_defense: Number,
        lightning_defense: Number,
        bleed_resistance: Number,
        poison_resistance: Number,
        curse_resistance: Number,
        weight: Number,
        description: String,
        image: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("armors", DataSchema);
