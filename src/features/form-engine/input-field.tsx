import {useInputProcessor} from "./input-processor";
import {InputFieldProps} from "./fe-props";
import {InputFrame} from "./input-frame";


export function InputField({name, type = "text", placeholder, defaultValue, formHook, ...props}: InputFieldProps) {
    const {inputRef, handleChange} = useInputProcessor<HTMLInputElement>({name, defaultValue, formHook})
    return (
        <InputFrame label={props.label} required={props.required} element={(labelKey: string) => {
            return (
                <input
                    id={labelKey}
                    ref={inputRef}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                />
            )
        }}/>
    )
}