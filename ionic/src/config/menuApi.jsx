import React from "react"
import FactoryAPI, {initFactoryAPI} from "./api";


initFactoryAPI();
const axios = FactoryAPI.getAxios()

export default function getMenu () {
    const menu = Promise.all(FactoryAPI.getEndpoints().map(async ({ url, locale }) => {
        const request_url = url.replace("/api/", "/_menus") + "?menu_name=main"
        try {
            const { data: { items } } = await axios.get(request_url)
            return {
                locale,
                items,
            };
        } catch (error) {
            console.error(error);
        }
    }))

    const footerSitesMenu =  Promise.all(FactoryAPI.getEndpoints().map(async ({ url, locale }) => {
        const request_url = url.replace("/api/", "/_menus") + "?menu_name=footer-sites"
        try {
            const { data: { items } } = await axios.get(request_url)
            return {
                locale,
                items,
            };
        } catch (error) {
            console.error(error);
        }
    }))

    const footerContactMenu = Promise.all(FactoryAPI.getEndpoints().map(async ({ url, locale }) => {
        const request_url = url.replace("/api/", "/_menus") + "?menu_name=footer-contact"
        try {
            const { data: { items } } = await axios.get(request_url)
            return {
                locale,
                items,
            }
        } catch (error) {
            console.error(error);
        }
    }))

    const accountMenu = Promise.all(FactoryAPI.getEndpoints().map(async ({ url, locale }) => {
        const request_url = url.replace("/api/", "/_menus") + "?menu_name=account-menu"
        try {
            const { data: { items } } = await axios.get(request_url)
            return {
                locale,
                items,
            }
        } catch (error) {
            console.error(error);
        }
    }))
    return {
        'main' : menu,
        'footerSitesMenu' : footerSitesMenu,
        'footerContactMenu' : footerContactMenu,
        'accountMenu' : accountMenu,
    };
}
