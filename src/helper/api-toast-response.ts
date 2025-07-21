import { toast } from "sonner"
import { DataRequest, DataResponse,ParamLogin, UpdateRequest,  } from './api-user-interfaces';
import { RegisterAsync, LoginAsync, UpdateAsync } from './api-user';
import { ParamData, UploadImageAsync } from "./api-file";
import { DeleteSocialLinkAsync, EditSocialLinkAsync } from "./api-link";


export const toastResponseLogin =async (values:ParamLogin,call:(action:boolean)=>void) => {

await toast.promise(LoginAsync(values),{
      loading:"Autenticando...",
      success:(data: DataResponse)=>{
          localStorage.setItem("token",data.data.token)
          call(true)
          return "Sesión iniciada correctamente.";
      },
      // error:""
      error:(err)=>{
        call(false)
        return err.message
      }
    })
}

export const toastResponseRegister =async (values:DataRequest,call:(action:boolean)=>void) => {

await toast.promise(RegisterAsync(values),{
      loading:"Creando nuevo usuario...",
      success:(data: DataResponse)=>{
          localStorage.setItem("token",data.data.token)
          call(true)
          return "Operación exitoso.";
      },
      // error:""
      error:(err)=>{
        call(false)
        return err.message
      }
    })
}

export const toastResponseUpdate =async (values:UpdateRequest,token:string,call:(action:boolean)=>void) => {

await toast.promise(UpdateAsync(values,token),{
      loading:"Actualizando datos...",
      success:(_: DataResponse)=>{
          call(true)
          return "Operación exitoso.";
      },
      // error:""
      error:(err)=>{
        call(false)
        return err.message
      }
    })
}

export const toastResponseUpdateUser =async (file: File,data:ParamData,token:string,call:(error:null | boolean,action:DataRequest | null)=>void) => {

await toast.promise(UploadImageAsync(file,data,token),{
      loading:"Actualizando datos...",
      success:(data: DataRequest)=>{
          call(null,data)
          return "Operación exitoso.";
      },
      // error:""
      error:(err)=>{
        call(true,null)
        return err.message
      }
    })
}

export const toastResponseDeleteLink =async (token:string,index:number,call:(error:null | boolean,action:DataRequest | null)=>void) => {

await toast.promise(DeleteSocialLinkAsync(token,index),{
      loading:"Eliminando datos...",
      success:(data: DataRequest)=>{
          call(null,data)
          return "Eliminado";
      },
      // error:""
      error:(err)=>{
        call(true,null)
        return err.message
      }
    })
}

export const toastResponseEdiLink =async (token: string,
  index: number,
  linkData: { nombre: string; url: string; habilitado?: boolean },call:(error:null | boolean,action:DataRequest | null)=>void) => {

await toast.promise(EditSocialLinkAsync(token,index,linkData),{
      loading:"Actualizando datos...",
      success:(data: DataRequest)=>{
          call(null,data)
          return "Actualizado";
      },
      // error:""
      error:(err)=>{
        call(true,null)
        return err.message
      }
    })
}
