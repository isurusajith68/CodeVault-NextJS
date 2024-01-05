import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className="text-center">
                <p className="mt-4 text-gray-600">Let s get you back <Link href="/" className="text-blue-500">home</Link>.</p>
            </div>
        </div>



    )
}