import { updateUser } from "../redux/apiCalls";
import axios from "axios";
import { load } from "../redux/actions";

export const updateUserWithCloudinary = async (dispatch, file, inputs, id) => {
  const handleDrop = () => {
    load(dispatch);
    let url = "";

    // Push all the axios request promise into a single array
    const uploaders = () => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `images`);
      formData.append("upload_preset", "zmjspg8x"); // Replace the preset name with your own
      formData.append("api_key", "548426853523768"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", String(Date.now() / 1000) || "0");

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post("https://api.cloudinary.com/v1_1/dzb9j4cx4/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;

          const fileURL = data?.secure_url;
          url = fileURL;

          // You should store this URL for future references in your app
          console.log(fileURL);
        });
    };

    // Once all the files are uploaded
    return uploaders().then(() => {
      const user = { ...inputs, img: url };
      // const redirect = (window.location = "/profile");
      const res = updateUser(id, user, dispatch);
      return res;
    });
    // ... perform after upload is successful operation
  };
  if (file) {
    return handleDrop();
  } else {
    const user = { ...inputs };

    const res = updateUser(id, user, dispatch);
    return res;
  }
};
