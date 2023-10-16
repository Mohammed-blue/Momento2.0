import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from 'react-query'
import { makeRequest } from "../../axios"

const Posts = () => {
    // Use the useQuery hook to fetch data
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("/posts").then((res) => {
            return res.data;
        })
    )

    // console.log(data);

    return (
        <div className="posts">
            {/* Render the Post component for each post in the array */}
            {

            error
            ? "Something went wrong!"
            : isLoading
            ? "Loading...":

            data.map((post) => (
                <Post post={post} key={post.id} />
                ))
            }
        </div>
    )
}

export default Posts