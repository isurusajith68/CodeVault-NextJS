"use client"
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner"
import axios from "axios"

const Dashboard = () => {

    const [totalPost, setTotalPost] = useState(null)
    const [totalUser, setTotalUser] = useState(null)
    const [totalDoc, setTotalDoc] = useState(null)
    const fetchTotalPost = async () => {
        const res = await axios.get("/api/post?lengthCheck=true")
        setTotalPost(res.data.data)
    }

    const fetchTotalUser = async () => {
        const res = await axios.get("/api/user?lengthCheck=true")
        setTotalUser(res.data.data)
    }

    const fetchTotalDoc = async () => {
        const res = await axios.get("/api/doc?lengthCheck=true")
        setTotalDoc(res.data.data)
    }

    useEffect(() => {
        fetchTotalPost()
        fetchTotalUser()
        fetchTotalDoc()
    }, [])

    return (
        <div className="w-full mt-3">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="lg:flex  gap-3 mt-3">
                <div className="flex flex-col w-full bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total User</h1>
                    <h1 className="text-white text-center mt-1 ">
                        {
                            !totalUser ? <TailSpin
                                visible={true}
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> : totalUser
                        }
                    </h1>

                </div>
                <div className="flex flex-col w-full max-lg:mt-2 bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total Post</h1>
                    <h1 className="text-white text-center mt-1 justify-center items-center flex">
                        {
                            !totalPost ? <TailSpin
                                visible={true}
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> : totalPost
                        }
                    </h1>

                </div>
                <div className="flex flex-col w-full max-lg:mt-2 bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total Doc</h1>
                    <h1 className="text-white text-center mt-1 ">{
                        !totalDoc ? <TailSpin
                            visible={true}
                            height="20"
                            width="20"
                            color="white"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : totalDoc

                    } </h1>
                </div>
            </div>

        </div>
    )
}
export default Dashboard