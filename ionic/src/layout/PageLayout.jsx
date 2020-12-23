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

const PageLayout = () => {

    return (
        <IonPage>
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
                {children}
            </IonContent>
    </IonPage>
    );
}

export default PageLayout;