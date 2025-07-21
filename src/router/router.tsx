import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages/login"
import { Layout } from "../layout/layout"
import { Register } from "../pages/register"
import { Main } from "../pages/main"
import { ProfilePage } from "../pages/profile"
import { ProfileLinks } from "../pages/profileLinks"
import { PublicRouter } from "./PublicRouter"
import { PrivateRouter } from "./PrivateRouter"
import { ProfileLayout } from "../layout/profileLayout"
import { UserProfilePage } from "../pages/UserProfilePage"
import { Visit } from "../pages/Visit"
import { useContext, useEffect } from "react"
import { DataContext } from "../context/ContextAppDevTree"
import { UserAsync } from "../helper/api-user"

export const Router = () => {

 

    const { stateUser, dispatchGetUser, dispatchLoading } = useContext(DataContext)

    useEffect(() => {
        const token = localStorage.getItem("token") ?? "";
        if (stateUser.isLogin) return;

        UserAsync(token!).then(user => {

            dispatchGetUser(user.data)
            dispatchLoading();

        }).catch(e => {
            console.log(e)
            dispatchLoading();
        })

    }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={
          <PublicRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate to={"/auth/"} />} />
              </Route>
            </Routes>
          </PublicRouter>
        } />

        <Route path="/*" element={
          <PrivateRouter>
            <Routes>
              <Route element={<ProfileLayout />} >
                <Route index element={< ProfileLinks />} />
                <Route path="link" element={< ProfileLinks />} />
                <Route path="me" element={< ProfilePage />} />
                <Route path="visit" element={< Visit />} />

                <Route path="*" element={<Navigate to={"/"} />} />
              </Route>

            </Routes>
          </PrivateRouter>
        } />

        <Route path="profile/:username" element={<UserProfilePage />} />

      </Routes>
    </BrowserRouter>
  )
}
