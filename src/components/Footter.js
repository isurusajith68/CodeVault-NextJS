import Link from "next/link"

const Footter = () => {
    return (
        <footer className="sticky mt-44 bottom-0 left-0 md:px-24 px-5 py-1  z-20 w-full p-4 bg-white border-t  border-gray-200  md:flex md:items-center md:justify-between md:p-6 shadow-lg">
            <span className="text-sm text-slate-500 sm:text-center">© 2023 <Link href="/" className="hover:underline">Stack</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-Link-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                </li>
            </ul>
        </footer>

    )
}
export default Footter