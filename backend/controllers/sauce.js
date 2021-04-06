const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.addSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    sauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée."}))
        .catch(error => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                return res.status(400).json({error});
            });
        });
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauce supprimée."}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce modifiée."}))
        .catch(error => res.status(400).json({error}));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const userHasLiked = sauce.usersLiked.includes(req.body.userId);
            const userHasDisliked = sauce.usersDisliked.includes(req.body.userId);
            if (req.body.like !== 0) {
                if (userHasLiked || userHasDisliked) {
                    return res.status(401).json({message: "L'utilisateur a déjà liké/disliké cette sauce."});
                } else if (req.body.like == 1) {
                    sauce.likes++;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(200).json({message: "L'utilisateur a liké la sauce."}))
                        .catch(error => res.status(400).json({error}));
                } else if (req.body.like == -1) {
                    sauce.dislikes++;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(200).json({message: "L'utilisateur a disliké la sauce."}))
                        .catch(error => res.status(400).json({error}));
                }     
            } else {
                if (!userHasLiked && !userHasDisliked) {
                    return res.status(400).json({message: "L'utilisateur n'a pas encore donné son avis sur la sauce."})
                } else if (userHasLiked) {
                    sauce.likes--;
                    let userIdIndex = sauce.usersLiked.indexOf(req.body.userId);
                    sauce.usersLiked.splice(userIdIndex, 1);
                    sauce.save()
                        .then(() => res.status(200).json({message: "L'utilisateur a retiré son like pour cette sauce."}))
                        .catch(error => res.status(400).json({error}));
                } else if (userHasDisliked) {
                    sauce.dislikes--;
                    let userIdIndex = sauce.usersDisliked.indexOf(req.body.userId);
                    sauce.usersDisliked.splice(userIdIndex, 1);
                    sauce.save()
                        .then(() => res.status(200).json({message: "L'utilisateur a retiré son dislike pour cette sauce."}))
                        .catch(error => res.status(400).json({error}));
                }
            }
        })
        .catch(error => res.status(500).json({error}));
};