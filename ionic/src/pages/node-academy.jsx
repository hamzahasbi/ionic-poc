import React, {useState, useEffect} from 'react';
import {
    useIonViewWillEnter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonSearchbar, IonContent, IonPage, IonGrid, IonRow, IonCol
} from "@ionic/react";
import {getAcademyById} from "../config/academyApi";
import MainMenu from "../components/Menu/menu";
import Loader from "../components/Loader";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import getNestedValue from "get-nested-value";
import YoutubeContainer from '../components/YoutubePlayer/YoutubeContainer';


const NodeAcademy = ({match}) => {
    const [item, setItem] = useState({});
    const {lang, id} = match.params;
    const [isLoading, setIsLoading] = useState(true);

    useIonViewWillEnter(() => {
        getAcademyById(id, lang).then(data => {
            setItem(data.data[0]);
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
        });
    });

    return (
        <IonPage>
            {/*<MainMenu/>*/}
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">
                        <IonMenuButton menu="first" autoHide={false}/>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {isLoading && <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading} message={"Chargement..."}/>
                }
                {!isLoading && <AcademyDetail node={item}/>}
            </IonContent>
        </IonPage>
    );
}

const AcademyDetail = ({node}) => {

    const disqusIdentifier = node.field_nid ? `node/${node.field_nid}` : `node/${node.drupal_internal__nid}`;
    const videoURL = getNestedValue("field_vactory_youtube_videos", node);
    const avatarURL = getNestedValue("internal_user.field_vactory_instructor.picture._default", node);
    const documentURL = getNestedValue("field_vactory_file.uri.value._default", node);

    const authorFirstName = getNestedValue("internal_user.field_vactory_instructor.first_name", node);
    const authorLastName = getNestedValue("internal_user.field_vactory_instructor.last_name", node);
    const thematique = getNestedValue("field_vactory_theme.name", node);
    const excerpt = getNestedValue("field_vactory_excerpt.processed", node);
    const author_about = getNestedValue("internal_user.field_vactory_instructor.about.0.value", node);
    const meta_tags = getNestedValue("metatag_normalized", node);
    const academy_title = getNestedValue("title", node);

    const authorName = authorFirstName + " " + authorLastName;
    const useDisqus = getNestedValue("field_utiliser_disqus", node) !== true;
    const video = YoutubeVideoPlayer.openVideo(videoURL);
    console.log(video);

    return (
        <IonGrid>
            <YoutubeContainer video={videoURL}/>
            <IonRow>
                <IonCol size="6" className="ion-align-items-center">
                </IonCol>
                <IonCol size="6" className="ion-align-items-center">
                    Col 2
                </IonCol>
            </IonRow>
        </IonGrid>
        );
}

export default NodeAcademy;
