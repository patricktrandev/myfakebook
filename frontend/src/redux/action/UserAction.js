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
export const updateCoverPictureAction = async (url, token) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/updateCover",
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

export const addFriendAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/addFriend/${id}`,
      {},

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
export const cancelRequestAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/cancelRequest/${id}`,
      {},

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
export const followAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const unfollowAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/unfollow/${id}`,
      {},

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
export const acceptRequestAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/acceptRequest/${id}`,
      {},

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
export const unfriendAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/unfriend/${id}`,
      {},

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
export const deleteRequestAction = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/deleteRequest/${id}`,
      {},

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
