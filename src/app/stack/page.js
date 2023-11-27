"use client"
import { useState, useEffect } from "react";
import { Allcategory } from "../../util/category"
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import toast, { Toaster } from 'react-hot-toast';
import PostList from "../../components/PostList"

const Stack = () => {

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryvalue, setCategoryValues] = useState([])
  const [selectdCategoryValue, setSelectCategoryValue] = useState("");
  const [title, setTitle] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [content, setContent] = useState("")
  const [posts, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  //category
  useEffect(() => {
    const categoryNames = Allcategory.map((categoryItem) => categoryItem.name);
    setCategory(["Select Category....", ...categoryNames]);
  }, []);

  //filter 
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

  //quill set content
  const handleChange = (content) => {
    setContent(content);
  };

  //image convert base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  //upload
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title,
      category: selectedCategory,
      value: selectdCategoryValue,
      content,
      image: imageBase64
    }
    const response = await axios.post('/api/post', data);
    console.log(response)

    if (!response.status == 200) {
      toast.error("Post Added Failed")
    }

    if (response.status == 200) {
      toast.success(response.data.message)
      fetchData()

    }

  }


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

  return (
    <div className="flex w-full max-lg:flex-col md:space-x-10 mt-5 mb-3 gap-10">
      <div className="flex-1">
        <h1 className="font-semibold text-xl mb-5 text-center">Code Snippet Details</h1>
        <form onSubmit={handleSubmit}  >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div className="mt-2">
              <input onChange={(e) => setTitle(e.target.value)} id="title" name="title" type="title" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
            </div>
          </div>



          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">Category</label>
            <div className="flex gap-5">
              <div className="mt-2 flex-1">
                <select className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" onChange={(e) => setSelectedCategory(e.target.value)}>
                  {category.map((categoryItem, index) => (
                    <option key={index} value={categoryItem}>{categoryItem}</option>
                  ))}
                </select>
              </div>
              {
                selectedCategory ?
                  <div className="flex-1">
                    <div className="mt-2 ">
                      <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" onChange={(e) => setSelectCategoryValue(e.target.value)}>
                        {categoryvalue.map((value, index) => (
                          <option key={index} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div> : ""
              }
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-3">Snippet (Code)</label>
            <div className="mt-2">
              <ReactQuill

                theme="snow"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Image Upload</label>
            <div className="flex items-center justify-center w-full mt-2">
              {
                !imageBase64 && <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              }


              {imageBase64 && (
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <img className="object-fill h-44" src={imageBase64} alt="Selected File" />
                </label>
              )}
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 w-full rounded-full" type="submit">
            Button
          </button>
        </form>
      </div >
      <div className="flex-1 ">
        <PostList loarding={isLoading} data={posts} />
      </div>
    </div >
  )
}
export default Stack