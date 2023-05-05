import axios from "axios";
export const createPostAction = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/createPost",
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error?.response?.data.message;
  }
};

export const uploadImagesAction = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/uploadImages",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error?.response?.data.message;
  }
};
