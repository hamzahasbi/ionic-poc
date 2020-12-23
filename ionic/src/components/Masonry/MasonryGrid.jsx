/*
* Ionic React Capacitor Full App (https://store.enappd.com/product/ionic-react-full-app-capacitor/)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import React from 'react';
import {
    IonContent,
    IonCardHeader,
    IonImg,
    IonRow,
    IonCol,
    IonCard
} from '@ionic/react';
import './MasontyGrid.css';


export const MasonryWrapper = ({data}) => {

    const [chunk1, chunk2] = [data.slice(0, data.length / 2), data.slice(data.length / 2)];
    console.log(chunk1);
    return (
        <IonContent>
            <IonRow>
                <IonCol size="6">
                    {chunk1.map((item, index) => (
                        <MasonryElement key={index} image={item.image} title={item.title}/>
                    ))}
                </IonCol>
                <IonCol size="6">
                    {chunk2.map((item, index) => (
                        <MasonryElement key={index} image={item.image} title={item.title}/>
                    ))}
                </IonCol>
            </IonRow>

        </IonContent>
    );
}


const MasonryElement = ({image, title}) => {
    return(
        <IonCard className="card-css ion-no-margin">
            <IonCardHeader className='customBackground'>
                <IonImg src={image}></IonImg>
                <p className="card-title">{title}</p>
            </IonCardHeader>
        </IonCard>
    );

};
export default MasonryWrapper;
