import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonMenuButton,
  IonButtons,
  IonTitle,
  IonSearchbar,
} from '@ionic/react';
import MainMenu from '../components/Menu/menu';
import '../pages/Home.css';

const PageLayout = props => {
  return (
    <>
      <MainMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar color="danger">
            <IonButtons slot="start">
              <IonMenuButton color="light"></IonMenuButton>
            </IonButtons>
            <IonTitle slot="start" className="title-ios" text-capitalize>
              {props.title || 'Page'}
            </IonTitle>
          </IonToolbar>
          <IonToolbar color="dark">
            <IonSearchbar />
          </IonToolbar>
        </IonHeader>
        {props.children}
      </IonPage>
    </>
  );
};

export default PageLayout;
