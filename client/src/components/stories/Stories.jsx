import "./stories.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
    // Retrieve the current user's data from the AuthContext.
    const { currentUser } = useContext(AuthContext);

    // Temporary stories data for demonstration:
    const stories = [
        {
            id: 1,
            name: "John Wick",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        },
        {
        id: 2,
        name: "John Wick",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
        id: 3,
        name: "John wick",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
        id: 4,
        name: "John wick",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    ]

    return (
        <div className="stories">
            {/* Render the user's own story at the top */}
            <div className="story">
                {/* Display the current user's profile picture */}
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                {/* Add a button to create a new story */}
                <button>+</button>
            </div>
            {/* Map through the array of stories to display them */}
            {stories.map((story) => (
                <div className="story" key={story.id}>
                   {/* Display the story's image */}
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>

    )
}

export default Stories