"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import Loading from "../components/Loading";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { Allcategory } from "../util/category";
import Image from "next/image";
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryvalue, setCategoryValues] = useState([]);
  const [selectedCategoryValue, setSelectCategoryValue] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allDataLoad, setAllDataLoad] = useState(false);

  const { data: session } = useSession();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/post?page=${page}`)
      if (response.status === 200) {

        if (response.data.data.length < 4) {
          setAllDataLoad(true);
        }

        if (posts) {
          setPosts([...posts, ...response.data.data])
        } else {
          setPosts(response.data.data)
        }

        setLoading(false);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleLikeClick = async (postId) => {

    if (!session) {
      toast.error("Please Login First")
      return
    }

    if (session) {
      const userId = session?.user?.id
      try {
        const response = await fetch('/api/post/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, userId }),
        });

        const data = await response.json();

        if (data.success) {
          posts.map((item) => {
            if (item._id === postId) {
              if (item.likedBy.includes(userId)) {
                item.likedBy = item.likedBy.filter((id) => id !== userId);
              } else {
                item.likedBy.push(userId);
              }
            }
          })
          setPosts([...posts]);
        } else {
          console.error('Failed to like product:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

  };

  useEffect(() => {

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const categoryNames = Allcategory.map((categoryItem) => categoryItem.name);
    setCategory(["Select Category....", ...categoryNames]);
  }, []);

  const filleterData = posts?.filter((item) => {
    if (selectedCategory === "Select Category...." || selectedCategory === "") {
      return true;
    }

    if (
      selectedCategory === item.category &&
      (selectedCategoryValue === "Select ...." || selectedCategoryValue === "")
    ) {
      return true;
    }

    if (selectedCategory === item.category && selectedCategoryValue === item.value) {
      return true;
    }

    return false;
  });

  useEffect(() => {
    setSelectCategoryValue("");
  }, [selectedCategory]);

  useEffect(() => {
    const categoryValue = Allcategory.find((category) => selectedCategory === category.name);
    if (categoryValue) {
      setCategoryValues(categoryValue.value);
    }
  }, [selectedCategory]);

  const TimeAgo = ({ createdAt }) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return <span>{distance}</span>;
  };


  const handleIncrementViews = async (id) => {
    const response = await axios.post(`/api/post/incrementViews/${id}`);

  }

  if (!posts) {
    return (
      <div className="flex justify-center items-center mt-[80px]">
        <Loading />
      </div>
    )
  }


  return (
    <div className=" mt-[80px]">

      <div className="w-full bg-white rounded-full mt-3">
        <div className="flex text-center justify-center ">
          <h1 className="text-lg font-semibold text-slate-500">Latest Post</h1>
        </div>
      </div>
      <div className="sm:flex sm:space-x-2">

        <select value={selectedCategory} className="p-2 mt-3 border-none flex bg-white w-160 w-[300px] justify-end rounded-md  py-1.5 shadow-sm h-10 text-slate-500  placeholder:text-slate-500   focus:outline-none" onChange={(e) => setSelectedCategory(e.target.value)}>
          {category.map((categoryItem, index) => (
            <option className="" key={index} value={categoryItem}>{categoryItem}</option>
          ))}
        </select>

        {
          selectedCategory ?

            <select value={selectedCategoryValue} className=" mt-3 border-none flex bg-white w-160 w-[300px] justify-end rounded-md  py-1.5 shadow-sm h-10 text-slate-500  placeholder:text-slate-500   focus:outline-none" onChange={(e) => setSelectCategoryValue(e.target.value)}>
              <option value="Select ....">Select ....</option>
              {categoryvalue.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>

            : ""
        }
      </div>
      {
        filleterData.length === 0 && (
          <div className="flex justify-start items-center mt-2 ml-2">
            <p className="text-sm text-slate-500 font-semibold">No data found</p>
          </div>
        )
      }
      {
        !posts ? <div className=" w-full items-center text-center mt-10 justify-center">
          <Loading />

        </div> : <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-10">
          {filleterData?.map((item, index) => {
            const createdAt = item.createdAt


            return (
              <div onClick={() => handleIncrementViews(item._id)} key={index} className="max-w-sm  bg-white border border-gray-300 rounded-lg shadow-lg ">
                <Link href={`/post/${item._id}`} className="w-full">
                  <Image alt="" width={384} height={150} className="IMG rounded-t-lg " src={item.image != "" ? item.image : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} />
                </Link>
                <div className="px-5 pb-5 mt-2">
                  <div className="border-b">

                    <Link href={`/post/${item._id}`} className="">
                      <h5 className="mb-2 text-xl font-semibold tracking-tight text-slate-500 mt-1 text-center capitalize">{item.title}</h5>
                    </Link>
                    <div className="flex justify-between items-center text-slate-500">
                      <TimeAgo createdAt={item?.createdAt} />
                      <div className="flex">
                        post by <h1 className="ml-2 text-red-400 ">{item?.author}</h1>
                      </div>

                    </div>
                  </div>

                  <p className="mb-3 mt-2 font-normal text-justify text-gray-700 dark:text-gray-600">{item.description.length > 70 ? `${item.description.substring(0, 70)} .....` : item.description}</p>
                  <div className="flex items-center gap-2 mb-3 ">

                    <div>
                      {item.likedBy.length >= 0 && (
                        <div className="cursor-pointer">
                          {item.likedBy.includes(session?.user?.id) ? (
                            <BiSolidLike
                              color="blue"
                              className="hover:scale-125"
                              onClick={() => handleLikeClick(item._id)}
                            />
                          ) : (
                            <BiLike
                              color="blue"
                              className="hover:scale-125"
                              onClick={() => handleLikeClick(item._id)}
                            />
                          )}

                        </div>
                      )}
                    </div>


                    <div>
                      <span>
                        <span>{item.likedBy.length}</span>
                      </span>
                    </div>
                  </div>


                  <Link href={`/post/${item._id}`} id="toggle-btn" className="mt-10 text-blue-500 focus:outline-none">Read More →</Link>
                </div>
              </div>
            )
          })
          }
        </div>

      }
      {
        loading && (
          <div className=" w-full items-center text-center mt-10 justify-center">
            <Loading />

          </div>
        )
      }
      {
        !allDataLoad && (
          <div className="flex justify-center items-center mt-5 mb-5">
            <button className="bg-blue-500 text-white rounded-md px-2 py-1" onClick={() => setPage(page + 1)}>Load More</button>
          </div>
        )
      }
    </div >

  )
}
export default Home
