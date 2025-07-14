import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },
});

const AdminModel =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default AdminModel;
