import { User } from "../../../model/user/userModel.js";

export const addWishlistItem = async (req, res, next) => {
  const { productId, userId } = req.body;
  console.log("req.body", req.body);

  let user;
  try {
    user = await User.findById(userId);
    console.log("user");
    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }
    //check if the item already preesent
    console.log("user checked", user);
    const itemPresent = user.wishlist && user.wishlist.includes(productId);
    if (itemPresent) {
      return res.status(409).json({ message: "Conflict, item present." });
    }
    //Add the item to the user wishlist array
    user.wishlist.push(productId);

    console.log("wishlist added");

    await user.save();
    console.log("user saved");
    return res
      .status(201)
      .json({ message: "Wishlist Item Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
