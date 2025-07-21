export interface ParamLogin {
    email: string,
    password: string
}


export interface BaseRequest {
    ok: boolean
}

export interface ErrorThrow extends BaseRequest {
    msg: string
}


export interface DataResponse extends BaseRequest {
    data: {
        token: string
    }
}

// --------------------------

export interface DataRequest {
    id?:string,
    name:string,
    email:string,
    lastName:string
    password:string,
    username?:string,
    description?:string,
    image?:string
}


export interface UpdateRequest{
    image:string,
    description:string,
    username:string
}