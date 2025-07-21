import { Outlet } from "react-router-dom"
import { Navbar } from "./navBar"

import logo from "./../assets/logo.svg";
import bg from "./../assets/bg.svg";

import { Toaster } from "sonner"

export const Layout = () => {



    return (

        <>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
                <div className="bg-gray-200 min-h-screen md:min-h-full flex items-center justify-center  relative">
                    <div className="h-[100%] bg-[#154360]">

                        <div className="static md:sticky md:top-0 ">

                            <div className="w-full p-4  h-full">
                                <h1 className="text-white text-7xl text-center py-[50px] my-5" >¡Welcome!</h1>

                                <div className="flex flex-1 flex-col justify-center items-center py-5">
                                    <img src={logo} alt="Logo" className="h-auto my-5 pt-5 max-w-[70%]" />

                                    <p className="mt-5 text-white text-center px-4">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas corporis voluptatem
                                        laboriosam, praesentium nobis est? Voluptas molestias necessitatibus, hic dolor
                                        odio magnam iure blanditiis perferendis voluptatibus laboriosam magni, beatae minus!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen md:min-h-full relative" style={{
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }} >
                    <div className="sticky top-0 z-10 w-[100%]" >
                        <div className="absolute w-[100%]">
                            <Navbar />
                        </div>
                    </div>
                    <div className="  py-5 h-[100%] border-2 " >

                        <Outlet />
                    </div>

                </div>

            </div>
            <Toaster position="top-center" richColors />
        </>

    )
}
