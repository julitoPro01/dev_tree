import { ChangeEvent, useState } from "react"

export interface ParamValuesLogin{
    email:string,
    password:string
}

export interface ParamValuesRegister extends ParamValuesLogin{
    name:string,
    lastName:string
}

export function useForm<T extends Record<string,any>>(fields:T){
    const [value, setValue] = useState(fields);
    const [loading, setLoading] = useState({loading:false});

    const handleChange=({target}:ChangeEvent)=>{
        const input = target as HTMLInputElement;
        setValue((val)=>({
            ...val,
            [input.name] : input.value
        }))
    }

    const handleClean=()=>{
        setValue(fields);
    }

    const handleLoading=(loading:boolean)=>{
        setLoading({loading})
    }

    return{
        value,loading,
        handleChange,
        handleClean,
        handleLoading
    }

}
