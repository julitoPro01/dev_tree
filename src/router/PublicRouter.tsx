import { useContext } from "react";
import { DataContext } from "../context/ContextAppDevTree";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }: any) => {
    const { stateUser } = useContext(DataContext);

    if (stateUser.state === "LOADING")
        return <h1> Cargando... <button type="reset">Volver a cargar</button> </h1>

    return (
        !stateUser.isLogin
            ? children
            : <Navigate to={"/"} />
    )
}
