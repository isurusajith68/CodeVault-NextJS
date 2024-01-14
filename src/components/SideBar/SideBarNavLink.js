"use client"
import { MdSpaceDashboard } from "react-icons/md"
import { BsFilePost, } from "react-icons/bs"
import { IoDocumentText, IoHome } from "react-icons/io5"
import { FaSignOutAlt, FaUserCheck } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const SideBarNavLink = () => {
    const navigation = usePathname()
  return (
    <div>
          <div>
              <div className="flex flex-col mt-5 gap-6 ml-6">
                  <div>
                      <div className={navigation === "/admin" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                          <MdSpaceDashboard size={20} />
                          <Link href="/admin">Dashboard</Link>
                      </div>
                  </div>
                  <div>
                      <div className={navigation === "/admin/stack" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                          <BsFilePost size={20} />
                          <Link href="/admin/stack">Post</Link>
                      </div>
                  </div>

                  <div>
                      <div className={navigation === "/admin/doc" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                          <IoDocumentText size={20} />
                          <Link href="/admin/doc">Document</Link>
                      </div>
                  </div>

                  <div>
                      <div className={navigation === "/admin/user" ? "flex items-center bg-red-500 rounded-lg  text-white p-2 gap-3 font-semibold" : "flex items-center  gap-3 font-semibold"}>
                          <FaUserCheck size={20} />
                          <Link href="/admin/user"> Users</Link>
                      </div>
                  </div>

              </div>
          </div>
          <hr className="my-3 " />
          <div>
              <div className="flex flex-col mt-5 gap-6 ml-6">
                  <div>
                      <div className="flex items-center  gap-3 font-semibold">
                          <IoHome size={20} />
                          <Link href="/">
                              <div className="cursor-pointer">Home</div>
                          </Link>
                      </div>
                  </div>
                  <div>
                      <div className="flex items-center  gap-3 font-semibold">
                          <IoIosSettings size={20} />
                          <div className="cursor-pointer">Settings</div>
                      </div>
                  </div>
                  <div>
                      <div onClick={() => signOut()} className="flex items-center  gap-3 font-semibold">
                          <FaSignOutAlt size={20} />
                          <div className="cursor-pointer" >Logout</div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
export default SideBarNavLink