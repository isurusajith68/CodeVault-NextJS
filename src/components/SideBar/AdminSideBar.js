"use server"

import Image from "next/image"
import admin from "../../../public/assets/admin.jpg"
import { getServerSession } from "next-auth"
import SideBarNavLink from "./SideBarNavLink"
import SideBarResponsive from "./SideBarResponsive"
import { authOption } from "../../app/api/auth/[...nextauth]/route"
import ProfileImageGenerator from "../ProfileImage"
const AdminSideBar = async () => {

    const session = await getServerSession(authOption)

    return (
        <aside>
            <div className="max-xl:hidden w-64 max-h-[500px] sticky top-5 left-0 bg-white rounded-md p-5 ">
                <div className="">

                    <div className="flex items-center justify-center  ">
                        {/* <Image src={admin} alt="profile"  className="border border-black rounded-full" /> */}
                        <ProfileImageGenerator username={session?.user?.name} width={"50px"} height={"50px"} color={"red"}/>

                    </div>
                    <div className="text-center mt-2">
                        <p className="text-lg font-semibold">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                </div>
                <hr className="my-3 " />
                <SideBarNavLink />
            </div>
         
            <SideBarResponsive >
                <div className="xl:hidden">
                    <div className="flex items-center justify-center  ">
                        {/* <Image src={admin} alt="profile" width={30} height={30} className="border border-black rounded-full" /> */}
                        <ProfileImageGenerator username={session?.user?.name} width={"30px"} height={"30px"} color={"red"} />

                    </div>

                </div>
            </SideBarResponsive>
        </aside>
    )
}
export default AdminSideBar