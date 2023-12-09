import ProfileImageGenerator from "./ProfileImage"

const CommentSection = () => {
    return (
        <div className="mt-2">
            <div className="bg-white p-2 shadow-lg">
                <h1 className="text-slate-500 font-semibold mt-1 mb-1 ">Comments</h1>
                <form className="">
                    <div>
                        <textarea rows={5} className="p-5 w-full  bg-slate-100" placeholder="Add comment"></textarea>
                    </div>
                    <div className="flex justify-center items-center mt-2 ">
                        <button className="px-2 py-1  bg-red-500 rounded-lg w-full text-white">Add Comment</button>
                    </div>
                </form>

                <div className=" bg-white flex p-2  mt-2 gap-2">
                    <div className="flex w-[20%] justify-center items-center ">
                        <ProfileImageGenerator />
                    </div>
                    <div className="flex-auto w-[80%]">
                        <div className="text-slate-500 font-semibold mt-1">
                            Isuru
                        </div>
                        <div className="text-slate-500 italic font-semibold mt-1 text-sm">
                            2012-sep-10
                        </div>
                        <div className="text-slate-500 text-justify text-sm mt-1">

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quas consequuntur, fugit pariatur voluptatum ut nemo exercitationem quis doloremque nam, dolores optio repellat quia illo libero a voluptatibus minima est!
                        </div>
                    </div>

                </div>

                <hr/>

                <div className=" bg-white flex p-2  mt-2 gap-2">
                    <div className="flex w-[20%] justify-center items-center ">
                        <ProfileImageGenerator />
                    </div>
                    <div className="flex-auto w-[80%]">
                        <div className="text-slate-500 font-semibold mt-1">
                            Isuru
                        </div>
                        <div className="text-slate-500 italic font-semibold mt-1 text-sm">
                            2012-sep-10
                        </div>
                        <div className="text-slate-500 text-justify text-sm mt-1">

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quas consequuntur, fugit pariatur voluptatum ut nemo exercitationem quis doloremque nam, dolores optio repellat quia illo libero a voluptatibus minima est!
                        </div>
                    </div>

                </div>
                <hr />

                <div className=" bg-white flex p-2  mt-2 gap-2">
                    <div className="flex w-[20%] justify-center items-center ">
                        <ProfileImageGenerator />
                    </div>
                    <div className="flex-auto w-[80%]">
                        <div className="text-slate-500 font-semibold mt-1">
                            Isuru
                        </div>
                        <div className="text-slate-500 italic font-semibold mt-1 text-sm">
                            2012-sep-10
                        </div>
                        <div className="text-slate-500 text-justify text-sm mt-1">

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quas consequuntur, fugit pariatur voluptatum ut nemo exercitationem quis doloremque nam, dolores optio repellat quia illo libero a voluptatibus minima est!
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default CommentSection