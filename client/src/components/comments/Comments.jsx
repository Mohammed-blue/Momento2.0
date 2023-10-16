import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext"
import "./comments.scss";
import {
    useQuery,
    useMutation,
    useQueryClient
    } from 'react-query'
import { makeRequest } from "../../axios"
import moment from "moment";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");

    // Access the current user's data using the AuthContext
    const { currentUser } = useContext(AuthContext);

     // Use the useQuery hook to fetch data
        const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    )

    console.log(data);

    const queryClient = useQueryClient()

    const mutation = useMutation((newComment) => {
        return makeRequest.post("/comments", newComment)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
            }
    })

    const handleClick = async (e) => {
        e.preventDefault();

        mutation.mutate({ desc, postId });
        setDesc("");
    }

    return (
        <div className="comments">
            {/* Comments Input */}
            <div className="write">
                {/* Display the current user's profile picture */}
                <img src={currentUser.profilePic} alt="" />
                {/* Input field for writing a comment */}
                <input type="text" placeholder="Write a comment"
                onChange={(e) => setDesc(e.target.value)} value={desc}/>
                {/* Button to submit the comment (not functional in this example) */}
                <button onClick={handleClick}>Send</button>
            </div>
            {/* Render comments */}
            {
                error
                ? "Something went wrong!"
                : isLoading
                ? "Loading...":
                data.map((comment) => (
                    <div className="comment" key={comment.id}>
                        {/* Display the profile picture of the comment author */}
                        <img src={comment.profilePic} alt="" />
                        <div className="info">
                            {/* Display the name of the comment author */}
                            <span>{comment.name}</span>
                            {/* Display the comment content */}
                            <p>{comment.desc}</p>
                        </div>
                        {/* Display the timestamp of the comment */}
                        <span className="date">{moment(comment.createdAt).fromNow()}</span>
                    </div>
            ))}
        </div>
    )
}

export default Comments