const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        title: String,
        type: String,
        phys_damage: Number,
        magic_damage: Number,
        fire_damage: Number,
        lightning_damage: Number,
        weight: Number,
        description: String,
        image: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("weapons", DataSchema);