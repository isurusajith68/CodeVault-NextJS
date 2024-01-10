"use client"

import { useState, useEffect } from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
const ScrollToTopButton = () => {
    const [isVisible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 10) {
            setVisible(true);
        } else if (scrolled <= 10) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    return (
        <div
            className="scroll-btn sm:mr-10"

        >
            <div>
                <BsFillArrowUpCircleFill
                    onClick={scrollToTop}
                    size={35}
                    style={{ display: isVisible ? "inline" : "none", color: "red" }}
                />
            </div>
        </div>
    );
};

export default ScrollToTopButton;
