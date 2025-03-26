import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
const path= request.nextUrl.pathname

const token= request.cookies.get('token')?.value||''

if(path === '/login' || path === 'criar-conta'  && token){
    return NextResponse.redirect(new URL('/',request.url))
}

}

export const config = {
  matcher: ['/login','/criar-conta'],
}