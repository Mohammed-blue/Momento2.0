import "./share.scss";
import Image from "../../assets/img.png"
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
    useMutation,
    useQueryClient,
} from 'react-query'
import { makeRequest } from "../../axios";

const Share = () => {
    // Initialize state variables to manage the post content (description and file).
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    // Define a function to upload an image.
    const upload = async () => {
        try {
            //  Create a FormData object to prepare the file for upload.
            const formData = new FormData();

            formData.append("file", file); //  Append the selected file to the FormData.

            // Make a POST request to the "/upload" endpoint using the Axios instance (makeRequest)
            const res = await makeRequest.post("/upload", formData);

            // Return the image URL received from the server response.
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    // Access the currentUser object from the AuthContext
    const { currentUser } = useContext(AuthContext);

    // Access the client:
    // Access the queryClient for handling data fetching with React Query.
    const queryClient = useQueryClient()

    // Mutations:
    // Define a mutation using useMutation for creating a new post.
    const mutation = useMutation((newPost) => {
        // Make a POST request to the "/posts" endpoint to create a new post.
        return makeRequest.post("/posts", newPost)
    }, {
        // Define an onSuccess callback to handle successful post creation.
        onSuccess: () => {
            // Invalidate and refetch the "posts" query to update the post list.
            queryClient.invalidateQueries(["posts"])
            },
    })

    // Define a function to handle the "Share" button click event.
    const handleClick = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.

        let imgUrl = "";
        if (file) imgUrl = await upload(); // If a file is selected, upload it and get the image URL.

        // Trigger the mutation to create a new post with the post description and image URL (if available)
        mutation.mutate({ desc, img: imgUrl });
        setDesc(""); // Clear the description input field.
        setFile(null); // Clear the file input field.
    }



    return (
        <div className="share">
            <div className="container">
                {/* Top section for creating a post */}
                <div className="top">
                    <div className="left">
                        {/* Display the user's profile picture */}
                        <img src={currentUser.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            />
                    </div>
                    <div className="right">
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
                    </div>
                </div>
                <hr />

                {/* Bottom section with options to add content to the post */}
                <div className="bottom">
                     {/* Left side with options like adding an image, place, and tagging friends */}
                    <div className="left">
                        {/* Input field for uploading an image */}
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none"}}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                            {/* Label to trigger file input when clicked (for adding images) */}
                        <label htmlFor="file">
                            {/* "Add Image" option with an image icon and text */}
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        {/* "Add Place" option with a map icon and text */}
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        {/* "Tag Friends" option with a friend icon and text */}
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    {/* Right side with a "Share" button to submit the post */}
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share