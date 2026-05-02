import {MixType, UINode} from "mmcore";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import {InputFrameProps} from "./fe-props";

const inputFrameVariants = makeClassVariance(
  "group/input-frame flex w-full gap-2 data-[invalid=true]:text-danger",
  {
    variants: {
        colSpan: {1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8", 9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12", "full": "col-span-full"},
        orientation: {
            vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
            horizontal: [
                "flex-row items-center",
                "[&>[data-slot=field-label]]:flex-auto",
                "has-[>[data-tag=input-frame-horizontal]]:items-start has-[>[data-tag=input-frame-horizontal]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ]
        },
    },
      defaultVariants: {
          orientation: "vertical",
      },
  }
)

function generate12DigitNumber() {
    const min = 100_000_000_000;
    const max = 999_000_000_000;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}

function getHintsMessage(hintsMessage?: string) {
    if (!hintsMessage) {
        return ""
    }
    return (
        <p className={mergeWind(
            "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
            "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
            "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        )}>{hintsMessage}</p>
    )
}

function getErrorMessage(errorMessage?: string) {
    if (!errorMessage) {
        return ""
    }
    return (
        <div className={mergeWind("text-sm font-normal text-danger")}>{errorMessage}</div>
    )
}

function getLabel(labelKey: string, label?: string, required?: boolean, labelNext?: any) {
    if (!label) {
        return ""
    }
    let requiredSymbol: any = required ? <span className="text-danger relative top-[2.5px] required-symbol font-bold">*</span> : ""
    return (
        <label data-tag={"label"} htmlFor={labelKey} className={mergeWind(
            "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "group/tag-label peer/tag-label flex w-fit gap-1 leading-snug group-data-[disabled=true]/field:opacity-50",
            "has-[>[data-tag=input-frame]]:w-full has-[>[data-tag=input-frame]]:flex-col has-[>[data-tag=input-frame]]:rounded-md has-[>[data-tag=input-frame]]:border [&>*]:data-[tag=input-frame]:p-4",
            "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        )}>
            {requiredSymbol} {label} {labelNext}
        </label>
    )
}

export function InputFrame({element, className, label, labelNext, required, hintsText, isError, errorText, attrs, idName, orientation = "vertical", isChildFirst = false, ...props}: InputFrameProps) {
    const labelKey = generate12DigitNumber()
    const conditionalProps: Record<string, string | boolean > = {}
    let messageContent: UINode = getHintsMessage(hintsText)

    if (isError) {
        conditionalProps["data-invalid"] = true
        messageContent = getErrorMessage(errorText)
    }

    let childBeforeContent: UINode = (
        <>
            { !isChildFirst ? getLabel(labelKey, label, required, labelNext) : ""}
        </>
    )
    let childAfterContent: UINode = (
        <>
            { isChildFirst ? getLabel(labelKey, label, required, labelNext) : ""}
            {messageContent}
        </>
    )

    if (orientation === "horizontal") {
        childAfterContent = (
            <div data-tag={"input-frame-horizontal"} className={mergeWind("group/input-frame-horizontal flex flex-1 flex-col gap-1 leading-snug")}>
                {childAfterContent}
            </div>
        )
    }

    if (!attrs) {
        attrs = new Map<string, MixType>()
    }

    if (idName) {
        attrs.set("id", idName)
    }

    return (
        <div data-tag={"input-frame"} data-orientation={orientation} {...conditionalProps} className={mergeWind(inputFrameVariants({ orientation, ...props }), className)} {...attrs}>
            {childBeforeContent}
            {element(labelKey)}
            {childAfterContent}
        </div>
    )

}