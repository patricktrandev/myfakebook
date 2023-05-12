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

export const reactPostAction = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/reactPost`,
      {
        postId,
        react,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const getReactsAction = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const commentAction = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/comment`,
      {
        postId,
        comment,
        image,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
