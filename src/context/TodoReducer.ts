import { TodoValues, UserData } from "./types";

export const todoReducer = (state:UserData,action:TodoValues):UserData => {
  
  switch(action.type){
      case "login":return{
        ...state,
        isLogin:true
      }
      case "user":return{
        ...state,
        isLogin:true,
        data:action.payload.data
      }
       case "logout":return{
        ...state,
        isLogin:false,
        data:null,
        link:[]
      }
       case "loading":return{
        ...state,
        state:"NULL"
      }
      case "addLink":{
        return{
        ...state,
        link:[...action.payload.link]
      }}

      case "getLink":return{
        ...state,
        link:action.payload.link
      }
      
      default: return state
  }
}
