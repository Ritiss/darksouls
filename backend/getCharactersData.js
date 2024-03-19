const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        name: String,
        type: String,
        health: Number,
        souls: Number,
        game: String,
        image: String,
        description: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("characters", DataSchema);
