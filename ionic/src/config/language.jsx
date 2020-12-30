import { Globalization } from '@ionic-native/globalization';
import { isPlatform } from '@ionic/react';


export const GetLocale = async () => {
    let langcode = 'en-US';
    if (isPlatform('cordova') || isPlatform('capacitor')) {
        langcode = (await Globalization.getPreferredLanguage()).value;
    } else {
        langcode = navigator.language; // web.
    }
    return langcode;
}

// const finalLang = await GetLocale();
// navigator.globalization.getPreferredLanguage(
//     function (language) {alert('language: ' + language.value + '\n');},
//     function () {alert('Error getting language\n');}
// );
