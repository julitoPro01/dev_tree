import { FormEvent, useEffect, useState } from "react";

export const fieldName: Record<string, any> = {
    name: (value: string): string => {
        if (value.length < 3 || !value.trim())
            return "El nombre es requerido y debe tener al menos 3 caracteres."
        return ""
    },
    email: (value: string) => {
        const trimmed = value.trim();

        if (!trimmed)
            return "El correo electrónico es obligatorio.";

        if (trimmed.length <= 3)
            return "El correo electrónico es demasiado corto.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmed))
            return "El formato del correo electrónico no es válido.";

        return ""
    },
    password: (value: string) => {
        if (value.trim().length > 5)
            return ""
        return "La contraseña debe contener al menos 6 caracteres."
    },
    password1: (value: string, password?: string) => {
        if (value.trim().length > 5) {
            if (value.trim() === password) {
                return ""
            }

            return "La contraseña no coincide. "
        }
        return "La contraseña debe contener al menos 6 caracteres."
    },
    lastName: (value: string): string => {
        if (value.length >= 1 || !!value.trim())
            return ""
        return "El Apellido es requerido"
    },
    username: (value: string): string => {
        if (value.length >= 1 || !!value.trim())
            return ""
        return "El nombre de usuario es requerido"
    },
    description: (value: string): string => {
        if (value.length >= 1 || !!value.trim())
            return ""
        return "La descripción es requerido"
    },
    image: (value: string): string => {
        if (value.length >= 1 || !!value.trim())
            return ""
        return "La imagen es requerido"
    }
}

export function usevalidateField<T extends Record<string, any>>(fields: T,value?:any) {

    const [field, setField] = useState<Record<string, any>>(fields);
    const [isActive, setActive] = useState(false);

    const handleInput = ({ target }: FormEvent<any>) => {
        const field = target as HTMLInputElement;
        if (field.name !== "password1") {
            setField((val) => ({
                ...val,
                [field.name]: fieldName[field.name](field.value)
            }))
        }
    };

    const handleInit = () => {
        const key = Object.keys(value);
        key.forEach(ke=>{
            setField(v=>({
                ...v,
                [ke] : fieldName[ke](value[ke])
            }))
        })
    };


    const isValidField = (): boolean => {
        setActive(true);
        const isValid = Object.values(field).every(v => v.trim() === "");

        return isValid
    }

    const handleReset = () => {
        const values = Object.keys(field).reduce((pre: Record<string, any>, curr) => {
            pre[curr] = fieldName[curr]("");
            return pre;
        }, {});

        setField(values)
        setActive(false)

    }

    const handleComparePassword = ({ target }: FormEvent<HTMLInputElement>, password: string) => {
        const field = target as HTMLInputElement;
        setField((val) => ({
            ...val,
            password1: fieldName.password1(field.value, password)
        }));
    }

    useEffect(() => {
        if(value){

            handleInit()
        }

    }, [])


    return {
        handleInput,
        isValidField,
        handleReset,
        handleComparePassword,
        field,
        isActive
    }
}