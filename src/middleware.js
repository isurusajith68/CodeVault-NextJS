import { withAuth } from "next-auth/middleware"


export default withAuth(
    {
        callbacks: {
            authorized: ({ req, token }) => {
                //baseurl/stack/anything cheack if user is admin otherwise return false and redirect to login page
                if (req.nextUrl.pathname.startsWith("/stack")) return token?.role === true;
                return !!token
            }
        },
    }
)

export const config = { matcher: ["/stack/:path*", "/terms"] }