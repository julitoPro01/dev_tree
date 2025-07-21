// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className=" w-[100%] bg-white shadow-md  bg-white shadow"
            style={{ marginLeft: "auto" }}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo o nombre */}
                <div className="text-xl font-bold text-blue-600">
                    <Link to={"/auth"}>
                        dev<span className="text-gray-700">Tree</span>
                    </Link>
                </div>

                {/* Botón hamburguesa para móvil */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 focus:outline-none"
                    >
                        ☰
                    </button>
                </div>

                {/* Menú en pantallas grandes */}
                <div className="hidden md:flex space-x-4">
                    <NavLink to="/auth/login" className={({ isActive, isPending }) => {
                        const style ="text-gray hover:text-white px-4 py-2 rounded-lg hover:bg-blue-700  transition "
                        return isPending ? (style + "bg-blue-600 text-white") : isActive ? (style + "bg-blue-600 text-white") : style

                    }}>
                        Iniciar sesión
                    </NavLink>
                    <NavLink
                        to="/auth/register/"
                        className={({ isActive, isPending }) => {
                            const style = "text-gray hover:text-white px-4 py-2 rounded-lg hover:bg-blue-700  transition "

                            return isPending ? (style + "bg-blue-600 text-white") : isActive ? (style + "bg-blue-600 text-white") : style
                        }}
                    >
                        Registrarse
                    </NavLink>
                </div>
            </div>

            {/* Menú desplegable en móvil */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                     <NavLink to="/auth/login" className={({ isActive, isPending }) => {
                        const style ="text-gray hover:text-white px-4 py-2 mx-2 rounded-lg hover:bg-blue-700  transition "
                        return isPending ? (style + "bg-blue-600 text-white") : isActive ? (style + "bg-blue-600 text-white") : style

                    }}>
                        Iniciar sesión
                    </NavLink>
                    <NavLink
                        to="/auth/register"
                        className={({ isActive, isPending }) => {
                            const style = "text-gray hover:text-white mx-2 px-4 py-2 rounded-lg hover:bg-blue-700  transition "

                            return isPending ? (style + "bg-blue-600 text-white") : isActive ? (style + "bg-blue-600 text-white") : style
                        }}
                    >
                        Registrarse
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
