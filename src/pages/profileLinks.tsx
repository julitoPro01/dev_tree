import { useContext, useEffect, useState } from "react";
import { AddSocialLinkModal } from "../components/addSocialLinkModal";
import { GetSocialLinksAsync } from "../helper/api-link";
import { DataContext } from "../context/ContextAppDevTree";
import { SolialLink } from "../context/types";
import { Switch } from "@headlessui/react";
import { toastResponseEdiLink } from "../helper/api-toast-response";

import facebook from "./../assets/social/icon_facebook.svg";
import github from "./../assets/social/icon_github.svg";
import instagram from "./../assets/social/icon_instagram.svg";
import linkedin from "./../assets/social/icon_linkedin.svg";
import tiktok from "./../assets/social/icon_tiktok.svg";
import twitch from "./../assets/social/icon_twitch.svg";
import x from "./../assets/social/icon_x.svg";
import youtube from "./../assets/social/icon_youtube.svg";




interface ValueSolial extends SolialLink {
  readonly: boolean,
  icon: string,
  error: string
}

export const ProfileLinks = () => {

  const { stateUser: { link, data }, dispatchGetLInk } = useContext(DataContext);

  const [value, setvalue] = useState<ValueSolial[]>([])

  const [open, setOpen] = useState(false);

  const handleToggle = (index: number) => {
    value[index].habilitado = !value[index].habilitado;
    const token = localStorage.getItem("token") ?? ""
    if (!value[index].error) return;

    toastResponseEdiLink(
      token,
      index, {
      nombre: value[index].nombre,
      url: value[index].url,
      habilitado: value[index].habilitado
    }, ((e, _) => {
      if (!e) {
        value[index].readonly = true;
        setvalue([...value])
      }
    })
    )

  };

  const handleToggleUpdate = (index: number) => {
    value[index].readonly = !value[index].readonly;
    setvalue([...value])

  };

  const handleChange = (index: number, val: string) => {
    value[index].url = val;
    value[index].error = val;
    setvalue([...value])
  };

  const handleSave = (index: number) => {
    const token = localStorage.getItem("token") ?? ""

    if (!value[index].error) return;
    toastResponseEdiLink(
      token,
      index, {
      nombre: value[index].nombre,
      url: value[index].url,
      habilitado: value[index].habilitado
    }, ((_) => {
      value[index].readonly = true;
      setvalue([...value])
    })
    )

  };



  const liveDemo = () => {
    window.open(`/profile/${data?.username!}`, "_blank")
  }

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    GetSocialLinksAsync(token)
      .then(val => {
        dispatchGetLInk(val.links);
      })
      .catch(e => {
        console.log(e)
      })

  }, [])

  useEffect(() => {
    const links = link as ValueSolial[]
    setvalue(links.map(v => {
      v.readonly = true;
      v.icon = icons[v.nombre.toLowerCase()] ?? "";
      v.error = v.url
      return v;
    }))
  }, [link])


  return (
    <>

      <div className=" bg-gray-100 flex  justify-center p-4">

        <div className="bg-white shadow-xl rounded-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Panel izquierdo: formulario */}
          <div className="p-6 space-y-4 ">
            {value.map((s, i) => (
              <div
                key={s._id}
                className="flex items-start justify-between space-x-4 border rounded p-3 _linkItem"
              >
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    disabled={s.readonly}
                    value={s.url}
                    onChange={(e) => { handleChange(i, e.target.value) }}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder={`https://${s.nombre.toLowerCase()}.com`}
                    onBlur={() => handleSave(i)}
                  />

                  <Switch
                    checked={s.habilitado}
                    onChange={() => {
                      handleToggle(i)
                    }}
                    className={`${s.habilitado ? 'bg-blue-600' : 'bg-gray-300'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`${s.habilitado ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-300`}
                    />
                  </Switch>
                  <span className="px-2 text-sm"> {s.nombre} </span>
                  {!s.error && <p className="text-blue-500 text-xs">{"Completa el campo para actualizar"}</p>}
                </div>

                <div className="flex flex-col space-y-1">
                  <button
                    onClick={(e) => {
                      handleToggleUpdate(i)
                      const btn = e.target as HTMLButtonElement;
                      const card = btn.closest("._linkItem") as HTMLDivElement;
                      const input = card.querySelector("input") as HTMLInputElement;
                      setTimeout(() => input?.focus(), 200)
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
                </div>
              </div>
            ))}
          </div>


          <div className="flex flex-col bg-[#0d1520] items-center text-center space-y-4 py-5">
            {/* Enlace al perfil */}
            <p className="text-sm font-semibold text-blue-500">
              Visitar Mi Perfil:
              <button className="text-blue-50 px-2"
                onClick={() => liveDemo()}
              >/{data?.username!} </button>
            </p>

            {/* Tarjeta de perfil */}
            <div className="bg-[#1b2431] flex text-white p-6 rounded-lg w-100 shadow-lg">
              <div className="w-[200px] mx-2">

                {/* Nombre de usuario */}
                <p className="text-lg font-medium mb-4">{data?.username}</p>

                {/* Avatar */}
                <div className="flex justify-center mb-4 w-[200px]">

                  <img
                    src={`${data?.image ?? "https://cdn-icons-png.flaticon.com/512/4139/4139981.png"}`}
                    alt="Avatar"
                    className="w-40 h-40 rounded-full bg-purple-400 p-2"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center"
                    }} />
                </div>

                {/* Descripción */}
                <p className="text-sm font-semibold px-2">{data?.description}</p>
              </div>

              {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5"> */}
              <div className="ps-2">

                {value.map(
                  (s, i) =>
                    s.habilitado && (
                      <div key={i} className="">

                          <a
                            href={s.url}
                            target="_blank"
                            // rel="noopener noreferrer"
                            className="flex items-center bg-yellow-500 text-black font-semibold rounded px-1 my-2 space-x-2 hover:bg-gray-100 transition"
                          >

                            <img className="w-8 h-8" src={s.icon} />
                          </a>

                      </div>
                    )
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

    </>

  );
}


export const icons: Record<string, any> = {
  facebook,
  github,
  instagram,
  linkedin,
  tiktok,
  twitch,
  x,
  youtube,
}