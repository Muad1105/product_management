import { Wishlist } from "../../../model/user/wishlistModel.js";

export const deleteWishlistItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Wishlist.findByIdAndDelete(id);
    return res.status(204).json({ message: "Wishlist Deleted Successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
