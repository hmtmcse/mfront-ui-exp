import {WebGridItemPropsBase} from "mmcore-ui";
import {MixType, UIComponentProps, UINode} from "mmcore";

export type InputElementType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export interface InputDataValidator {
    validate(name: string, value: MixType, values: Map<string, MixType>): boolean
}

export interface InputAndFramePropsBase extends WebGridItemPropsBase {
    label?: string
    labelNext?: UINode

    required?: boolean
    errorText?: string

    hintsText?: string
    isError?: boolean


    frameClassName?: string
    frameIdName?: string
    frameAttrs?: Map<string, MixType>
}

export type InputFrameOrientation = "vertical" | "horizontal";

export interface InputFramePropsBase extends InputAndFramePropsBase {
    element: (labelKey: string) => UINode
    orientation?: InputFrameOrientation
    isChildFirst?: boolean
    attrs?: Map<string, MixType>
    idName?: string
}

export type InputFrameProps = InputFramePropsBase & UIComponentProps<"div">


export type InputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | 'hidden' | 'color';
export type AllInputType = InputType | "textarea" | "radio" | "checkbox" | "select" | "file";

export interface FormHook {
    registerInputs: (inputs: (spec: FieldSpec) => FieldSpec) => FieldSpec
    registerRefs: (name: string, element: InputElementType) => void
    unregisterRefs: (name: string) => void
    setValue: (name: string, value: MixType) => void
    setValues: (data: Map<string, MixType>) => void
    getValues: () => Map<string, MixType>
    fieldSpecList: () => InputFieldPropsBase[]
    updateInputSpec: (name: string, spec: InputFieldProps) => void
    version: number
    reload: () => void
}

export interface InputFieldPropsBase extends InputAndFramePropsBase {
    name: string
    validator?: InputDataValidator
    disabled?: boolean
    placeholder?: string
    type?: AllInputType
    isHidden?: boolean
    formHook?: FormHook
    defaultValue?: MixType
}

export interface InputFieldPropsExtend extends InputFieldPropsBase {
    autoComplete?: string
}

export type InputFieldProps = InputFieldPropsExtend & UIComponentProps<"input">

export interface TextareaFieldPropsBase extends InputFieldPropsBase {
    rows?: string
    cols?: string
}

export type TextareaFieldProps = TextareaFieldPropsBase & UIComponentProps<"textarea">

export interface SelectFieldPropsBase extends InputFieldPropsBase {
    isMulti?: boolean
    options: Array<any>;
    optionLabel: string;
    optionValue: string;
}

export type SelectFieldProps = SelectFieldPropsBase & UIComponentProps<"select">

export interface FileFieldPropsBase extends InputFieldPropsBase {
    maxSize?: number
    minSize?: number
    isMulti?: boolean
    allowedExtensions?: Array<string>
    previewUrlPrefix?: string
}

export type FileFieldProps = FileFieldPropsBase & UIComponentProps<"input">


export class FieldSpec {
    private allSpec: Map<string, InputFieldPropsBase> = new Map<string, InputFieldPropsBase>()

    public getSpecList(): InputFieldPropsBase [] {
        return Array.from(this.allSpec.values())
    }

    public text(spec: InputFieldProps): FieldSpec {
        spec.type = "text"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public file(spec: FileFieldProps): FieldSpec {
        spec.type = "file"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public url(spec: InputFieldProps): FieldSpec {
        spec.type = "url"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public password(spec: InputFieldProps): FieldSpec {
        spec.type = "password"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public textArea(spec: TextareaFieldProps): FieldSpec {
        spec.type = "textarea"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public select(spec: SelectFieldProps): FieldSpec {
        spec.type = "select"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public email(spec: InputFieldProps): FieldSpec {
        spec.type = "email"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public hidden(spec: InputFieldProps): FieldSpec {
        spec.type = "hidden"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public number(spec: InputFieldProps): FieldSpec {
        spec.type = "number"
        this.allSpec.set(spec.name, spec)
        return this
    }

    public updateSpec(spec: InputFieldPropsBase) {
        if (this.allSpec.has(spec.name)) {
            const oldSpec = this.allSpec.get(spec.name)!
            spec.type = oldSpec.type
            const newSpec = {...oldSpec, ...spec}
            this.allSpec.set(spec.name, newSpec)
        }
    }

}