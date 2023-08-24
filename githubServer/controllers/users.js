import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({email: email});
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllLiked = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({email: email});
    const likes = user.likes;
    res.status(200).json(likes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveLike = async (req, res) => {
  try {
    const { email, recipeName } = req.params;
    const user = await User.findOne({email: email});

    let flag;

    if (user.likes.includes(recipeName)) {
      user.likes = user.likes.filter((name) => name !== recipeName);
      flag = false;
    } else {
      user.likes.push(recipeName);
      flag = true;
    }
    await user.save();

    res.status(200).json(flag);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
