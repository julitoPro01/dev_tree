import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DataContext } from "../context/ContextAppDevTree";
import { GetVisitasPorUsername } from "../helper/api-link";
import { Grafig } from "../components/VisitasChart";

export const Visit = () => {

    const { stateUser: { data: state } } = useContext(DataContext)


    const { data, isLoading, isError } = useQuery({
        queryKey: ['visitas', state?.username],
        queryFn: () => GetVisitasPorUsername(state?.username!),
        enabled: !!state?.username
    });




    if (isLoading) return <p>Cargando estadísticas...</p>;
    if (isError) return <p>Error al cargar estadísticas.</p>;



    return (
        <div className="p-6 space-y-4">
            <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">📊 Estadísticas <span className="text-blue-600">{state?.username}</span></h1>
                    <p className="text-lg text-gray-600 mt-1">
                        Total de visitas: <span className="font-semibold text-green-600">{data.total}</span>
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">🕒 Últimas visitas</h2>
                    <ul className="text-sm text-gray-700 space-y-1 pl-3 list-disc">
                        {data.ultimas.map((v: any, i: number) => (
                            <li key={i}>
                                {new Date(v.timestamp).toLocaleString()} — <span className="font-mono text-gray-500">{v.ip}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">📅 Visitas por día</h2>
                    <ul className="text-sm text-gray-700 space-y-1 pl-3 list-disc">
                        {Object.entries(data.porDia).map(([fecha, cantidad]: any) => (
                            <li key={fecha}>
                                <span className="font-medium">{fecha}</span>: {cantidad} visita{cantidad > 1 ? 's' : ''}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div>
                <Grafig data={{ ...data }} />
            </div>

        </div>
    );
}
