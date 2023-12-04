import React from 'react';

const FacebookShareButton = ({ url, quote }) => {
    return (
        <div className="fb-share-button" data-href={url} data-layout="button" data-size="large">
            <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`} className="fb-xfbml-parse-ignore">
                Share on Facebook
            </a>
        </div>
    );
};

export default FacebookShareButton;
