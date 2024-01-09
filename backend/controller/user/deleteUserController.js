import { User } from "../../model/userModel.js";

// Delete User By ID

const deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;

    const existingUser = await User.findOne({ _id: id });

    console.log(existingUser);

    const result = await User.findByIdAndDelete(id);
    if (result)
      return response.status(200).send({ message: "User Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export default deleteUserById;
