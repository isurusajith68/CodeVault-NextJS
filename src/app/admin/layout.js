
import AdminSideBar from "../../components/AdminSideBar"

export default async function RootLayout({
    children,
}) {

  

    return (
        <div className="flex py-5 gap-5">
            <AdminSideBar />
            <div className="bg-white w-full rounded-md p-5">
            {children}
            </div>
        </div>
    )
}
