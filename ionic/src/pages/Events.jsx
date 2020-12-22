import React, {useState} from 'react';
import {events} from '../components/Events/mocData';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonPage,
    IonMenuButton,
    IonTitle,
    IonSearchbar
} from '@ionic/react';
import Loader from '../components/Loader/Loader';
import EventWrapper from '../components/Events/Eventcards';

const ListingEvents = () => {

    const [isLoading, setIsLoading] = useState(false);
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
                {isLoading && <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading} message={"Chargement..."}/>
                }
                {!isLoading && <EventWrapper data={events} />}
            </IonContent>
    </IonPage>
    );
}

export default ListingEvents;