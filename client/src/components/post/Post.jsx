import "./post.scss";
// Import icons from Material-UI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from 'moment';

// Define the Post component which receives a 'post' object as a prop
const Post = ({ post }) => {
      // Define state for opening and closing comments
        const [commentOpen, setCommentOpen] = useState(false);

        // TEMPORARY: Define whether the post is liked
        const liked = false;

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        {/* Display the user's profile picture */}
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            {/* Create a link to the user's profile using React Router */}
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit"}}
                            >
                                {/* Display the user's name */}
                                <span className="name">{post.name}</span>
                            </Link>
                            {/* Display the post's timestamp */}
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {/* Display more options icon */}
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    {/* Display the post's text description */}
                    <p>{post.desc}</p>
                    {/* Display the post's image */}
                    <img src={"/upload/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {/* Display the like icon with the like count */}
                        {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon />}
                        12 Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        {/* Display the comment icon with the comment count */}
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className="item">
                        {/* Display the share icon */}
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {/* Display the comments section if 'commentOpen' is true */}
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    )
}

export default Post