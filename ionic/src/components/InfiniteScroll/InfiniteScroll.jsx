import React from 'react';
import {IonInfiniteScroll, IonInfiniteScrollContent} from "@ionic/react";

function searchNext(event, callback) {
    callback();
    event.target.complete();
}

const InfiniteScroll = ({disabled, callback, loadingText}) => {
    return (
        <IonInfiniteScroll threshold="100px"
                           disabled={disabled}
                           onIonInfinite={e => searchNext(e, callback)}>
            <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText={loadingText}>
            </IonInfiniteScrollContent>
        </IonInfiniteScroll>
    );
}

export default InfiniteScroll;
