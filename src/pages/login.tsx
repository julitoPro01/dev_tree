import { FormEvent, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { fieldName, usevalidateField } from "../hooks/useValidateField";
import { toastResponseLogin } from "../helper/api-toast-response";
import { DataContext } from "../context/ContextAppDevTree";
import { UserAsync } from "../helper/api-user";

export const Login = () => {
  const { dispatchLogin,dispatchGetUser, dispatchLoading  } = useContext(DataContext);


  const { handleChange, value, handleClean } = useForm({ email: "", password: "" });
  const { handleInput, field, isActive, isValidField ,handleReset} = usevalidateField({ email: fieldName.email(""), password: fieldName.password("") });

  const { email, password } = value;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidField()) return;

    await toastResponseLogin({ email, password }, (action: boolean) => {
      if (action){
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
    <div className="flex items-center justify-center h-full min-h-full animate__animated animate__fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Iniciar Sesión</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => { handleChange(e); handleInput(e) }}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => { handleChange(e); handleInput(e) }}

          />
          <label className="text-red-500 text-xs" > {isActive && field.password} </label>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
