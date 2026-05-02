import Form from "../form-engine/form";
import useForm from "../form-engine/use-form";
import {FieldSpec} from "../form-engine/fe-props";
import {Button} from "mfront-ui";

let isRequired: boolean =false

export default function FormInput() {
    const form = useForm()

    form.registerInputs((spec: FieldSpec) => {
        spec.text({name: "name", label: "Name", required: true})
        spec.email({name: "email", label: "Email"})
        spec.text({name: "phone", label: "Phone"})
        return spec
    })

    const mockApiCall = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "Touhid Mia",
                    email: "touhid@banglafighter.com",
                    phone: "01300000000",
                })
            }, 2000)
        })
    }

    const loadData = async () => {
        const data: any = await mockApiCall()
        form.setValues(data)
    }

    return (
        <>
            <Button onClick={loadData} variant={"outline"} className={"mr-3"}>
                Load Mock Data
            </Button>
            <Button onClick={() =>{console.log(form.getValues())}}>Load Value</Button>
            <Button onClick={() =>{form.setValue("name", "Mia Bhai")}}>Change Name</Button>
            <Button onClick={() =>{isRequired = !isRequired; form.updateInputSpec("name", {name: "name", required: isRequired})}}>Update spec</Button>
            <Form formHook={form}/>
        </>
    )
}