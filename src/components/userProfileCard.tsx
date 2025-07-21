import { useContext } from "react";
import { DataContext } from "../context/ContextAppDevTree";

export const UserProfileCard = () => {

    const { stateUser } = useContext(DataContext);

    const { data } = stateUser;
  const liveDemo = () => {
    window.open(`/profile/${data?.username!}`, "_blank")
  }
    return (
        <div className="flex flex-col items-center text-center space-y-4 py-5">
            {/* Enlace al perfil */}
            <p className="text-sm font-semibold text-blue-500">
              Visitar Mi Perfil:
              <button className="text-blue-50 px-2"
                onClick={() => liveDemo()}
              >/{data?.username!} </button>
            </p>

            {/* Tarjeta de perfil */}
            <div className="bg-[#1b2431] text-white p-6 rounded-lg w-60 shadow-lg">
                {/* Nombre de usuario */}
                <p className="text-lg font-medium mb-4">{data?.username}</p>

                {/* Avatar */}
                <div className="flex justify-center mb-4">

                    <img
                        src={`${data?.image ?? "https://cdn-icons-png.flaticon.com/512/4139/4139981.png" }`}
                        alt="Avatar"
                        className="w-40 h-40 rounded-full bg-purple-400 p-2"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center"
                        }} />
                </div>

                {/* Descripción */}
                <p className="text-sm font-semibold">{data?.description}</p>
                
            </div>
        </div>
    );
}
