"use client"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from 'date-fns';
import ReactQuill from "react-quill"
import Loading from "@/components/Loading"
import Latest from "@/components/Latest"




const Post = () => {
  const [post, setPost] = useState(null)
  const [posts, setPosts] = useState(null)
  const [createdAt, setcreatedAt] = useState(null)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [clickLatest, setClickLatestPost] = useState(null)
  useEffect(() => {

    fetchPost()
    fetchAll()
  }, [])

  const fetchPost = async () => {
    try {
      setIsLoading(true)
      const post = await axios.get(`/api/post/${id}`)
      setPost(post.data.data)
      setcreatedAt(post.data.data.createdAt)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }

  const TimeAgo = ({ createdAt }) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return <span>{distance}</span>;
  };

  const clickLatestPost = (e) => {
    setClickLatestPost(e)

  }

  const fetchAll = async () => {
    try {

      const post = await axios.get("/api/post");
      if (post.status == 200) {
        setPosts(post.data.data)
        setIsLoading(false)

      }


    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="lg:flex mt-3">
      {
        clickLatest ? <div className="flex-initial lg:w-[75%]  px-5">
          <Image width={100} height={100} src={clickLatest?.image} className="lg:flex-initial w-full" />
          <div className="gap-5">
            <div className="w-full p-2 lg:flex-initial flex-col">
              <h1 className="font-bold text-2xl text-center ">{clickLatest?.title}</h1>
              <hr className="mt-2" />
              <div className="flex justify-around mt-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-700">
                  <svg className="w-3 h-3  me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <h1>{clickLatest?.author}</h1>
                </span>
                <h1 className="font-bold text-lg"> {clickLatest?.category} / {clickLatest?.value}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  border border-blue-400">
                  <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  <TimeAgo createdAt={createdAt} />
                </span>
              </div>
              <div className="p-5">
                <h1 className="font-semibold text-lg mt-5 text-gray-500">{clickLatest?.description}</h1>
              </div>
            </div>
          </div>
          <div className="p-5">
            <ReactQuill
              value={clickLatest?.content}
              readOnly={true}
              theme={"bubble"}
            />

          </div>
        </div> : isLoading ?
          <div className="flex lg:w-[75%]  px-5 items-center justify-center text-center">
            <Loading />
          </div>
          : <div className="flex-initial lg:w-[75%]  px-5">
            <div className="gap-5">
                <Image width={100} height={100} src={post?.image} className="lg:flex-initial w-full" />
              <div className="w-full p-2 lg:flex-initial flex-col">
                <h1 className="font-bold text-2xl text-center ">{post?.title}</h1>
                <hr className="mt-2" />
                <div className="flex justify-around mt-2">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-700">
                    <svg className="w-3 h-3  me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <h1>{post?.author}</h1>
                  </span>
                  <h1 className="font-bold text-lg"> {post?.category} / {post?.value}</h1>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  border border-blue-400">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    <TimeAgo createdAt={createdAt} />
                  </span>
                </div>
                <div className="p-5">
                  <h1 className="font-semibold text-lg mt-5 text-gray-500">{post?.description}</h1>
                </div>
              </div>
            </div>
            <div className="p-5">
              <ReactQuill
                value={post?.content}
                readOnly={true}
                theme={"bubble"}
              />

            </div>
          </div>
      }

      <div className="flex-initial lg:w-[25%]  w-full  justify-center flex top-0  ">
        <Latest data={posts} clickLatestPost={(e) => clickLatestPost(e)} />
      </div>
    </div>
  )
}
export default Post