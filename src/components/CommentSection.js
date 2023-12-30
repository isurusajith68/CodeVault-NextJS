import { use, useEffect, useState } from "react"
import ProfileImageGenerator from "./ProfileImage"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "date-fns/esm/fp";
const CommentSection = () => {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const { data: session } = useSession();

    const postId = useParams().id


    const handelSubmit = async (e) => {
        e.preventDefault()

        if (comment.length === 0) {
            toast.error("Comment can not be empty")
            return
        }

        const data = {
            comment: comment,
            postId: postId,
            author: session.user.name
        }

        const response = await axios.post('/api/post/comment', data)

        console.log(response)
        if (response.status === 200) {
            toast.success("Comment Added")
            loadComments()
            setComment('')
        }


    }

    useEffect(() => {
        loadComments()
    }, [postId])


    const loadComments = () => {
        fetch(`/api/post/${postId}/comments`)
            .then(res => res.json()).then(data => {
                setComments(data)
            }).catch(error => {
                toast.error("Error")
            })
    }
    console.log(comments)

    return (
        <div className="mt-2">
            <div className="bg-white p-2 shadow-lg">
                <h1 className="text-slate-500 font-semibold mt-1 mb-1 ">Comments</h1>
                <form className="" onSubmit={handelSubmit}>
                    <div>
                        <textarea rows={5} name="comment" value={comment} className="p-5 w-full  bg-slate-100" onChange={(e) => setComment(e.target.value)} placeholder="Add comment"></textarea>
                    </div>
                    <div className="flex justify-center items-center mt-2 ">
                        <button className="px-2 py-1  bg-red-500 rounded-lg w-full text-white" type="submit">Add Comment</button>
                    </div>
                </form>
                {
                    comments.map((comment, index) => {
                        return (
                            <div key={index} className=" bg-white flex p-2  mt-2 gap-2">
                                <div className="flex w-[20%] justify-center items-center ">
                                    <ProfileImageGenerator />
                                </div>
                                <div className="flex-auto w-[80%]">
                                    <div className="text-slate-500 font-semibold mt-1">
                                        {comment.author}
                                    </div>
                                    <div className="text-slate-500 italic font-semibold mt-1 text-sm">
                                        {comment.createdAt}
                                    </div>
                                    <div className="text-slate-500 text-justify text-sm mt-1">

                                        {comment.comment}
                                    </div>
                                </div>

                            </div>
                        )

                    })
                }

            </div>

        </div>

    )
}
export default CommentSection