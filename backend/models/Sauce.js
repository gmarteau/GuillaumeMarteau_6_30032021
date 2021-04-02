const mongoose = require("mongoose");

const noCodeSpecificCharacters = (input) => {
    return /^[^=<>$]*$/.test(input);
};

const invalidInput = new Error("Le champ contient des caractères non autorisés.");

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, validate: [noCodeSpecificCharacters, invalidInput]},
    manufacturer: {type: String, required: true, validate: [noCodeSpecificCharacters, invalidInput]},
    description: {type: String, required: true, validate: [noCodeSpecificCharacters, invalidInput]},
    mainPepper: {type: String, required: true, validate: [noCodeSpecificCharacters, invalidInput]},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true, min: 1, max: 10},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

module.exports = mongoose.model("Sauce", sauceSchema);