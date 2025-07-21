import { GetProfileAsync } from "../helper/api-link";
import { useParams } from "react-router-dom";
import { icons } from './profileLinks';
import { useQuery } from "@tanstack/react-query";

export const UserProfilePage = () => {

    const { username } = useParams();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['profile', username],
        queryFn: () => GetProfileAsync(username as string),
        enabled: !!username, // solo se ejecuta si username existe
    });


    if (isLoading) return <p>Cargando perfil...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (

        <div className="flex text-white p-6 justify-center ">
            <div className=" bg-[#1b2431] p-6 rounded-lg flex">

                <div className="w-[200px] mx-2 ">

                    {/* Nombre de usuario */}
                    <p className="text-lg font-medium text-center mb-4">{data.profile?.username}</p>

                    {/* Avatar */}
                    <div className="flex justify-center mb-4 w-[200px]">

                        <img
                            src={`${data.profile?.image ?? "https://cdn-icons-png.flaticon.com/512/4139/4139981.png"}`}
                            alt="Avatar"
                            className="w-40 h-40 rounded-full bg-purple-400 p-2"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center"
                            }} />
                    </div>

                    {/* Descripción */}
                    <p className="text-sm font-semibold text-center px-2">{data.profile?.description}</p>
                </div>

                <div className="ps-2">

                    {data.profile.links.links.map(
                        (s: any, i: number) =>
                            s.habilitado && (
                                <div key={i} className="">

                                    <a
                                        href={s.url}
                                        target="_blank"
                                        // rel="noopener noreferrer"
                                        className="flex items-center bg-yellow-500 text-black font-semibold rounded px-1 my-2 space-x-2 hover:bg-gray-100 transition"
                                    >

                                        <img className="w-8 h-8" src={icons[s.nombre.toLowerCase()]} />
                                    </a>

                                </div>
                            )
                    )}
                </div>

            </div>
        </div>

    );
}
