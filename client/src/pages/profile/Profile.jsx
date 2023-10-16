import "./profile.scss";import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"

const Profile = () => {
    return (
        <div className="profile">
            {/* Images section */}
            <div className="images">
                {/* Cover photo */}
                <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="cover"/>
                {/* Profile picture */}
                <img src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt=""
                className="profilePic" />
            </div>
            <div className="profileContainer">
                {/* User info section */}
                <div className="uInfo">
                    <div className="left">
                        {/* Social media icons with links */}
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <InstagramIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <TwitterIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <PinterestIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="center">
                        <span>Jane Wick</span>
                        {/* User info */}
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>USA</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>Momento.dev</span>
                            </div>
                        </div>
                        <button>follow</button>
                    </div>
                    <div className="right">
                        {/* Email and more options */}
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                {/* Users Posts */}
                <Posts />
            </div>
        </div>
    )
}

export default Profile