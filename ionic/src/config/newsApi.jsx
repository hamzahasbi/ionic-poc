import FactoryAPI, { initFactoryAPI } from './api';
import dayjs from 'dayjs';

initFactoryAPI();

export const COUR_TYPE = {
  EN_REPLAY: 0,
  EN_COURS: 1,
  A_VENIR: 2,
};

export const getThematique = language => {
  const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
    return locale.locale === language;
  })['url'];

  return FactoryAPI.getResourcesV2(
    endpointUrl,
    'taxonomy_term/vactory_news_theme',
    {
      fields: {
        'taxonomy_term--vactory_news_theme': 'drupal_internal__tid,name',
      },
    },
  );
};
export const getNewsNodes = (language, selectedTerm, selectedYear, offset) => {
  // need to passe local to every page too.
  const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
    return locale.locale === language;
  })['url'];

  let categoryFilter = {
    'filter[taxonomy_term--vactory_news_theme][condition][path]':
      'field_vactory_news_theme.drupal_internal__tid',
    'filter[taxonomy_term--vactory_news_theme][condition][operator]': '=',
    'filter[taxonomy_term--vactory_news_theme][condition][value]': selectedTerm,
  };

  if (selectedTerm === 'all') {
    categoryFilter = {};
  }

  let dateFilter = {};
  if (selectedYear !== 'all') {
    dateFilter = {
      'filter[datestart][condition][path]': 'created',
      'filter[datestart][condition][operator]': '>=',
      'filter[datestart][condition][value]': dayjs([selectedYear]).unix(),
      'filter[dateend][condition][path]': 'created',
      'filter[dateend][condition][operator]': '<=',
      'filter[dateend][condition][value]': dayjs([selectedYear])
        .add(12, 'months')
        .unix(),
    };
  }

  return FactoryAPI.getResourcesV2(endpointUrl, 'node/vactory_news', {
    page: {
      limit: 10,
      offset: offset,
    },
    sort: '-created',
    // do not use filter param directly.
    // bypass paramsSerializer
    // https://www.npmjs.com/package/qs
    ...categoryFilter,
    ...dateFilter,
    fields: {
      'node--vactory_news':
        'drupal_internal__nid,langcode,title,path,created,field_vactory_excerpt,field_vactory_media,field_vactory_news_theme',
      'file--image': 'uri',
      'taxonomy_term--vactory_news_theme': 'name',
    },
    include:
      'field_vactory_media,field_vactory_media.thumbnail,field_vactory_news_theme',
  });
};

export const getNewsById = (id, language) => {
  const endpointUrl = FactoryAPI.getEndpoints().find(locale => {
    return locale.locale === language;
  })['url'];

  const filterId = {
    'filter[drupal_internal__nid][condition][path]': 'drupal_internal__nid',
    'filter[drupal_internal__nid][condition][operator]': '=',
    'filter[drupal_internal__nid][condition][value]': id,
  };
  return FactoryAPI.getResourcesV2(endpointUrl, 'node/vactory_news', {
    // do not use filter param directly.
    // bypass paramsSerializer
    // https://www.npmjs.com/package/qs
    ...filterId,
    fields: {
      'node--vactory_news':
        'drupal_internal__nid,langcode,title,path,metatag_normalized,created,field_vactory_excerpt,field_vactory_media,field_vactory_news_theme,body,node_banner_image,node_banner_mobile_image,node_banner_title,node_banner_icon,node_banner_hide_title,node_banner_hide_icon,field_contenu_lie,node_parallax,node_class',
      'file--image': 'uri',
      'taxonomy_term--vactory_news_theme': 'name',
    },
    include:
      'field_vactory_media,field_vactory_media.thumbnail,field_vactory_news_theme,node_banner_image,node_banner_mobile_image,node_banner_image.thumbnail,node_banner_mobile_image.thumbnail',
  });
};
