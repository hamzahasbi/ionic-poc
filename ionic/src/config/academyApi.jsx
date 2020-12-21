import React from "react"
import FactoryAPI, {initFactoryAPI} from "./api";

initFactoryAPI();

export const COUR_TYPE = {
    EN_REPLAY: 0,
    EN_COURS: 1,
    A_VENIR: 2,
}

export const getAcademyTerms = (language) => {
    const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
        return locale.locale === language;
    })["url"];

    return FactoryAPI.getResourcesV2(endpointUrl, "taxonomy_term/vactory_academy_themes", {
        fields: {
            "taxonomy_term--vactory_academy_themes": "drupal_internal__tid,name",
        },
    })

}
export const getAcademyNodes = (selectedType, selectedTerm, offset, language) => {
    const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
        return locale.locale === language;
    })["url"];

    let categoryFilter = {
        "filter[taxonomy_term--vactory_academy_themes][condition][path]": "field_vactory_theme.drupal_internal__tid",
        "filter[taxonomy_term--vactory_academy_themes][condition][operator]": "=",
        "filter[taxonomy_term--vactory_academy_themes][condition][value]": selectedTerm,
    }

    if (selectedTerm === "all") {
        categoryFilter = {}
    }

    const currentDate = new Date().toISOString()
    let dateFilter = {}

    // En replay.
    if (parseInt(selectedType) === parseInt(COUR_TYPE.EN_REPLAY)) {
        dateFilter = {
            "filter[date_end][condition][path]": "field_date_et_heure.end_value",
            "filter[date_end][condition][operator]": "<",
            "filter[date_end][condition][value]": currentDate,
        }
    }
    // A venir.
    else if (parseInt(selectedType) === parseInt(COUR_TYPE.A_VENIR)) {
        dateFilter = {
            "filter[date_start][condition][path]": "field_date_et_heure.value",
            "filter[date_start][condition][operator]": ">",
            "filter[date_start][condition][value]": currentDate,
        }
    }
    // En cours.
    else if (parseInt(selectedType) === parseInt(COUR_TYPE.EN_COURS)) {
        dateFilter = {
            "filter[date_start][condition][path]": "field_date_et_heure.value",
            "filter[date_start][condition][operator]": "<=",
            "filter[date_start][condition][value]": currentDate,
            "filter[date_end][condition][path]": "field_date_et_heure.end_value",
            "filter[date_end][condition][operator]": ">=",
            "filter[date_end][condition][value]": currentDate,
        }
    }

    return FactoryAPI.getResourcesV2(endpointUrl, "node/vactory_academy", {
        page: {
            limit: 10,
            offset: offset,
        },
        sort: "-created",
        // do not use filter param directly.
        // bypass paramsSerializer
        // https://www.npmjs.com/package/qs
        ...categoryFilter,
        ...dateFilter,
        fields: {
            "node--vactory_academy": "drupal_internal__nid,internal_user,langcode,title,path,field_vactory_date,field_vactory_excerpt,field_vactory_theme",
            "user--user": "field_about_the_author,field_first_name,field_last_name,field_user_profession,user_picture",
            "file--image": "uri",
            "taxonomy_term--vactory_academy_themes": "name",
        },
        include: "field_vactory_theme",
    });

}

export const getAcademyById = (id, language) => {
    const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
        return locale.locale === language;
    })["url"];

    const filterId = {
        "filter[drupal_internal__nid][condition][path]": "drupal_internal__nid",
        "filter[drupal_internal__nid][condition][operator]": "=",
        "filter[drupal_internal__nid][condition][value]": id,
    }
    return FactoryAPI.getResourcesV2(endpointUrl, "node/vactory_academy", {
        // do not use filter param directly.
        // bypass paramsSerializer
        // https://www.npmjs.com/package/qs
        ...filterId,
        fields: {
            "node--vactory_academy": "drupal_internal__nid,internal_user,langcode,title,path,metatag_normalized,field_vactory_paragraphs,field_vactory_date,field_vactory_excerpt,field_vactory_youtube_videos,field_vactory_file,field_vactory_theme,node_banner_image,node_banner_mobile_image,node_banner_title,node_banner_icon,node_banner_hide_title,node_banner_hide_icon,field_contenu_lie,node_parallax,node_class,field_nid,field_utiliser_disqus",
            "paragraph--vactory_component": "drupal_internal__id,paragraph_identifier,paragraph_container,paragraph_css_class,paragraph_background_color,paragraph_background_parallax,paragraph_background_image,field_titre_ancre,field_vactory_component,field_vactory_flag,field_vactory_flag_2,field_vactory_title",
            // "user--user": "field_about_the_author,field_first_name,field_last_name,field_user_profession,user_picture",
            "file--image": "uri",
            "file--document": "uri,filename,filesize,filemime",
            "taxonomy_term--vactory_academy_themes": "name",
        },
        include: "field_vactory_paragraphs,field_vactory_paragraphs.paragraph_background_image,field_vactory_paragraphs.paragraph_background_image.thumbnail,field_vactory_file,field_vactory_theme,node_banner_image,node_banner_mobile_image,node_banner_image.thumbnail,node_banner_mobile_image.thumbnail",
    });
}
