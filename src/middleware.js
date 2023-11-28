export { default } from "next-auth/middleware"
import { NextResponse } from 'next/server';

/* export default  withAuth(async function middleware (request) {
        if(request.nextUrl.pathname =="/booking"){
            console.log(request.nextUrl)
            const url = request.nextUrl.clone()
            url.pathname = '/api/air/GetUser';
            url.credentials = "include";
            url.method = "GET";
            //url.mode = "cors";
            console.log(url)
            url.headers = request.headers;

            fetch(url.href, {
                method: "GET",
               
                credentials: "include",
                headers: request.headers,
              })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if(data.Permission === true){
                    
                    request.nextUrl.pathname = '/dest'
                    console.log("redirecting... to /dest", url)
                return NextResponse.redirect(url);
                } else if(data.Permission === false){
                    const { pathname, search, origin, basePath } = request.nextUrl
                    const red = "/schedule"
                    const redirectUrl = new URL(`${basePath}${red}`, origin)
                    redirectUrl.searchParams.append(
                        "callbackUrl",
                        `${basePath}${pathname}${search}`
                      )
                    //request.nextUrl.pathname = "/schedule"
                    //const redirectUrl = new URL(`${basePath}/best`, origin)
                    
                    console.log("redirecting... to /best", redirectUrl)
                    return NextResponse.redirect(redirectUrl)
                }
            })
            return NextResponse.next();
        
        }

    }); */
    





export const config = { matcher: ["/booking"] }