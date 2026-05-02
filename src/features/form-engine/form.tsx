import {FormHook, InputFieldPropsBase, InputType} from "./fe-props";
import {InputField} from "./input-field";
import {mmReactUseEffect} from "mmcore";

interface FormProps {
    formHook: FormHook
}

export default function Form({formHook}: FormProps) {

    // console.log(formHook)
    // console.log(formHook.fieldSpecList())
    //
    // mmReactUseEffect(() => {
    //     console.log(formHook.fieldSpecList())
    // }, [formHook.version])

    return (
        <>
            <form key={`form-`}>
                {formHook.fieldSpecList().map((spec: InputFieldPropsBase, index) => (
                    <>
                        <br/>
                        <br/>
                        <InputField
                            name={spec.name}
                            type={spec.type as InputType}
                            formHook={formHook}
                            placeholder={spec.placeholder}
                            label={spec.label}
                            required={spec.required}
                        />
                    </>
                ))}
            </form>
        </>
    )
}