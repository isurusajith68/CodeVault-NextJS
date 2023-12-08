import { useEffect, useState } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
    }, [scrolled]
    )
    return (
        <div className={scrolled ? `fixed mt-10 z-50 w-full flex h-[60px] bg-white  justify-start ` : " z-50 w-full flex h-[60px] bg-white  justify-startx"}>Header</div>
    )
}
export default Header