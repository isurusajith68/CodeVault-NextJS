import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {toast} from 'react-toastify';

const PDFDownloader = ({ pdfUrl, fileName }) => {
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
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Downloading...' : 'Download PDF'}
            </button>
            {loading && <div>
                
                </div>}
        </div>
    );
};

export default PDFDownloader;
