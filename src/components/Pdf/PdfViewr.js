"use client"


import React, { useState } from 'react';
import Loading from '../Loading';

const PDFViewer = ({ pdfUrl }) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            {isLoading && <Loading />}
            <div>
                <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    className='pdf-viewer-container'
                    onLoad={() => setIsLoading(false)}
                ></iframe>
            </div>
        </div>
    );
};

export default PDFViewer;
