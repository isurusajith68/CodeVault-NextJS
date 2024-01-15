"use client"

import React, { useEffect, useState } from 'react';
import CustomModal from './Modal.js';
import PDFDownloader from './Pdf/PDFDownloader';
import PDFViewer from './Pdf/PdfViewr';
import axios from 'axios';
import Image from 'next/image';
import pdf from "../../public/assets/pdf.png"
import Loading from './Loading.js';

const DocumentList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doc, setDoc] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchDocumentList = async () => {
        const response = await axios.get('/api/doc');
        setDoc(response.data.data);
    };

    useEffect(() => {
        fetchDocumentList();
    }, [])

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
                            <div className='className="flex flex-col gap-5 p-5 items-center justify-center"'>
                                <div>
                                    <button onClick={openModal}>View PDF</button>
                                    <CustomModal  isOpen={isModalOpen} onClose={closeModal} >
                                        <PDFViewer pdfUrl={data.url} />
                                    </CustomModal>
                                    <PDFDownloader pdfUrl={data.url} fileName={data.filename} />
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