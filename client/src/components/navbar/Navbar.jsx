import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Access darkMode and toggle function from the DarkModeContext
    const { toggle, darkMode } = useContext(DarkModeContext);

    // Access currentUser information from the AuthContext
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                 {/* Create a link to the home page */}
                <Link to="/" style={{ textDecoration:"none" }}>
                    <span>MomentoMedia</span>
                </Link>
                <HomeOutlinedIcon />
                {/* Toggle between dark mode and light mode */}
                {
                    darkMode ? (
                        <WbSunnyOutlinedIcon onClick={toggle} />
                    ) : (
                        <DarkModeOutlinedIcon onClick={toggle} />
                    )
                }
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar