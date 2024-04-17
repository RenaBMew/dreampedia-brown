import User from "./models/user";
import dbConnect from "./connection";

export async function create(username, astrologicalsign, password) {
  if (!(username && password))
    throw new Error("Must include username and password");

  await dbConnect();

  const user = await User.create({ username, password, astrologicalsign });

  if (!user) throw new Error("Error inserting User");

  return user.toJSON();
}
