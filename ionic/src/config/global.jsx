let GlobalConfig = {
    // frontendURL: process.env.GATSBY_FRONTEND_URL,
    frontendURL: `http://localhost:3000/`,
    // backendURL: process.env.GATSBY_BACKEND_URL,
    backendURL: "https://backend.daralmoukawil.com/",
    // backendURL: "http://dam-new.dd:8083/",
    languages: {
        defaultLanguage: "fr",
        languages: ["fr", "ar"],
        locales: ["fr-FR", "ar-MA"],
        languageLabels: [
            {
                code: "fr",
                label: "Français",
            },
            {
                code: "ar",
                label: "العربية",
            },
        ],
        languageIcon: {
            "fr-FR": "🇧🇷",
            "en-US": "🇺🇸",
        },
    },
    // DISQUS_SHORTNAME: 'admdam',
    // gmapAPIKey: process.env.GATSBY_GMAP_KEY,
    // recaptchaAPIKey: process.env.GATSBY_RECAPTCHA_KEY,
    // notification: {
    //     publicKey: process.env.GATSBY_PUSH_NOTIFICATION_KEY,
    //     subscribeEndpoint: `${process.env.GATSBY_BACKEND_URL}push_notifications_subscribe`,
    // },
    api: {
        authorization: null
    }
}
export default GlobalConfig;
