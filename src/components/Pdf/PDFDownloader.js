import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineDownloadForOffline } from "react-icons/md";

const PDFDownloader = ({ pdfUrl, fileName, side }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await toast.promise(
                axios.get(pdfUrl, {
                    responseType: 'blob',
                    // onDownloadProgress: (progressEvent) => {
                    //     const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    // },
                }),
                {
                    pending: 'Downloading...',
                    success: 'Downloaded Successfully',
                    error: 'Download Failed',
                }
            );
            setLoading(false);
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            saveAs(pdfBlob, fileName);
        } catch (error) {
            setLoading(false);
            console.error("An error occurred while downloading the PDF:", error);
        }
    };


    return (
        <div>
            <div onClick={handleDownload} disabled={loading}>
                {
                    loading ? side === "frontend" ?
                        <div className='flex justify-center items-center gap-1'>
                            <div> Download</div>
                            <MdOutlineDownloadForOffline
                                size={20}
                                className="text-white cursor-pointer transition-transform transform hover:scale-110 animate-bounce"
                            />
                        </div>
                        :
                        <MdOutlineDownloadForOffline
                            size={20}
                            className="text-white cursor-pointer transition-transform transform hover:scale-110 animate-bounce"
                        />

                        : side === "frontend" ?
                            <div className='flex justify-center items-center gap-1'>
                                <div> Download</div>
                                <MdOutlineDownloadForOffline
                                    size={20}
                                    className="text-white cursor-pointer transition-transform transform hover:scale-110"
                                />
                            </div>
                            :
                            <MdOutlineDownloadForOffline
                                size={20}
                                className="text-white cursor-pointer transition-transform transform hover:scale-110"
                            />

                }
            </div>
            {loading && <div>

            </div>}
        </div>
    );
};

export default PDFDownloader;
