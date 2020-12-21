import React, { Component } from 'react';
import {
    IonCardContent,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonImg,
    IonMenuButton,
    IonBadge,
    IonRow,
    IonCol,
    IonCard,
    IonButton
} from '@ionic/react';
import './Eventcards.css'


const EventWrapper = ({data}) => {
    return (
        <>
            <IonContent className="ion-content-bg">
                {data.map((event, index) => (
                    <EventCard
                        key={index}
                        image={}
                        name={}
                        date={}
                        tag={}
                    />
                ))}
            </IonContent >
        </>

    );
}


const EventCard = ({image, name, date, tag, buttonLabel = 'Book', price = undefined}) => {

    return (
        <IonCard className="eventcard ion-card-bg eventCardLarge ion-margin-bottom" key={index}>
            <IonImg src={image}></IonImg>
            <IonCardContent>
                <IonRow >
                    <IonCol size="2">
                        <h2 className="month">{date.month}</h2>
                        <h1>{date.day}</h1>
                    </IonCol>
                    <div className="seperator"></div>
                    <IonCol size="7" className="name">
                        <h2 className="black">
                            <strong>{name}</strong>
                        </h2>
                        {/* <h4 className="venue">{event.venues}
                        </h4> */}
                    </IonCol>
                    <IonCol size="2">
                        <IonButton className="btnEvents" >{buttonLabel}</IonButton>
                    </IonCol>
                </IonRow>
                <div className="hor-seperator"></div>
                <IonRow>
                    <IonCol size="6"><IonBadge color="light">{tag}</IonBadge></IonCol>
                    {price !== undefined && <IonCol size="6" className="righttext">₹ {price} </IonCol>}   
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
};
export default Eventcards;
