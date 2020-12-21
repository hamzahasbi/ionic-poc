import React from 'react';
import {
    IonItem,
    IonAvatar,
    IonLabel,
    IonSkeletonText,
    IonListHeader,
    IonList, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonCard, IonItemDivider, IonThumbnail
} from '@ionic/react';
import '../pages/Home.css';
import sanitizeHtml from "sanitize-html";
import instructor from "../assets/icon/instructor.svg";

export const SkeletonList = () => {
    return (
        <>
            <IonList>
                <IonListHeader>
                    <IonLabel>
                        <IonSkeletonText animated style={{ width: '20%' }} />
                    </IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonAvatar slot="start">
                        <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                        <h3>
                            <IonSkeletonText animated style={{ width: '50%' }} />
                        </h3>
                        <p>
                            <IonSkeletonText animated style={{ width: '80%' }} />
                        </p>
                        <p>
                            <IonSkeletonText animated style={{ width: '60%' }} />
                        </p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonAvatar slot="start">
                        <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                        <h3>
                            <IonSkeletonText animated style={{ width: '50%' }} />
                        </h3>
                        <p>
                            <IonSkeletonText animated style={{ width: '80%' }} />
                        </p>
                        <p>
                            <IonSkeletonText animated style={{ width: '60%' }} />
                        </p>
                    </IonLabel>
                </IonItem>

            </IonList>
        </>
    );
}

export const SkeletonCard = () => {
    return (
        <>
            <IonList>
                <IonItemDivider >
                    <IonItem>
                        <IonCard >
                            <IonCardHeader>
                                <IonSkeletonText animated style={{ width: '60%' }} />
                            </IonCardHeader>

                            <IonCardContent >
                                <IonText>
                                    <p>
                                        <IonSkeletonText animated style={{ width: '80%' }} />
                                    </p>
                                </IonText>
                                <IonItem>
                                    <IonThumbnail slot="start">
                                        <IonSkeletonText animated />
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h2><IonSkeletonText animated style={{ width: '40%' }} /></h2>
                                    </IonLabel>
                                </IonItem>

                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                </IonItemDivider>

                <IonItemDivider>
                    <IonItem>
                        <IonCard >
                            <IonCardHeader>
                                <IonSkeletonText animated style={{ width: '60%' }} />
                            </IonCardHeader>


                            <IonCardContent >
                                <IonText>
                                    <p>
                                        <IonSkeletonText animated style={{ width: '80%' }} />
                                    </p>
                                </IonText>
                                <IonItem>
                                    <IonThumbnail slot="start">
                                        <IonSkeletonText animated />
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h2><IonSkeletonText animated style={{ width: '40%' }} /></h2>
                                    </IonLabel>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                </IonItemDivider>
            </IonList>
        </>
    );
}
