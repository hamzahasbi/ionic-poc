/*
 * Ionic React Capacitor Full App (https://store.enappd.com/product/ionic-react-full-app-capacitor/)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonListHeader,
  IonIcon,
  IonCard,
  IonLabel,
  useIonViewWillEnter,
} from '@ionic/react';
import './CardSlider.css';
import { pin } from 'ionicons/icons';

const CardSliderWrapper = () => {
  const [items, setItems] = useState([]);

  return (
    <IonContent className="content-bg">
      <div className="overlay-content">
        <div className="bhk1">
          <IonListHeader lines="full">
            {' '}
            <IonLabel>{'title'} flats & apartments </IonLabel>
          </IonListHeader>
          <div className="scrl">
            {items.data.map(article => (
              <CardSlider item={article} />
            ))}
          </div>
        </div>
      </div>
    </IonContent>
  );
};

const CardSlider = ({ item }) => {
  return (
    <IonCard
      className="card-item"
      style={{
        backgroundImage: 'url(' + item.url + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay">
        <div className="bottom-content">
          <h2 className="price-card-slider">{item.price}</h2>
          <h4 className="ion-no-margin">{item.name}</h4>
          <h6 className="ion-no-margin">
            {item.status}
            <IonIcon icon={pin} className="iconStyle"></IonIcon>
          </h6>
        </div>
      </div>
    </IonCard>
  );
};
export default CardSliderWrapper;
