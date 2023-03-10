import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "../Redux/reduxStore";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
const Friend = ({
  friendId,
  name,
  postID,
  deleteList,
  subtitle,
  userPicturePath,
  msgIcon,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  // const isFriend =[]
  const isFriend = friends.find((friend) => friend._id === friendId);
  const getPosts = async () => {
    const response = await fetch(
      "https://sociogram-backendd.onrender.com/post",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  const DeletePost = () => {
    axios
      .delete(
        `https://sociogram-backendd.onrender.com/post/deletepost/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getPosts();
      });
  };
  const patchFriend = async () => {
    const response = await fetch(
      `https://sociogram-backendd.onrender.com/user/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween>
        {msgIcon && (
          <Link to={`/message/${friendId}`}>
            <IconButton
              sx={{ backgroundColor: primaryLight, p: "0.6rem", mr: "0.3rem" }}
            >
              <MessageIcon sx={{ color: primaryDark }} />
            </IconButton>
          </Link>
        )}
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>

        {deleteList && (
          <IconButton
            onClick={DeletePost}
            sx={{ backgroundColor: primaryLight, p: "0.6rem", ml: "0.3rem" }}
          >
            <DeleteIcon sx={{ color: primaryDark }} />
          </IconButton>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
