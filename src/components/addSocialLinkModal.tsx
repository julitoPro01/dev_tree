import { useContext, useState } from 'react';
import { AddSocialLinkAsync } from '../helper/api-link';
import { DataContext } from '../context/ContextAppDevTree';

const socialOptions = [
    { name: 'Facebook', icon: '🌐' },
    { name: 'Instagram', icon: '📸' },
    { name: 'YouTube', icon: '📺' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'X', icon: '❌' },
    { name: 'Twitch', icon: '🟣' },
    { name: 'LinkedIn', icon: '💼' },
];

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddSocialLinkModal = ({ isOpen, onClose }: Props) => {

      const {dispatchAddLInk} = useContext(DataContext);

    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState(socialOptions[0].name);
    const [enabled, setEnabled] = useState(true);

    const handleAdd = async () => {
        if (!url) return alert('Por favor ingresa una URL válida.');
        
        const token = localStorage.getItem("token") ?? "";
         AddSocialLinkAsync(token, {
            nombre: platform,
            url,
            habilitado: enabled    
            }).then(val=>{
                dispatchAddLInk(val.data.links)
        }).catch(e=>{
            console.log(e)
        })
        setTimeout(()=>{

            // Reset
            setUrl('');
            setPlatform(socialOptions[0].name);
            setEnabled(true);
            onClose(); // cerrar modal
        },500)
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
                >
                    ×
                </button>

                <h2 className="text-lg font-semibold text-gray-700 mb-4">Agregar Red Social</h2>

                <div className="space-y-4">
                    {/* Red social */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Red Social</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm"
                        >
                            {socialOptions.map((opt) => (
                                <option key={opt.name} value={opt.name}>
                                    {opt.icon} {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* URL */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Switch */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Habilitado</label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={enabled}
                                onChange={() => setEnabled(!enabled)}
                                className="sr-only"
                            />
                            <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                                <div
                                    className={`absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full transition ${enabled ? 'translate-x-5 bg-green-500' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>

                    {/* Botón agregar */}
                    <button
                        onClick={handleAdd}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
}
