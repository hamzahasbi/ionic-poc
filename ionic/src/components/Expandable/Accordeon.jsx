import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonImg,
    IonAvatar,
    IonButton,
    IonList,
} from '@ionic/react';
import './ExpandableList.css'

import { caretDown, caretUp } from 'ionicons/icons';
import sanitizeHtml from "sanitize-html";
import instructor from "../../assets/icon/instructor.svg"


const AccordeonWrapper = ({data}) => {

    const [shownGroup, setShownGroup] = useState(0);
    const isGroupShown = (group) => {
        return shownGroup === group;
    };
    const toggleGroup = (group) => {
        if (isGroupShown(group)) {
            setShownGroup(true);
        } else {
            setShownGroup(group);
        }
    };

    return (
        <div className="ion-padding">
            <IonList className="accordionList" lines="none">
                {data.map((item, i) => {
                    const author = {
                        description: item.internal_user.field_vactory_instructor.about[0].value,
                        name: `${item.internal_user.field_vactory_instructor.first_name} ${item.internal_user.field_vactory_instructor.last_name}`,
                        profession: item.internal_user.field_vactory_instructor.profession,
                        picture: item.internal_user.field_vactory_instructor.picture,
                    };
                    return (
                        <IonLabel key={i} className='ion-no-padding LAbelHeightExpandable'>
                            <IonButton expand="full" slot="start" onClick={() => toggleGroup(i)}>
                                <IonLabel className="btn-title">{item.title}</IonLabel>
                                <IonIcon slot="end" className='endItem' icon={isGroupShown(i) ? `${caretDown}` : `${caretUp}`}></IonIcon>
                            </IonButton>
                            {isGroupShown(i) &&
                                <AccordeonItem className='accordionList ion-margin-top'
                                    author={author}
                                    title={item.title}
                                    description={item.field_vactory_excerpt.value}
                                    url={`/${item.langcode}/academy/${item.drupal_internal__nid}`}
                                    image={author.picture !== null ? author.picture._default : undefined}
                                />
                            }
                        </IonLabel>
                    );
                })}

            </IonList>
        </div>
    );
}

export const AccordeonItem = ({title, url, description, author, image = undefined}) => {
    return (
        <IonItem className="listItem" button routerLink={url}>
                    <IonAvatar className="avatarImgExpand">
                        <IonImg src={image === undefined ? instructor : image} />
                    </IonAvatar>
                    <div className="titleCard ion-padding-horizontal" >
                        <h4 className="black">
                            <b>{author.name}</b>
                        </h4>
                        <h6 className="black"> {author.profession}</h6>
                        <p className="black" dangerouslySetInnerHTML={{__html: sanitizeHtml(description)}} />
                    </div>
        </IonItem>
    );
}

export default AccordeonWrapper;