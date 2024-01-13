
const page = async () => {


    return (
        <div className="w-full mt-3">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="lg:flex  gap-3 mt-3">
                <div className="flex flex-col w-full bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total User</h1>
                    <h1 className="text-white text-center mt-1 ">50</h1>

                </div>
                <div className="flex flex-col w-full max-lg:mt-2 bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total Post</h1>
                    <h1 className="text-white text-center mt-1 ">50</h1>

                </div>
                <div className="flex flex-col w-full max-lg:mt-2 bg-red-500 rounded-md p-2">
                    <h1 className="text-white text-center mt-1 ">Total Doc</h1>
                    <h1 className="text-white text-center mt-1 ">50 </h1>
                </div>
            </div>

        </div>
    )
}
export default page