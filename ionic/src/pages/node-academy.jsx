import React, {useState, useEffect} from 'react';
import {
    useIonViewWillEnter,
    IonLabel,
    IonText,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonSearchbar, IonContent, IonPage, IonGrid, IonRow, IonCol
} from "@ionic/react";
import sanitizeHtml from "sanitize-html";
import {getAcademyById} from "../config/academyApi";
import MainMenu from "../components/Menu/menu";
import Loader from "../components/Loader/Loader";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import getNestedValue from "get-nested-value";
import YoutubePlayer from '../components/YoutubePlayer/YoutubePlayer'
import PageLayout from '../layout/PageLayout'; 

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
        <PageLayout>
            <IonContent fullscreen>
                {isLoading && <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading} message={"Chargement..."}/>
                }
                {!isLoading && <AcademyDetail node={item}/>}
            </IonContent>
        </PageLayout>

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
    const academy_title = getNestedValue("title", node);

    const authorName = authorFirstName + " " + authorLastName;
    const useDisqus = getNestedValue("field_utiliser_disqus", node) !== true;

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" className="ion-align-items-center">
                    <IonLabel className="detail-label">
                        <h1>{academy_title}</h1>
                        <h4>{authorName}</h4>
                        <p color='dark' dangerouslySetInnerHTML={{__html: sanitizeHtml(author_about)}}>{}</p>
                        <p dangerouslySetInnerHTML={{__html: sanitizeHtml(excerpt)}}/>
                    </IonLabel>
                    <YoutubePlayer videoId={videoURL}/>
                </IonCol>
            </IonRow>
        </IonGrid>
        );
}

export default NodeAcademy;
