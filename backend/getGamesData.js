const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        title: String,
        release_date: String,
        description: String,
        img: String,
        video: String,
        audio: String,
        info: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("games", DataSchema);