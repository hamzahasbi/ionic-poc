import React, {useState} from 'react';
import {MasonryMoc} from '../config/mocData';
import {
    IonContent,
} from '@ionic/react';
import Loader from '../components/Loader/Loader';
import MasonryWrapper from '../components/Masonry/MasonryGrid';
import PageLayout from '../layout/PageLayout';

const MasonryListing = ({match}) => {

    const [isLoading, setIsLoading] = useState(false);
    return (
        <PageLayout title={"Masonry Listing"}>

            <IonContent fullscreen>
                {isLoading && <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading} message={"Chargement..."}/>
                }
                {!isLoading && <MasonryWrapper data={MasonryMoc} />}
            </IonContent>
        </PageLayout>
    );
}

export default MasonryListing;