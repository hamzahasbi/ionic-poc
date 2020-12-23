import React from 'react';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonPage,
    IonMenuButton,
    IonTitle,
    IonSearchbar
} from '@ionic/react';
import MainMenu from "../components/Menu/menu";


const PageLayout = (props) => {

    return (
        <IonPage>
            <MainMenu/>
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
            {props.children}
    </IonPage>
    );
}

export default PageLayout;