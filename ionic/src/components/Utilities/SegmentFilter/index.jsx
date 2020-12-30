import {
    IonLabel,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';
import React from 'react';
import '../../../pages/Home.css';

const SegmentFilter = ({buttons}) => {
    return (
        <section>
            <header> {"Tous Les cours"} </header>
            <IonSegment scrollable swipeGesture onIonChange={e => handleChangeType(e.detail.value)}>
                {buttons.map(element => {
                    return (
                        <IonSegmentButton
                            key={element.id} size="small"
                            // color="dark" shape="round"
                            value={element.id}
                        >
                            <IonLabel>
                                {element.label}
                            </IonLabel>
                        </IonSegmentButton>
                    );
                })}
            </IonSegment>

        </section>
    );
}

export default SegmentFilter;