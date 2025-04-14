import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
const path= request.nextUrl.pathname

const token= request.cookies.get('token')?.value||''

if(path === '/login' || path === 'criar-conta'  && token){
    return NextResponse.redirect(new URL('/',request.url))
}

if(path ==='/redefinir-senha'){
  if (token){
    return NextResponse.redirect(new URL('/',request.url))
  }else{
    return NextResponse.redirect(new URL('/','login'))
  }
  
}

}

export const config = {
  matcher: ['/login','/criar-conta', 'redefinir-senha'],
}