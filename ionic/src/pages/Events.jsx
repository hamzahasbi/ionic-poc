import React, {useState} from 'react';
import {events} from '../config/mocData';
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
import PageLayout from '../layout/PageLayout';


const ListingEvents = () => {

    const [isLoading, setIsLoading] = useState(false);
    return (
        <PageLayout title={"Evenements"}>
            
            <IonContent fullscreen>
                {isLoading && <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading} message={"Chargement..."}/>
                }
                {!isLoading && <EventWrapper data={events} />}
            </IonContent>
        </PageLayout>
    );
}

export default ListingEvents;