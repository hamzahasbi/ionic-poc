import React from 'react';
import {IonLoading} from "@ionic/react";


const Loader =  ({callback, isOpen, message}) => {
    return (
        <IonLoading
            cssClass='custom-loader'
            isOpen={isOpen}
            onDidDismiss={callback}
            translucent={true}
            message={message}
            duration={10000}
        />
    );
}
export default Loader;
