"use client"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import Loading from "@/components/Loading"
import { useSession } from "next-auth/react";
import React from 'react';
import moment from "moment"
import CommentSection from "@/components/CommentSection"



const Post = () => {
  const [post, setPost] = useState(null)
  const [postIdPa, setPostId] = useState(null)
  const [featuredPost, setFeaturedPost] = useState(null)
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession();
  const [isClickFeaturedPost, setIsClickFeaturedPost] = useState(false)
  const [clickFeaturedPost, setClickFeaturedPost] = useState(null)


  const [commentsLength, setCommentsLength] = useState(0)
  const [clickedPostId, setClickedPostId] = useState(null)


  useEffect(() => {

    const fetchPostFeatured = async () => {
      try {
        const post = await axios.get("/api/post/featured")
        setFeaturedPost(post.data.data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchPostFeatured();
  }, [])


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        const post = await axios.get(`/api/post/${id}`)
        setPost(post.data.data)
        setPostId(post.data.data._id)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }

    }

    if (!post) {
      fetchPost();
    }

  }, [post])


  const clickLatestPost = (e) => {
    setIsClickFeaturedPost(true)
    setClickFeaturedPost(e)
    handleIncrementViews(e._id)
    //push post id to url
    window.history.pushState({}, "", `/post/${e._id}`)
    setClickedPostId(e._id)
    setPostId(e._id)
  }

  const handleIncrementViews = async (id) => {
    const response = await axios.post(`/api/post/incrementViews/${id}`);

  }



  return (
    <div className="mt-[80px]  xl:px-32 ">


      <div className="bg-slate-100 lg:flex ">
        <div className="flex-auto lg:w-[70%] lg:p-5 ">
          {
            isClickFeaturedPost ? <div className="w-full  bg-white p-5  drop-shadow-lg">
              <h1 className="text-2xl capitalize font-semibold text-slate-600">{clickFeaturedPost?.title}</h1>
              <div className="flex w-full justify-start gap-4 items-center h-5 text-gray-600 text-sm mt-2">
                <h1 className="text-gray-600 text-sm ">Post by
                  <span className="text-red-500 ml-2 italic">
                    {clickFeaturedPost?.author}
                  </span>
                </h1>
                <span className=" italic">
                  {moment(clickFeaturedPost?.createdAt).format("Do MMMM, YYYY")}
                </span>
                <span className=" italic">
                  comments
                  <span className="text-red-500  ml-1">
                    {commentsLength}
                  </span>
                </span>

                <span className=" italic">
                  views
                  <span className="text-red-500  ml-1">
                    {clickFeaturedPost?.views}
                  </span>



                </span>
              </div>
              <div className="mt-2 w-full">
                <Image height={100} width={100} className="w-full" loading="lazy" src={clickFeaturedPost?.image} alt="featured-image" />
              </div>
              <p className="mt-2 text-slate-500 text-base p-1">
                {clickFeaturedPost?.description}
              </p>


              <div className="p-5 mt-2 bg-black">
                {
                  clickFeaturedPost &&
                  <ReactQuill
                    value={clickFeaturedPost?.content}
                    readOnly={true}
                    className="text-white"
                    theme={"bubble"}

                  />
                }

              </div>
            </div>
              :
              <>
                {!isLoading ?
                  <div className="w-full  bg-white p-5  drop-shadow-lg">
                    <h1 className="text-2xl capitalize font-semibold text-slate-600">{post?.title}</h1>
                    <div className="flex w-full justify-start gap-4 items-center md:h-5 h-10 text-gray-600 text-sm mt-2">
                      <h1 className="text-gray-600 text-sm ">Post by
                        <span className="text-red-500 ml-2 italic">
                          {post?.author}
                        </span>
                      </h1>
                      <span className=" italic">
                        {moment(post?.createdAt).format("Do MMMM, YYYY")}
                      </span>
                      <span className=" italic">
                        comments
                        <span className="text-red-500  ml-1">
                          {commentsLength}
                        </span>
                      </span>

                      <span className=" italic">
                        views
                        <span className="text-red-500  ml-1">
                          {post?.views}
                        </span>



                      </span>
                    </div>

                    <div className="mt-2 w-full">
                      <Image height={100} width={100} className="w-full" loading="lazy" src={post?.image} alt="featured-image" />
                    </div>
                    <p className="mt-2 text-slate-500 text-base p-1">
                      {post?.description}
                    </p>


                    <div className="p-5 mt-2 bg-black">
                      {
                        post &&
                        <ReactQuill
                          value={post?.content}
                          readOnly={true}
                          className="text-white"
                          theme={"bubble"}

                        />
                      }

                    </div>
                  </div> : <Loading />
                }
              </>
          }
          <CommentSection commentsLength={setCommentsLength} postId={postIdPa} />
        </div>
        <div className="sticky  flex-auto  w-[30%] p-5 max-lg:hidden">
          <div className="bg-white text-center font-bold p-5 border-b mb-2 drop-shadow-lg">
            Featured Post
          </div>
          {
            featuredPost ? featuredPost.map((item, index) => {
              return (
                <div onClick={() => clickLatestPost(item)} key={index} className="bg-white cursor-pointer p-5 drop-shadow-lg mt-3">

                  <h1 className="text-gray-600 text-sm  mb-2 mt-2">
                    <span className="ml-2 text-sm">
                      {moment(item?.createdAt).format("Do MMMM, YYYY")}
                    </span>

                  </h1>
                  <h1 className="text-base capitalize text-center text-slate-900">{item?.title}</h1>
                  <div className="bg-white mt-2">
                    <Image height={100} width={100} className="w-full" loading="lazy" src={item?.image} alt="featured-image" />
                    <p className="mt-2 text-slate-500 text-base p-1 text-justify">
                      {item?.description}
                    </p>
                  </div>

                </div>

              )
            }) : <Loading />
          }



        </div>

      </div >

    </div >
  )
}
export default Post








//latest post section

{/* <div className="flex-initial lg:w-[25%]  w-full  justify-center flex top-0  ">
  <Latest data={posts} clickLatestPost={(e) => clickLatestPost(e)} />
</div> */}

{/* {
        clickLatest ? <div className="flex justify-center items-center lg:w-[75%]  px-5">
          <Image width={100} height={100} src={clickLatest?.image} className="lg:flex-initial w-full" alt="" />
          <div className="gap-5">
            <div className="w-full p-2 lg:flex-initial flex-col">
              <h1 className="font-bold text-2xl text-center ">{clickLatest?.title}</h1>
              <hr className="mt-2" />
              <div className="flex justify-around mt-2">
                <span className="bg-gray-100 text-gray-500 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-700">
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
        </div> */}