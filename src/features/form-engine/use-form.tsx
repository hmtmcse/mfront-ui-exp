import {FieldSpec, FormHook, InputElementType, InputFieldProps, InputFieldPropsBase} from "./fe-props";
import {MixType, mmReactUseRef, mmReactUseState} from "mmcore";


export default function useForm(): FormHook {
    const store = mmReactUseRef(new Map<string, MixType>())
    const refs = mmReactUseRef(new Map<string, InputElementType>())
    const fieldSpec = mmReactUseRef(new FieldSpec())
    const isInitSpec = mmReactUseRef(false);
    const [version, setVersion] = mmReactUseState(0)

    const registerInputs = (inputs: (spec: FieldSpec) => FieldSpec): FieldSpec => {
        if (!isInitSpec.current) {
            isInitSpec.current = true;
            fieldSpec.current = inputs(new FieldSpec());
        }
        return fieldSpec.current
    }

    const fieldSpecList = (): InputFieldPropsBase[] => {
        return fieldSpec.current.getSpecList()
    }

    const registerRefs = (name: string, element: InputElementType) => {
        refs.current.set(name, element)
    }

    const unregisterRefs = (name: string) => {
        refs.current.delete(name)
    }

    const setValue = (name: string, value: MixType) => {
        store.current.set(name, value)
        const element = refs.current.get(name)
        if (element) {
            element.value = String(value)
        }
    }

    const setValues = (data: Map<string, MixType>) => {
        Object.entries(data).forEach(([k, v]) => {
            setValue(k, v)
        })
    }

    const getValues = (): Map<string, MixType> => {
        return store.current
    }

    const updateInputSpec = (name: string, spec: InputFieldProps) => {
        spec.name = name
        if (fieldSpec.current) {
            fieldSpec.current.updateSpec(spec)
            reload()
        }
    }

    const reload = () => {
        setVersion(v => v + 1)
    }

    return {
        version,
        registerRefs,
        unregisterRefs,
        setValue,
        setValues,
        getValues,
        fieldSpecList,
        registerInputs,
        updateInputSpec,
        reload
    }
}