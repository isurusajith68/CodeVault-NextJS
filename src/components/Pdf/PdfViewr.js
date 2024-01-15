"use client"


import React, { useState } from 'react';
import Loading from '../Loading';

const PDFViewer = ({ pdfUrl }) => {

    const [isLoading, setIsLoading] = useState(true);
    return (
        <div>
            {isLoading && <Loading />}
            <div style={{ width: '100%', height: '480px' }}>
                <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    style={{ width: '100%', height: '100%' }}
                    onLoad={() => setIsLoading(false)}
                ></iframe>
            </div>
        </div>
    );
};

export default PDFViewer;
