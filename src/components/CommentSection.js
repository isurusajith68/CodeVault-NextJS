import { useEffect, useState } from "react"
import ProfileImageGenerator from "./ProfileImage"
import { useSession } from "next-auth/react"
import axios from "axios";
import toast from "react-hot-toast";

const CommentSection = ({ commentsLength, postId }) => {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteOpenId, setDeleteOpenId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data: session } = useSession();

    const handelSubmit = async (e) => {
        
        e.preventDefault()

        if (!session) {
            toast.error("Please Login First")
            return
        }

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

        if (response.status === 200) {
            toast.success("Comment Added")
            loadComments(postId)
            setComment('')
        }


    }


    useEffect(() => {
        if (postId) {
            loadComments(postId);
            setComments(null)

        }
    }, [postId]);


    useEffect(() => {
        if (comments) {
            commentsLength(comments.length)
        }
    }, [comments])

    const loadComments = async (postId) => {
        try {
            const response = await axios.get(`/api/post/${postId}/comments`);

            setComments(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentId) => {
        setDeleteModalOpen(true);
        setDeleteOpenId(commentId)
    }

    const handleConfirmDelete = async () => {
        setIsLoading(true)
        const response = await axios.delete(`/api/post/${deleteOpenId}/comments`)
        if (response.status == 200) {
            toast.success("Comment Deleted")
            setIsLoading(false);
            setDeleteOpenId("");
            loadComments(postId)
        }
        setDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
    };



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
                    comments?.length > 0 ? comments.map((comment, index) => {
                        return (
                            <div key={index} className=" bg-white flex p-2  mt-2 gap-2">
                                <div className="flex w-[20%] justify-center items-center ">
                                    <ProfileImageGenerator />
                                </div>
                                <div className="flex justify-between flex-auto w-[80%]">
                                    <div>
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
                                    <div className="flex items-center justify-center ">
                                        {
                                            // this is wrong way don't do this in production (use id instead of name)
                                            comment.author === session?.user.name ? <span className="bg-red-600 py-1 px-2 rounded-lg text-white cursor-pointer" onClick={() => deleteComment(comment._id
                                            )}>
                                                Delete
                                            </span> : ""
                                        }
                                    </div>
                                </div>

                            </div>
                        )

                    }) : "no comments"
                }
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="absolute bg-gray-800 opacity-75 inset-0"></div>
                        {
                            isLoading ?
                                <div className="h-full w-full flex items-center justify-center">
                                    <div
                                        data-te-loading-management-init
                                        data-te-parent-selector="#loading-basic-example">
                                        <div
                                            data-te-loading-icon-ref
                                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status"></div>

                                    </div>
                                </div> : <div className="relative bg-white p-6 rounded-lg">
                                    <p className="text-gray-700 mb-4">Are you sure you want to delete?</p>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancelDelete}
                                            className="flex-1 text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirmDelete}
                                            className="flex-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                                        >
                                            Confirm Delete
                                        </button>
                                    </div>
                                </div>
                        }

                    </div>
                )}
            </div>

        </div>

    )
}
export default CommentSection