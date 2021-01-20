import Kitsu from "kitsu"
import https from "https"
import GlobalConfig from "./global"

let FactoryAPI

export function initFactoryAPI() {
    if (FactoryAPI) return

    const { backendURL, api: { authorization }, languages: { languages } } = GlobalConfig

    const Api = new Kitsu({
        camelCaseTypes: false,
        resourceCase: "none",
        pluralize: false,
        axiosOptions: {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
            headers: {
                Authorization: authorization,
            },
        },
        headers: {
            Authorization: authorization,
        },
    })

    Api.endpoints = []

    Api.setEndpoints = (endpoints) => Api.endpoints = endpoints
    Api.getEndpoints = () => Api.endpoints

    Api.getAxios = () => {
        return Api.axios
    }

    Api.interceptors.request.use(config => {
        let header = {
            ...config.headers,
        }
        const oidcStorage = JSON.parse(window.localStorage.getItem(`oidc.user:${process.env.GATSBY_APP_AUTH_URL}:${process.env.GATSBY_APP_IDENTITY_CLIENT_ID}`))

        if (oidcStorage && typeof oidcStorage.access_token !== "undefined") {
            header.Authorization = `Bearer ${oidcStorage.access_token}`
        }

        return {
            ...config,
            headers: header,
        }
    }, error => {
        // Do something with request error
        return Promise.reject(error)
    })

    Api.setEndpoint = (endpoint) => {
        Api.axios.defaults.baseURL = endpoint
    }

    Api.getResources = async (endpoint, resource, params) => {
        if (typeof endpoint === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass endpoint (multi language) [http://void-v8.dd:8083/en/api/, http://void-v8.dd:8083/fr/api/].",
            )
        }

        if (typeof resource === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass resource name.",
            )
        }
        if (typeof params === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass params.",
            )
        }

        // Make call.
        Api.setEndpoint(endpoint)
        const { data } = await Api.get(resource, params)

        return data
    }

    Api.getResourcesV2 = async (endpoint, resource, params) => {
        if (typeof endpoint === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass endpoint (multi language) [http://void-v8.dd:8083/en/api/, http://void-v8.dd:8083/fr/api/].",
            )
        }

        if (typeof resource === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass resource name.",
            )
        }
        if (typeof params === "undefined") {
            throw new Error(
                "Api.getResources:  You need to pass params.",
            )
        }

        // Make call.
        Api.setEndpoint(endpoint)
        return Api.get(resource, params)
    }

    Api.setEndpoints(languages.map(lng => {
        return {
            url: `${backendURL}${lng}/api/`,
            locale: lng,
        }
    }))

    FactoryAPI = Api
}

initFactoryAPI()

export { FactoryAPI as default }
