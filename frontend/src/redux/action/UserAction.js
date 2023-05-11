import axios from "axios";

export const updateprofilePictureAction = async (url, token) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/updateProfilePicture",
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
