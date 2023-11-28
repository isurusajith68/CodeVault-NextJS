import Loading from "./Loading"

const Latest = ({ data, clickLatestPost }) => {


    // const handleClick = (item) => {
    //     clickLatestPost(item)
    // }

    return (
        <div>
            <h1 className="text-center text-base font-semibold ">Latest post</h1>

            {data ? data.map((item, index) => {
                return (
                    <div onClick={() => clickLatestPost(item)} key={index} className="lg:w-full  w-[400px] rounded-xl  gap-3 mt-5 bg-slate-200 border border-b-2 shadow-md hover:bg-slate-100 transition-all cursor-pointer ">

                        <div className="flex">

                            <div className="flex-initial w-[25%] items-center justify-center">
                                <img src={item.image} className="object-fill w-16 h-16 rounded-lg" />
                            </div>
                            <div className="flex-initial w-[75%]">
                                <div className="text-center text-sm font-semibold">
                                    {item.title}
                                </div>
                                <div className="flex justify-around text-sm p-2">
                                    <div>
                                        {item.category}
                                    </div>
                                    <div>
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) :


                <div role="status" class="space-y-8 lg:w-full  w-[400px] animate-pulse md:space-y-0 md:space-x-8 p-1 rounded-lg mt-5 bg-slate-200 border border-b-2 shadow-md rtl:space-x-reverse flex items-center">
                    <div class="flex items-center justify-center w-full h-16 bg-white rounded sm:w-16 ">
                        <svg class="w-16 h-16 text-white dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div class="w-full">
                        <div class="h-2.5 bg-white rounded-full  w-48 mb-4"></div>
                        <div class="h-2 bg-white rounded-full  max-w-[480px] mb-2.5"></div>

                    </div>

                </div>

            }



        </div >
    )
}
export default Latest