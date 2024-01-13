import { User } from "../../model/user/userModel.js";

// Edit user by ID

const editUserById = async (request, response) => {
  const id = request.params.id;
  try {
    if (!request.body.name || !request.body.password || !request.body.email) {
      return response
        .status(400)
        .send("Send all required fields: Name, Password, email");
    }

    // Extract the user ID from the JWT payload
    const loggedInUserId = request.user.id;

    // Check if the logged-in user is authorized to edit this user
    if (id !== loggedInUserId) {
      return response.status(403).json({
        message: "Forbidden: You are not authorized to edit this user",
      });
    }

    const newUser = {
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
    };
    const user = await User.findByIdAndUpdate(id, newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

export default editUserById;
