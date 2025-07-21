import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { DataContext } from "../context/ContextAppDevTree"
import { Toaster } from "sonner";
export const ProfileLayout = () => {

    const { dispatchLogOut } = useContext(DataContext);

    
    return (
        <>

            <div className="min-h-screen bg-gray-100">

                <nav className="bg-[#0d1520] text-white flex justify-between items-center px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">💻</span>
                        <span className="text-xl font-bold">DevTree</span>
                    </div>
                    <button className="bg-lime-400 text-black px-4 py-2 rounded font-semibold text-sm"
                        onClick={() => dispatchLogOut()}
                    >
                        CERRAR SESIÓN
                    </button>
                </nav>

                <div className=" w-full mx-auto px-4 py-10" style={{ maxWidth: "1200px" }}>

                    <div className="flex items-center space-x-6 px-6 mt-4 border-b border-gray-300">
                        <NavLink
                            to="/link"
                            className={({ isActive, isPending }) => {
                                const style = " border-blue-600 pb-2 font-semibold text-sm transition "

                                return isPending ? (style + "text-gray-600") : isActive ? (style + "text-blue-600 border-b-2") : style
                            }}
                        >
                            Mis Social Links
                        </NavLink>

                        <NavLink
                            to="/me"
                            className={({ isActive, isPending }) => {
                                const style = " border-blue-600 pb-2 font-semibold text-sm transition "

                                return isPending ? (style + "text-gray-600") : isActive ? (style + "text-blue-600 border-b-2") : style
                            }}
                        >
                            Mi Perfile
                        </NavLink>

                        <NavLink
                            to="/visit"
                            className={({ isActive, isPending }) => {
                                const style = " border-blue-600 pb-2 font-semibold text-sm transition "

                                return isPending ? (style + "text-gray-600") : isActive ? (style + "text-blue-600 border-b-2") : style
                            }}
                        >
                            Vistas
                        </NavLink>


                    </div>

                    <Outlet />
                </div>

            </div>
            <Toaster position="top-center" richColors />
        </>
    )
}
