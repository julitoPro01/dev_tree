import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import { fieldName, usevalidateField } from '../hooks/useValidateField';
import { DataContext } from "../context/ContextAppDevTree";
import {  toastResponseUpdateUser } from "../helper/api-toast-response";
import { UserProfileCard } from "../components/userProfileCard";

const msg = fieldName;

const fieldError = {
    username: msg.username(""),
    description: msg.description("")
}


export const ProfilePage = () => {

    const { stateUser, dispatchGetUser } = useContext(DataContext);
    const user = stateUser.data

    const [imageUrl, setimageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const { handleChange, value } = useForm({
        username: user?.username ?? "", description: user?.description ?? "", image: user?.image ?? ""
    });

    const { handleInput, field, isActive } = usevalidateField(fieldError, value);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token") ?? ""


        await toastResponseUpdateUser(file!, {
            description: value.description,
            username: value.username.replace(/\s+/g, '')
        }, token, (error, data) => {
            if (!error) {
                dispatchGetUser(data!)
            }
        })

    }

    const handleUploadFile = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file = target.files as FileList;
        const imgData = file[0];
        if (imgData) {
            
            setFile(imgData)
            const prevURL = URL.createObjectURL(imgData);
            setimageUrl(prevURL);
        }
    }


    



    return (
        <div className="grid md:grid-cols-2 gap-4 px-6 py-10">
            {/* Formulario de edición */}
            <div className="bg-white p-6 rounded-lg shadow-md ">
                <h2 className="text-lg font-semibold text-center mb-4">Editar Información</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-semibold mb-1">Nombre de usuario:</label>
                        <input
                            name="username"
                            value={value.username}
                            onChange={(e) => { handleChange(e); handleInput(e) }}
                            type="text"
                            placeholder="Nombre de Usuario"
                            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                        />
                        <label className="text-red-500 text-xs" > {isActive && field.username} </label>

                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Descripción:</label>
                        <textarea
                            name="description"
                            value={value.description}
                            onChange={(e) => { handleChange(e); handleInput(e) }}
                            placeholder="Tu Descripción"
                            maxLength={255}
                            className="w-full h-[150px] border rounded px-3 py-2 bg-gray-100 text-gray-700"
                        />
                        <label className="text-red-500 text-xs" > {isActive && field.description} </label>

                    </div>

                    <div>
                        <input
                            id="_file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => { handleUploadFile(e) }}
                        />
                    </div>

                    <label className="text-red-500 text-xs" > Selecciona una imagen </label>
                    <div className="relative w-[100px] h-[100px]">

                        <img
                            src={`${imageUrl ?? "https://cdn-icons-png.flaticon.com/512/4139/4139981.png"}`}
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover object-right border"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center"
                            }}
                        />

                        <button
                            type="button"
                            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 text-white font-bold text-xl flex items-center justify-center rounded-full transition duration-300"
                            onClick={() => document.getElementById("_file")?.click()}
                        >
                            +
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 rounded mt-4"
                    >
                        GUARDAR CAMBIOS
                    </button>
                </form>
            </div>

            {/* Vista previa perfil */}
            <div className="bg-[#0d1520] h-full rounded-lg flex items-center justify-center text-white font-semibold">
                <UserProfileCard />
            </div>
        </div>
    );
}
