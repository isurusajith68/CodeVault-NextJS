"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import Image from "next/image";
import pdf from "../../../public/assets/pdf.png"
import { LuView } from "react-icons/lu";
import CustomModal from '../../components/Modal';
import PDFDownloader from '../../components/Pdf/PDFDownloader';
import PDFViewer from '../../components/Pdf/PdfViewr';
import _debounce from 'lodash/debounce';

const Terms = () => {

  const [data, setData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    debouncedSearch("")
  }, []);

  const debouncedSearch = _debounce(async (query) => {
    try {
      const response = await axios.get(`/api/doc?q=${query}`);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, 500);

  const onChangeSearch = (e) => {
    const searchText = e.target.value;
    console.log(searchText);
    debouncedSearch(searchText);
  };


  const [url, setUrl] = useState(null);

  const handlePdfViewClick = (e) => {
    setIsModalOpen(true);
    setUrl(e)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setUrl(null)
  }

  const downloadClick = async (id) => {
    try {
      const response = await axios.post(`/api/doc/${id}/download`)
      if (response.status === 200) {
        data.map((item) => {
          if (item._id === id) {
            item.downloadCount += 1;
          }
        })
        setData([...data]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center mt-[80px]">
        <Loading />
      </div>
    )
  }





  return (
    <div className=" mt-[80px]">
      <div className="w-full bg-white rounded-full mt-3 mb-3">
        <div className="flex text-center justify-center ">
          <h1 className="text-lg font-semibold text-slate-500">Document</h1>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <input type="text" className=" p-3 border-none flex bg-white w-160 w-[300px] justify-end rounded-md  py-1.5 shadow-sm h-10 text-slate-500  placeholder:text-slate-500   focus:outline-none" placeholder="Search ..." onChange={onChangeSearch} />
        {/* <button className="bg-blue-500 text-white rounded-md px-2 py-1 ml-2" onClick={Search}>Search</button> */}
      </div>
      <div className="grid grid-cols-4 gap-10 mt-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {
          data.map((data, index) => {
            return (
              <>
                <div className="bg-white rounded-md shadow-sm" key={index}>
                  <div className="flex justify-center items-center">
                    <Image src={pdf} width={200} hight={200} alt="pdf-image" />
                  </div>
                  <div>
                    {/* <p>{JSON.stringify(data)}</p> */}
                    <p className="text-center text-slate-500 font-semibold">
                      {
                        data.filename.length > 30 ? data.filename.slice(0, 30) + "..." : data.filename
                      }
                    </p>
                    <p className="text-sm text-slate-500 text-center mt-1 ">
                      Upload:
                      <span className="ml-1 text-red-600">  {data.uploader}</span>
                    </p>
                    <div className="flex justify-around px-3 py-2">
                      <div className="text-sm bg-blue-500 rounded-sm py-1 px-2 text-white cursor-pointer" onClick={() => downloadClick(data._id)}>
                        <PDFDownloader pdfUrl={data.url} fileName={data.filename} side={"frontend"} />
                      </div>
                      <div className="text-sm bg-green-600 rounded-sm py-1 px-2 text-white cursor-pointer max-lg:hidden">
                        <div className="flex justify-center items-center gap-1" onClick={
                          () => handlePdfViewClick(data.url)
                        }
                        >
                          View
                          <LuView
                            size={16}
                            className="cursor-pointer transition-transform transform hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 text-center mt-1 mb-2">
                      Download:
                      <span className="ml-1 text-red-600"> {data.downloadCount}</span>
                    </p>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
      {
        data.length === 0 && (
          <div className="flex justify-start items-center mt-2 ml-2">
            <p className="text-sm text-slate-500 font-semibold">No data found</p>
          </div>
        )
      }
      <div>
        <CustomModal isOpen={isModalOpen} onClose={closeModal} >
          <PDFViewer pdfUrl={url} />
        </CustomModal>
      </div>
    </div>
  )
}
export default Terms