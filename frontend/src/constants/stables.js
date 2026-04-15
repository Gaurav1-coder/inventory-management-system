const UPLOAD_FOLDER_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://inventory-backend.onrender.com/uploads/"
  : "http://localhost:5000/uploads/";

const stables = { UPLOAD_FOLDER_BASE_URL };

export default stables;
