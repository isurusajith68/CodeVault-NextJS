import Image from "next/image"
import logo from "../assets/stacklogo.png"
import Loading from "../components/Loading"
import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from 'react'
import axios from "axios"
const PostList = ({ data, fetchData, updatePost }) => {

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteOpenId, setDeleteOpenId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteClick = (id) => {
        setDeleteModalOpen(true);
        setDeleteOpenId(id)
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true)
        const response = await axios.delete(`/api/post/${deleteOpenId}`)
        if (response.status == 200) {
            setIsLoading(false);
            setDeleteOpenId("");
            fetchData()
        }
        setDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
    };


    const handleEditClick = (item) => {
        updatePost(item)
    }

    return (
        <div>
            <h1 className="font-semibold text-xl mb-8 text-center">CodeVault List</h1>
            {data ?
                data.map((item, index) => {
                    return (
                        <div key={index} className=" flex bg-slate-200 border rounded-xl mt-3 cursor-pointer transition-transform transform hover:scale-105 h-40">
                            <div className="flex flex-1 h-40 ">
                                <div className="p-2 flex  h-40 items-center justify-center object-none overflow-hidden">
                                    <Image src={item.image ? item.image : logo} alt="" width={150} height={200} className="object-fill" />
                                </div>
                                <div className="p-5">
                                    <h1 className="font-semibold text-lg">{item.title}</h1>
                                    <h1>{item.category}</h1>
                                    <h1>{item.value}</h1>
                                   
                                    <h1>{item.author}</h1>
                                </div>
                            </div>


                            <div className="flex flex-col gap-5 p-5 items-center justify-center">
                                <div>
                                    <Edit
                                        fontSize="small"
                                        onClick={() => handleEditClick(item)}
                                        className="text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <Delete
                                        fontSize="small"
                                        onClick={() => handleDeleteClick(item._id)}
                                        className="text-red-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>
                            </div>

                        </div>




                    )
                }) :
                <div className="flex items-center text-center mt-10 justify-center">
                    <Loading />
                </div>
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
    )
}
export default PostList