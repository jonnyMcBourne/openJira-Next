import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
    let id = req.page.params?.id || ''
        if(Array.isArray(id)){
            id =''
        }
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    if(!checkMongoIDRegExp.test(id)){

        return new Response(
            JSON.stringify({message:'ID no valid', id}),
            {status:400, headers:{'Content-Type':'application/json'}}
             )
    }
    return NextResponse.next();
}
