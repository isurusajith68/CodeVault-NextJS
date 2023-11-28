"use client"
import Image from "next/image"
import logo from "../assets/stacklogo.png"
import { useEffect, useState } from "react"
import axios from "axios";
import Loading from "../components/Loading";
import { formatDistanceToNow } from 'date-fns';
import { create } from "domain";
import Link from "next/link";
import { Allcategory } from "@/util/category";


const TimeAgo = ({ createdAt }) => {
  const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return <span>{distance}</span>;
};

const page = () => {
  const [posts, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryvalue, setCategoryValues] = useState([])
  const [selectdCategoryValue, setSelectCategoryValue] = useState("");

  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    setIsLoading(true)
    const post = await axios.get("/api/post");
    if (post.status == 200) {
      setPost(post.data.data)
      setIsLoading(false)

    }
  }

  useEffect(() => {
    const categoryNames = Allcategory.map((categoryItem) => categoryItem.name);
    setCategory(["Select Category....", ...categoryNames]);
  }, []);

  const fillterData = posts?.filter((item) => {
    if (selectedCategory === "Select Category...." || selectedCategory === "") {
      return true;
    }

    if (
      selectedCategory === item.category &&
      (selectdCategoryValue === "Select ...." || selectdCategoryValue === "")
    ) {
      return true;
    }

    if (selectedCategory === item.category && selectdCategoryValue === item.value) {
      return true;
    }

    return false;
  });
  //category value change set empty value categoryvalues
  useEffect(() => {
    setSelectCategoryValue("")
  }, [selectedCategory])


  useEffect(() => {
    const categoryvalue = Allcategory.filter((category) => {
      if (selectedCategory === category.name) {
        return true
      }
      return false
    });
    categoryvalue.map((value, key) => {
      setCategoryValues(value.value)
    })
  }, [selectedCategory])

  console.log(selectdCategoryValue)
  return (
    <div className="min-h-screen">
      <div className="flex space-x-2">

        <select value={selectedCategory} className="p-1 mt-2 flex w-[300px] justify-end rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" onChange={(e) => setSelectedCategory(e.target.value)}>
          {category.map((categoryItem, index) => (
            <option key={index} value={categoryItem}>{categoryItem}</option>
          ))}
        </select>

        {
          selectedCategory ?
            <div className="flex-1">
              <div className="mt-2 ">
                <select value={selectdCategoryValue} className="p-1 mt-2 flex w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" onChange={(e) => setSelectCategoryValue(e.target.value)}>
                  <option value="Select ....">Select ....</option>
                  {categoryvalue.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div> : ""
        }
      </div>
      {
        isLoading ? <div className=" w-full items-center text-center mt-10 justify-center">
          <Loading />

        </div> : <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-10">
          {fillterData?.map((item, index) => {
            const createdAt = item.createdAt


            return (
              <div key={index} className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow ">
                <Link href={`/post/${item._id}`} className="container">
                  <img className="IMG rounded-t-lg" src={item.image != "" ? item.image : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} alt="" />
                </Link>
                <div className="p-5">
                  <div className="flex justify-around">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-700">
                      <svg className="w-3 h-3  me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <h1>{item?.author}</h1>                   </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  border border-blue-400">
                      <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                      </svg>
                      <TimeAgo createdAt={createdAt} />
                    </span>
                  </div>
                  <Link href={`/post/${item._id}`} className="">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-2">{item.title}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                  <Link href={`/post/${item._id}`} id="toggle-btn" className="mt-2 text-blue-500 focus:outline-none">Read More</Link>
                </div>
              </div>
            )
          })
          }
        </div>
      }

    </div>

  )
}
export default page