import {
    IonThumbnail,
    IonItem,
    IonLabel,
    IonList,
    IonItemDivider,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRippleEffect,
    useIonViewWillEnter,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';
import React from 'react';
import './cards.css';
import sanitizeHtml from "sanitize-html";
import instructor from "../../../assets/icon/instructor.svg";



export const CardWrapper = ({data}) => {
    return (
      <IonList>
          { data.map((item) => {
              const author = {
                  description: item.internal_user.field_vactory_instructor.about[0].value,
                  name: `${item.internal_user.field_vactory_instructor.first_name} ${item.internal_user.field_vactory_instructor.last_name}`,
                  profession: item.internal_user.field_vactory_instructor.profession,
                  picture: item.internal_user.field_vactory_instructor.picture,
              };
              return (
                  <IonItemDivider  key={item.drupal_internal__nid}>
                      <CardAcademy author={author}
                                   title={item.title}
                                   description={item.field_vactory_excerpt.value}
                                   url={`/${item.langcode}/academy/${item.drupal_internal__nid}`}
                                   image={author.picture !== null ? author.picture._default : undefined}
                      />
                  </IonItemDivider>
              )
          })}
      </IonList>
      )
};

export const CardAcademy = ({title, url, description, author, image = undefined}) => {
    return (
            <IonCard button={true} href={url}>
                <IonCardHeader>
                    {/*<IonCardSubtitle>Card Subtitle</IonCardSubtitle>*/}
                    <IonCardTitle>{title}</IonCardTitle>
                </IonCardHeader>


                <IonCardContent >
                    <IonText>
                        <p dangerouslySetInnerHTML={{__html: sanitizeHtml(description)}}/>
                    </IonText>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <img src={image === undefined ? instructor : image} alt="instructor thumbnail"/>
                        </IonThumbnail>
                        <IonLabel>
                            <h2>{author.name}</h2>
                        </IonLabel>
                    </IonItem>

                </IonCardContent>
            </IonCard>

    );
}
