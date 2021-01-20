import React from 'react';
import {
  IonCardContent,
  IonContent,
  IonCardTitle,
  IonImg,
  IonText,
  IonBadge,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
} from '@ionic/react';
import './CardInline.css';
import sanitizeHtml from 'sanitize-html';
import getNestedValue from 'get-nested-value';
import logo from '../../assets/icon/logoDam.png';

const CardInlineWrapper = ({ items }) => {
  return (
    <IonContent className="content-bg">
      <IonGrid>
        <IonRow>
          {items.map((data, index) => {
            return <CardInline data={data} key={index} />;
          })}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const CardInline = ({ data, ...rest }) => {
  const image = getNestedValue(
    'field_vactory_media.data.field_media_image.data.uri.value._default',
    data,
  );
  const thematique = getNestedValue('field_vactory_news_theme.data.name', data);

  return (
    <IonCol size="12">
      <IonCard className="card-shop ion-no-margin" routerLink={'#'}>
        {thematique ? (
          <IonBadge className="badge">{thematique}</IonBadge>
        ) : null}
        {image ? (
          <img src={image} alt={data.title} />
        ) : (
          <IonImg src={logo} alt={data.title} />
        )}
        <IonCardContent>
          <IonCardTitle>
            <IonRow>
              <IonCol size="12" className="ion-no-padding">
                <h6 className="subtitle ion-text-left">{data.title}</h6>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-no-padding ion-text-left">
                <p
                  className="ion-text-left"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(data.field_vactory_excerpt.value),
                  }}
                />
              </IonCol>
            </IonRow>
          </IonCardTitle>
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
};

export default CardInlineWrapper;
