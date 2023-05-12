import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function Input({ type, title, id, placeholder = '', value, event, error, Icon = null, isPassword = false }: any) {
    const [viewPassword, setViewPassword] = useState(false)
    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <div className="form-control flex justify-between items-center space-x-2">
                <input
                    type={`${isPassword ? (viewPassword ? 'text' : 'password') : type}`}
                    id={id} className="input flex-grow"
                    placeholder={`${isPassword ? "••••••" : placeholder}`}
                    value={value}
                    onChange={event}
                />
                {isPassword ? (viewPassword ? (
                    <AiOutlineEyeInvisible className="text-xl cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
                ) : (
                    < AiOutlineEye className="text-xl cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
                )) : (Icon && <Icon />)}

            </div>
            {error?.trim().length > 0 && <small className="text-red-600">{error}</small>}
        </div>
    )
}
