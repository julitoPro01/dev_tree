import { createContext, useReducer } from "react"
import { todoReducer } from "./TodoReducer";
import { SolialLink, UserData } from "./types";
import { DataRequest } from "../helper/api-user-interfaces";

type Values = {
  stateUser: UserData,
  dispatchLogin: () => void,
  dispatchGetUser:(user:DataRequest)=>void,
  dispatchLogOut:()=>void,
  dispatchLoading:()=>void,
  dispatchAddLInk:(user:SolialLink[])=>void,
  dispatchGetLInk: (user:SolialLink[])=>void
}


const User: UserData = {
  isLogin: false,
  state: "LOADING",
  data:null,
  link: [] 
}

export const DataContext = createContext({} as Values);

export const ContextAppDevTree = ({ children }: { children: any }) => {

  const [state, dispatch] = useReducer(todoReducer, User);

  const dispatchLoading=()=>{
    dispatch({payload:state,type:"loading"})
  }

  const dispatchAddLInk = (links:SolialLink[]) => {
    dispatch({
      payload: {
        ...state,
        link:links
      }, type: "addLink"
    })
  }

  const dispatchGetLInk = (links:SolialLink[]) => {
    dispatch({
      payload: {
        ...state,
        link:links
      }, type: "getLink"
    })
  }

  const dispatchGetUser = (user:DataRequest) => {
    dispatch({
      payload: {
        ...state,
        data:user
      }, type: "user"
    })
  }

  const dispatchLogin = () => {
    dispatch({
      payload: {
        ...state,
      }, type: "login"
    })
  }

   const dispatchLogOut = () => {
    localStorage.removeItem("token");
    dispatch({
      payload: {
        ...state,
      }, type: "logout"
    });
  }

  return (
    <DataContext.Provider value={{
      stateUser: state,
      dispatchGetUser,
      dispatchLogin,
      dispatchLogOut,
      dispatchLoading,
      dispatchAddLInk,
      dispatchGetLInk
    }}>
      {children}
    </DataContext.Provider>
  )
}
