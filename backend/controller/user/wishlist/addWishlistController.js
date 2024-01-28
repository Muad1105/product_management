import { User } from "../../../model/user/userModel.js";
import { Wishlist } from "../../../model/user/wishListModel.js";

export const addWishlistItem = async (req, res, next) => {
  try {
    console.log("wishlist");
    const { productId, userId } = req.body;
    console.log("req.body", req.body);

    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("user", user.wishlist);
    const productExists = user.wishlist.some((item) => {
      console.log("item", item, productId);
      return item === productId;
    });
    console.log("product exists", productExists);

    if (productExists) {
      return res
        .status(409)
        .json({ message: "Item already present in wishlist." });
    }

    console.log("product exist false");
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { wishlist: productId },
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log("Wishlist Item Added");

    console.log("wishlist item added");
    return res
      .status(201)
      .json({ message: "Wishlist item added successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
