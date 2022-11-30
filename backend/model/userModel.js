import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    default: "",
  },
 
});

userSchema.plugin(paginate);
const User = mongoose.model("chatuser", userSchema);
export default User;
