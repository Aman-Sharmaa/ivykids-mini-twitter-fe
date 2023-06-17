import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const token = sessionStorage.getItem("userToken");
export const userToken = token;

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/ivy/homefeed/posts`,
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/ivy/connection`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFollowingUsers = async () => {
  try {
    const responseFollowing = await axios.get(
      `${API_BASE_URL}/auth/yourzone/mynetwork`,
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return responseFollowing.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = (e, value) => {
  console.log(value);
  let data = JSON.stringify({
    receiverId: value,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/auth/isfollowing`,
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      fetchUsers();
      fetchFollowingUsers();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
