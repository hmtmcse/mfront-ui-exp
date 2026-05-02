import {MixType, MMReactChangeEvent, MMReactRefObject, mmReactUseEffect, mmReactUseRef} from "mmcore";
import {FormHook, InputElementType} from "./fe-props";


interface ValueStore {
    set: (name: string, value: string) => void
}

interface InputProcessorProps {
    name: string
    defaultValue?: MixType
    formHook?: FormHook
}

interface InputProcessorReturn<T extends InputElementType> {
    inputRef: MMReactRefObject<T | null>
    handleChange: (e: MMReactChangeEvent<T>) => void
}

export function useInputProcessor<T extends InputElementType>({ name, defaultValue, formHook }: InputProcessorProps): InputProcessorReturn<T> {
    const inputRef = mmReactUseRef<T>(null)

    mmReactUseEffect(() => {
        if (inputRef.current) {
            formHook?.registerRefs(name, inputRef.current)
        }
        return () => formHook?.unregisterRefs(name)
    }, [])

    mmReactUseEffect(() => {
        if (defaultValue !== undefined && inputRef.current) {
            inputRef.current.value = String(defaultValue);
            formHook?.setValue(name, defaultValue)
        }
    }, [defaultValue])

    const handleChange = (e: MMReactChangeEvent<T>) => {
        formHook?.setValue(name, e.target.value)
    }

    return {
        inputRef,
        handleChange
    }
}

// https://chatgpt.com/c/69f37985-eb98-8321-a7ea-5ed347b88981