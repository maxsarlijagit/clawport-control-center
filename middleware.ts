import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Role-based access control
    const adminRoutes = ["/admin", "/dashboard/admin"]
    const instructorRoutes = ["/instructor", "/dashboard/instructor"]
    const studentRoutes = ["/student", "/dashboard/student"]

    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    if (instructorRoutes.some(route => pathname.startsWith(route))) {
      if (token?.role !== "INSTRUCTOR" && token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/instructor/:path*",
    "/student/:path*",
    "/courses/:path*",
    "/profile/:path*",
  ]
}
