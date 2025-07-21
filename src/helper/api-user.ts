import axios from "axios"
import { DataRequest, DataResponse, ErrorThrow, ParamLogin, UpdateRequest } from "./api-user-interfaces";


export const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' }
});



const responseError = (error: any): ErrorThrow => {
    if (axios.isAxiosError(error)) {

        if (error.response) {

            return error.response.data as ErrorThrow

        }
        console.error("Sin respuesta del servidor:", error.request);
        return { ok: false, msg: "Error interno del servidor, intente mas tarde." }
    } else {
        console.error("Error desconocido:", error);
        return { ok: false, msg: "Error interno del servidor, intente mas tarde." }

    }
}

// -----------------------------------------------------

export const UserAsync = async (token:string):Promise<any> => {
    try {

        const result = await Axios.get("/user/",{
            headers:{
                "Content-Type": "application/json",
                "x-token":token
            }
        })

        return result.data as any;
    }
    catch (error) {
        const resp = responseError(error);
        
        throw new Error(resp.msg)

    }
}

export const LoginAsync = async (data: ParamLogin):Promise<DataResponse> => {
    try {

        const result = await Axios.post("/auth/login", { ...data })
        return result.data as DataResponse;
    }
    catch (error) {
        const resp = responseError(error);
        
        throw new Error(resp.msg)

    }
}

export const RegisterAsync = async (data: DataRequest):Promise<DataResponse> => {
    try {
        const result = await Axios.post("/user/", { ...data })
        return result.data as DataResponse;
    }
    catch (error) {
        console.log(error)
        const resp = responseError(error);
        
        throw new Error(resp.msg)

    }
}


export const UpdateAsync = async (data:UpdateRequest,token:string):Promise<DataResponse> => {
    try {
        const result = await Axios.post("/user/update",data, { 
            headers:{
                "Content-Type": "application/json",
                "x-token":token
            }
         })
        return result.data as DataResponse;
    }
    catch (error:any) {
        
        let msg = error.response.data.msg ?? "Error interno del servidor"
        throw new Error(msg)

    }
}