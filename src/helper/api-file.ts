import { Axios } from "./api-user";
import { DataRequest } from "./api-user-interfaces";

export interface ParamData {
    description: string,
    username: string
}

export const UploadImageAsync = async (file: File, data: ParamData, token: string): Promise<DataRequest> => {
    try {
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("data", JSON.stringify(data));

        const result = await Axios.post("/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-token": token
            }
        })
        return result.data.data.user as DataRequest;
    }
    catch (error: any) {
        let msg = error.response.data.msg ?? "Error interno del servidor"
        throw new Error(msg)

    }
}