import React, { useState, useEffect } from "react";
import LogoWBg from "../../assets/media/twitter-original-logo.svg";
import HomeFilledImg from "../../assets/media/homeFilled.svg";
import SearchImg from "../../assets/media/search.svg";
import NotificatonImg from "../../assets/media/notification.svg";
import MessagesImg from "../../assets/media/messages.svg";
import BookMarksImg from "../../assets/media/bookmarks.svg";
import ListsImg from "../../assets/media/lists.svg";
import VerifiedImg from "../../assets/media/verified.svg";
import ProfileImg from "../../assets/media/profile.svg";
import MoreImg from "../../assets/media/more.svg";
import Badge from "../../assets/media/badge.svg";
import close from "../../assets/media/close.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  fetchData,
  fetchUsers,
  fetchFollowingUsers,
  handleFollow,
  userToken,
} from "../../api.js/services";

import axios from "axios";
const Home = (prop, navigation) => {
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleLogout = () => {
    sessionStorage.setItem("userToken", "");
    window.location.reload();
    navigate("/");
  };

  const handlePostSubmit = (e) => {
    const formData = new FormData();
    formData.append("postImage", selectedImage);
    formData.append("postQuestion", postText);
    formData.append("postPrivacy", "public");
    const config = {
      method: "post",
      url: `${API_BASE_URL}/auth/post`,
      headers: {
        Authorization: userToken,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setShow(false);
        Swal.fire({
          title: "Tweet Published",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle the error here
      });
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setUserPosts(data);
      })
      .catch((error) => {
        console.log("Error fetching user posts:", error);
      });

    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });

    fetchFollowingUsers()
      .then((data) => {
        setFollowingUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching following users:", error);
      });
  }, []);

  return (
    <div className="mt-container">
      {/* sidemenu starting */}
      <div className="mt-sidemenu">
        <img src={LogoWBg} alt="Mini-Twitter" id="mt-mini-twitter-logo" />
        <div className="mt-sidemenu-items">
          <div className="mt-sidemenu-item mt-1">
            <img src={HomeFilledImg} alt="home" />
            <p>Home</p>
          </div>
          <div className="mt-sidemenu-item mt-3">
            <img src={SearchImg} alt="home" />
            <p>Explore</p>
          </div>
          <div className="mt-sidemenu-item mt-4">
            <img src={NotificatonImg} alt="home" />
            <p>Notification</p>
          </div>
          <div className="mt-sidemenu-item mt-5">
            <img src={MessagesImg} alt="home" />
            <p>Messages</p>
          </div>
          <div className="mt-sidemenu-item mt-6">
            <img src={ListsImg} alt="home" />
            <p>Lists</p>
          </div>
          <div className="mt-sidemenu-item mt-7">
            <img src={BookMarksImg} alt="home" />
            <p>Bookmarks</p>
          </div>
          <div className="mt-sidemenu-item mt-8">
            <img src={VerifiedImg} alt="home" />
            <p>Verified</p>
          </div>
          <div className="mt-sidemenu-item mt-9">
            <img src={ProfileImg} alt="home" />
            <p>Profile</p>
          </div>
          <div className="mt-sidemenu-item mt-10">
            <img src={MoreImg} alt="home" />
            <p>More</p>
          </div>
          <div className="mt-sidemenu-item mt-11" onClick={handleShow}>
            <p>Tweet</p>
          </div>
          <div className="mt-sidemenu-item mt-12">
            <img src={ProfileImg} alt="home" />
            <div className="mt-userdetails">
              <p>Settings</p>

              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>
      </div>
      {/* sidemenu ended */}
      <div className="mt-userposts">
        <div className="mt-main-header">
          <div className="mt-heading">
            <h2>Home</h2>
          </div>
          <div className="mt-header">
            <h2>For you</h2>
            <h2>Following</h2>
          </div>
        </div>
        {/* //user posts */}
        <div className="mt-ugc">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div className="mt-user-post" key={post._id}>
                <div className="mt-user-personal-details">
                  <div className="mt-user-personal-image">
                    <img src={post.userProfile} alt={post.fullName} />
                  </div>
                  <div className="mt-user-username">
                    <p>{post.fullName}</p>
                    <p>
                      <img src={Badge} alt={post.fullName} />
                    </p>
                    <p>@{post.username}</p>
                    <p></p>
                  </div>
                </div>
                <div className="mt-user-post-details">
                  <p>{post.postQuestion}</p>
                  {post.postImage !== null && (
                    <img src={post.postImage} alt="post" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p id="mt-no-post">No Posts Found</p>
          )}
        </div>
      </div>

      {/* right menu started */}

      <div className="mt-rightmenu">
        <div className="mt-users">
          <h1>Who to follow</h1>
          {users && users.length > 0 ? (
            users.map((user) => (
              <div className="mt-peroples">
                <div className="mt-peoples-profile">
                  <img src={user.userProfile} alt={user.username} />
                </div>
                <div className="mt-peoples-details">
                  <div className="mt-username-badge">
                    <p>{user.fullName}</p>
                    <img src={Badge} alt="" />
                  </div>
                  <p>@{user.username}</p>
                </div>
                <div className="mt-peoples-profile">
                  <button
                    id={user.isFollowing}
                    onClick={(e) => handleFollow(e, user.receiverId)}
                  >
                    {user.isFollowing}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p id="mt-no-post">No Users Found</p>
          )}
        </div>
        <div className="mt-users">
          <h1>Following</h1>
          {followingUsers && followingUsers.length > 0 ? (
            followingUsers.map((user) => (
              <div className="mt-peroples">
                <div className="mt-peoples-profile">
                  <img src={user.userProfile} alt={user.username} />
                </div>
                <div className="mt-peoples-details">
                  <div className="mt-username-badge">
                    <p>{user.fullName}</p>
                    <img src={Badge} alt="" />
                  </div>
                  <p>@{user.username}</p>
                </div>
                <div className="mt-peoples-profile">
                  <button
                    id={user.isFollowing}
                    className="mt-follow-button"
                    onClick={(e) => handleFollow(e, user.receiverId)}
                  >
                    Following
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p id="mt-no-post">No Users Found</p>
          )}
        </div>
      </div>

      {/* //create post */}
      <div className="mt-create-post">
        <Modal show={show} onHide={handleClose}>
          <Button variant="secondary" onClick={handleClose} id="close">
            <img src={close} alt="close" />
          </Button>

          <div className="mt-writte-up">
            <textarea
              type="text"
              placeholder="What is happening?"
              value={postText}
              onChange={handlePostTextChange}
            />
          </div>
          <div className="mt-writte-up">
            <div className="mt-post-icons">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <button onClick={handlePostSubmit}>Tweet</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Home;
