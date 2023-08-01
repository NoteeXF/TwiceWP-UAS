const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

	title: { type: String, required: true },
	file: { type: String, required: [true, "please provide a file"]},
	url: { type: String, required: true },
	type: {type: String, enum: ['free', 'premium'],default: 'free'}
});


module.exports = mongoose.model("image", imageSchema);
