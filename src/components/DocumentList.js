"use client"

import React, { useEffect, useState } from 'react';
import CustomModal from './Modal.js';
import PDFDownloader from './Pdf/PDFDownloader';
import PDFViewer from './Pdf/PdfViewr';
import axios from 'axios';
import Image from 'next/image';
import pdf from "../../public/assets/pdf.png"
import Loading from './Loading.js';
import { LuView } from "react-icons/lu";
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../lib/firebase/firebase.js';

const DocumentList = ({ editData, doc, fetchDocumentList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditClick = (data) => {
        editData(data);
    }


    const handleDeleteClick = async (id, filename) => {
        try {
            //remove pdf from firebase
            const storageRef = ref(storage, `doc/${filename}`);
            await deleteObject(storageRef);

            const response = await toast.promise(
                axios.delete(`/api/doc/${id}`),
                {
                    pending: 'Deleting...',
                    success: 'Deleted Successfully',
                    error: 'Delete Failed',
                }
            )
            if (response.status === 200) {
                fetchDocumentList();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold mb-4'>Document List</h1>

            {
                doc ? doc.map((data, index) => {
                    return (
                        <div className='flex bg-slate-200 border rounded-xl mt-3 cursor-pointer transition-transform transform hover:scale-105 h-40' key={index} >
                            <div className="flex flex-1 h-40 ">
                                <div className="p-2 flex   h-40 items-center justify-center object-none overflow-hidden">
                                    <Image src={pdf} alt="pdf-png" width={150} height={200} className="object-fill" />
                                </div>
                                <div className='className="p-5 overflow-hidden"'>
                                    <h1>{data.filename}</h1>
                                    <p>{data.uploader}</p>
                                    <p>{data.downloadCount}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 p-5 items-center justify-center">

                                <div onClick={openModal}>
                                    <LuView
                                        size={16}
                                        className="text-blue-700 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>
                                <CustomModal isOpen={isModalOpen} onClose={closeModal} >
                                    <PDFViewer pdfUrl={data.url} />
                                </CustomModal>
                                <PDFDownloader pdfUrl={data.url} fileName={data.filename} />
                                <div>
                                    <Edit
                                        fontSize="small"
                                        onClick={() => handleEditClick(data)}
                                        className="text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <Delete
                                        fontSize="small"
                                        onClick={() => handleDeleteClick(data._id, data.filename)}
                                        className="text-red-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>

                            </div>
                        </div>
                    )
                }) : <Loading />
            }


        </div >
    )
}
export default DocumentList