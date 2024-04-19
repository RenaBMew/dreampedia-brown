import User from "../../db/models/user";
import dbConnect from "../../db/connection";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session";

export default withIronSessionApiRoute(async function handler(req, res) {
  const user = req.session.user;
  // console.log("User:", user);
  if (!user) {
    return res.status(401).json({ message: "User not Found!" });
  }
  await dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { date, title, description, mood } = req.body;
        const dream = {
          date,
          title,
          description,
          mood,
        };
        const saveDream = await User.findByIdAndUpdate(
          user._id,
          { $push: { dreams: dream } },
          { new: true }
        );
        return res.status(200).json(saveDream);
      } catch (err) {
        console.err(err);
        return res.status(500).json({ message: "Server Error" });
      }

    case "GET":
      try {
        const getDreams = await User.findById(user._id);
        if (!getDreams) {
          return res.status(404).json({ message: "User not Found!" });
        }
        return res.status(200).json(getDreams.dreams);
      } catch (err) {
        return res.status(500).json({ message: "Server Error" });
      }

    case "DELETE":
      try {
        const { dreamId } = req.body;
        const delDream = await User.findByIdAndUpdate(
          user._id,
          { $pull: { dreams: { _id: dreamId } } },
          { new: true }
        );
        return res.status(200).json(delDream);
      } catch (err) {
        return res.status(500).json({ message: "Server Error" });
      }
    default:
      return res.status(404).end();
  }
}, sessionOptions);
