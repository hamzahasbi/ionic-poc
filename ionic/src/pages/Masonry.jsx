import React, {useState} from 'react';
import {MasonryMoc} from '../config/mocData';
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
import MasonryWrapper from '../components/Masonry/MasonryGrid';

const MasonryListing = ({match}) => {

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
                {!isLoading && <MasonryWrapper data={MasonryMoc} />}
            </IonContent>
    </IonPage>
    );
}

export default MasonryListing;