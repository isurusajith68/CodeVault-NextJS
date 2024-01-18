"use client"
import Link from "next/link"
import { MdSpaceDashboard } from "react-icons/md"
import { BsFilePost, } from "react-icons/bs"
import { IoDocumentText, IoHome } from "react-icons/io5"
import { FaSignOutAlt, FaUserCheck } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import admin from "../../../public/assets/admin.jpg"
import { usePathname } from "next/navigation"
import ProfileImageGenerator from "../ProfileImage"

const SideBarResponsive = () => {
    const navigation = usePathname()
  return (
    <div>
          <div className="xl:hidden w-12  max-h-[500px] sticky top-5 left-0 bg-white rounded-md p-1 ">
              <div className="">
                  <div className="flex items-center justify-center  ">
                      {/* <Image src={admin} alt="profile" width={30} height={30} className="border border-black rounded-full" /> */}
                      <ProfileImageGenerator username={session?.user?.name} width={"30px"} height={"30px"} color={"red"} />

                  </div>

              </div>
              <hr className="my-3" />
              <div>
                  <div className="flex flex-col items-center mt-5 gap-6">
                      <div>
                          <div className={navigation === "/admin" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                              <Link href="/admin"> <MdSpaceDashboard size={20} /></Link>

                          </div>
                      </div>
                      <div>
                          <div className={navigation === "/admin/stack" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                              <Link href="/admin/stack"><BsFilePost size={20} /></Link>
                          </div>
                      </div>

                      <div>
                          <div className={navigation === "/admin/doc" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                              <Link href="/admin/doc"><IoDocumentText size={20} /></Link>
                          </div>
                      </div>

                      <div>
                          <div className={navigation === "/admin/user" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                              <Link href="/admin/user"><FaUserCheck size={20} /></Link>
                          </div>
                      </div>

                  </div>
              </div>
              <hr className="my-3 " />
              <div>
                  <div className="flex flex-col mt-5 gap-6 items-center">
                      <div>
                          <div className="flex items-center  gap-3 font-semibold cursor-pointer">
                            <Link href="/"><IoHome size={20} /></Link>
                          </div>
                      </div>
                      <div>
                          <div className="flex items-center  gap-3 font-semibold cursor-pointer">
                              <IoIosSettings size={20} />
                          </div>
                      </div>
                      <div>
                          <div onClick={() => signOut()} className="flex items-center  gap-3 font-semibold cursor-pointer">
                              <FaSignOutAlt size={20} />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
export default SideBarResponsive