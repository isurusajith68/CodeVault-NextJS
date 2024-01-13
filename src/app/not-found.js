import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex items-center justify-center h-full mt-28'>
            <div className="text-center">
                <p className="mt-4 text-gray-600">
                    Page not found 😑  
                     <Link href="/" className="text-blue-500">home</Link>.</p>
            </div>
        </div>



    )
}