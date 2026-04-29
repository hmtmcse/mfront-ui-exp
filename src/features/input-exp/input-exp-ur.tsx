import {loadPage, MRoute} from "mfront";

const formInput = loadPage(() => import("./form-input"))

const UI_BASE_URL = "/input-exp"
export default class InputExpUr {

    static readonly api = {}

    static readonly ui = {
        index: UI_BASE_URL,
        formInput: `${UI_BASE_URL}/form-input`,
    }

    static registerRoute(route: MRoute): void {
        route.addPublicRoute({url: this.ui.formInput, component: formInput})
    }
}