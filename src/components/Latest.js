import Loading from "./Loading"

const Latest = ({ data, clickLatestPost }) => {


    // const handleClick = (item) => {
    //     clickLatestPost(item)
    // }

    return (
        <div>
            {
                data &&
                <h1 className="text-center text-base font-semibold ">Latest post</h1>
            }
            {data ? data.map((item, index) => {
                return (
                    <div onClick={() => clickLatestPost(item)} key={index} className="lg:w-full  w-[400px] rounded-xl  gap-3 mt-5 bg-slate-300 border border-b-2 shadow-md hover:bg-slate-100 transition-all cursor-pointer ">

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

                <div>
                    <Loading />
                </div>}



        </div >
    )
}
export default Latest