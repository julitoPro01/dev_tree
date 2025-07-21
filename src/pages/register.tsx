import { FormEvent, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { fieldName, usevalidateField } from "../hooks/useValidateField";
import { toastResponseRegister } from "../helper/api-toast-response";
import { DataContext } from "../context/ContextAppDevTree";
import { UserAsync } from "../helper/api-user";

const msg = fieldName;

const fieldError = {
  email: msg.email(""),
  password: msg.password(""),
  lastName: msg.lastName(""),
  name: msg.name(""),
  password1: msg.password1(""),
}

export const Register = () => {
  const { dispatchLogin,dispatchGetUser, dispatchLoading  } = useContext(DataContext);


  const { handleChange, value, handleClean } = useForm({ email: "", password: "", lastName: "", name: "", password1: "" });
  const { handleInput, field, isActive, isValidField, handleReset, handleComparePassword } = usevalidateField(fieldError);

  const { email, password, lastName, name, password1 } = value;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidField()) return;
    console.log("register")

    await toastResponseRegister({ email, password, lastName, name }, (action: boolean) => {
      if (action) {
        handleClean()
        handleReset()
        dispatchLogin()
        const token = localStorage.getItem("token") ?? "";

        UserAsync(token!).then(user => {

          dispatchGetUser(user.data)
          dispatchLoading();

        }).catch(e => {
          console.log(e)
          dispatchLoading();
        })
      }
    })
  }
  return (
    <div className="flex items-center justify-center mt-[100px]  animate__animated animate__fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registro de Usuario</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => { handleChange(e); handleInput(e) }}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-red-500 text-xs" > {isActive && field.name} </label>

        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Apellido*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => { handleChange(e); handleInput(e) }}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-red-500 text-xs" > {isActive && field.lastName} </label>

        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => { handleChange(e); handleInput(e) }}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-red-500 text-xs" > {isActive && field.email} </label>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña*
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => { handleChange(e); handleInput(e) }}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-red-500 text-xs" > {isActive && field.password} </label>

        </div>

        <div className="mb-6">
          <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
            Repite la contraseña*
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => {
              handleChange(e);
              handleInput(e);
              handleComparePassword(e, password);
            }}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-red-500 text-xs" > {isActive && field.password1} </label>

        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}
