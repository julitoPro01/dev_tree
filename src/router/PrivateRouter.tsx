import { useContext } from "react"
import { DataContext } from "../context/ContextAppDevTree"
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({children}:any) => {

    const {stateUser} = useContext(DataContext);

  return (
    stateUser.isLogin
    ? children
    : <Navigate to={"/auth"} />
)
}
