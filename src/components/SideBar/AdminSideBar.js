"use server"

import Image from "next/image"
import admin from "../../../public/assets/admin.jpg"
import { getServerSession } from "next-auth"
import SideBarNavLink from "./SideBarNavLink"
import SideBarResponsive from "./SideBarResponsive"
import { authOption } from "../../app/api/auth/[...nextauth]/route"
const AdminSideBar = async () => {

    const session = await getServerSession(authOption)

    return (
        <aside>
            <div className="max-md:hidden w-64 max-h-[500px] sticky top-5 left-0 bg-white rounded-md p-5 ">
                <div className="">

                    <div className="flex items-center justify-center  ">
                        <Image src={admin} alt="profile" width={50} height={50} className="border border-black rounded-full" />
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-lg font-semibold">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                </div>
                <hr className="my-3 " />
                <SideBarNavLink />
            </div>
            <SideBarResponsive />
        </aside>
    )
}
export default AdminSideBar