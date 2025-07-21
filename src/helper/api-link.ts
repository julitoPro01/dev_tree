import { Axios } from "./api-user";

export interface ISocialLink {
  nombre: string;
  url: string;
  habilitado: boolean;
}


export const GetSocialLinksAsync = async (token:string):Promise<any> => {
    try {
        const result = await Axios.get("/link", { 
            headers:{
                "Content-Type": "application/json",
                "x-token":token
            }
         })

        return result.data 
    }
    catch (error:any) {
        
        let msg = error.response.data.msg ?? "Error interno del servidor"
        throw new Error(msg)

    }
}


export const AddSocialLinkAsync = async (token: string, linkData: ISocialLink) => {
  try {
    const result = await Axios.post("/link", linkData, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token
      }
    });
    return result.data;
  } catch (error: any) {
    const msg = error.response?.data?.msg ?? "Error interno del servidor";
    throw new Error(msg);
  }
};

export const EditSocialLinkAsync = async (
  token: string,
  index: number,
  linkData: { nombre: string; url: string; habilitado?: boolean }
) => {
  try {
    const result = await Axios.put(`/link/${index}`, linkData, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token
      }
    });
    return result.data;
  } catch (error: any) {
    const msg = error.response?.data?.msg ?? "Error interno del servidor";
    throw new Error(msg);
  }
};

export const DeleteSocialLinkAsync = async (token: string, index: number) => {
  try {
    const result = await Axios.delete(`/link/${index}`, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token
      }
    });
    return result.data;
  } catch (error: any) {
    const msg = error.response?.data?.msg ?? "Error interno del servidor";
    throw new Error(msg);
  }
};


// /link/profile/admin

export const GetProfileAsync = async ( username:string) => {
  try {
    const result = await Axios.get(`/link/profile/${username}`, {
      headers: {
        "Content-Type": "application/json",      }
    });
    return result.data;
  } catch (error: any) {
    const msg = error.response?.data?.msg ?? "Error interno del servidor";
    throw new Error(msg);
  }
};


export const GetVisitasPorUsername = async (username: string) => {
  const { data } = await Axios.get(`/visit/${username}`);
  return data;
};