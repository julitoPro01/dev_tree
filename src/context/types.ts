import { ISocialLink } from "../helper/api-link"
import { DataRequest } from "../helper/api-user-interfaces"

export type Types="login" | "register" | "logout" | "user" | "loading"
                    | "addLink" | "updateLink" | "deleteLink"  |  "getLink"

type TYPE_STATE="LOADING" | "OK" | "ERROR" | "NULL"

export interface SolialLink extends ISocialLink{
    _id:string
}

export type UserData={
    isLogin:Boolean,
    state:TYPE_STATE
    data:DataRequest | null,
    link:SolialLink[] | []
}



export interface TodoValues{
    payload:UserData,
    type:Types
}