/*
* Ionic React Capacitor Full App (https://store.enappd.com/product/ionic-react-full-app-capacitor/)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import React, { Component } from 'react';
import {
    IonCardContent,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonListHeader,
    IonIcon,
    IonLabel,
    IonRow,
    IonCol,
    IonSlides,
    IonSlide,
    IonCard
} from '@ionic/react';
import './Sliders.css';
import { trash, star } from 'ionicons/icons'
class Sliders extends Component {
    slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true,
        zoom: false
    };
    slideOpts = {
        effect: 'cube',
        zoom: false
    };
    slideOpts1 = {
        effect: 'cube'
    }
    slideOpts2 = {
        effect: 'fade'
    }
    numbers = Array(6).fill('1');
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    favorites(index: number) {

    }

    render() {
        const FullWidthImageSlider = medicalList.map((item: any) => (
            <IonSlide >
                <IonRow className="product-row">
                    <IonCol size="12">
                        <IonCard className="cardSectionProducts" margin-top>
                            <IonCardContent>
                                <IonRow className="ion-align-items-center">
                                    <div className="heartIconProducts">
                                        <IonIcon slot="end" icon={trash} mode="ios" className=" heartRed "></IonIcon>
                                    </div>
                                    <IonCol size="4">
                                        <img src={item.image} alt="" />
                                    </IonCol>
                                    <IonCol size="8" className="titleProduct pr0">
                                        <IonRow className="textLeftStyle">
                                            <IonCol size="10" className="titleProduct">
                                                <span className="contentText-productsStyle">{item.title}</span>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="10" className="ion-no-padding ion-text-start">
                                                <span className="productTypeText">{item.productType}</span>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow className="rowSectionProducts ion-align-items-center">
                                            <IonCol size="7" className="colSectionProducts ion-no-padding">
                                                <div className="discountSectionProducts">
                                                    <IonLabel text-uppercase>{item.rate}</IonLabel>
                                                    <IonIcon icon={star}></IonIcon>
                                                </div>
                                                <div>
                                                    <span className="salesCountProducts">(124 Review)</span>
                                                </div>
                                            </IonCol>
                                            <IonCol size="5" className="priceParentSectionProducts">
                                                <span className="regularPriceSection">₹{item.regularPrice}</span>
                                                <span className="PriceSectionProd">₹{item.salePrice}</span>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonSlide>
        ))
        const ImageSlider = FullImages.map((item: any) => (
            <IonSlide >
                <IonCard className='widthFullCard'>
                    <div className="imageDiv" style={{
                        backgroundImage: `linear-gradient(0deg,rgba(88, 87, 88, 0.3),rgba(94, 93, 94, 0.3)),url('${item.image}')`
                    }} >
                        <div className="inner">
                            <h1><b>{item.title}</b></h1>
                        </div>
                    </div>
                </IonCard>
            </IonSlide>
        ))

        const Product2XSlider = this.numbers.map((number: any, pi: any) => (
            <IonSlide>
                <IonRow className="ion-margin-bottom ion-margin-top">
                    {medicalList_2[pi].content.map((item: any, si: any) => (
                        <IonCol size="6"  >
                            <IonCard className="cardSection" margin-top>
                                <div className="heartIcon-slider" onClick={() => this.favorites(si)}>
                                    {item.checked ? <IonIcon slot="end" name="heart" className="iconSize heartRed"></IonIcon>
                                        :
                                        <IonIcon slot="end" name="heart" className="iconSize heart "></IonIcon>
                                    }
                                </div>
                                <img src={item.image} alt="" />
                                <IonCardContent>
                                    <IonRow >
                                        <IonCol>
                                            <span className="contentTextSmall">{item.title}</span>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="rowSection ion-align-items-center">
                                        <IonCol size="6" className="colSection">
                                            <div className="discountSection">
                                                <IonLabel text-uppercase>{item.rate}</IonLabel>
                                                <IonIcon icon={star}></IonIcon>
                                            </div>
                                            <div>
                                                <span className="salesCount">(124)</span>
                                            </div>
                                        </IonCol>
                                        <IonCol size="6" className="colSection">
                                            <span className="regularPriceSection">₹{item.regularPrice}</span>
                                            <span className="PriceSection">₹{item.salePrice}</span>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonSlide>
        ))

        const Product3XSlider = this.numbers.map((number: any, pi: any) => (
            <IonSlide   >
                <IonRow className="ion-margin-bottom ion-margin-top">
                    {medicalList_3[pi].content.map((item: any, si: any) => (
                        <IonCol size="4"  >
                            <IonCard className="cardSection" margin-top>
                                <div className="heartIcon-slider" onClick={() => this.favorites(si)}>
                                    {item.checked ? <IonIcon slot="end" name="heart" className="iconSize heartRed"></IonIcon>
                                        :
                                        <IonIcon slot="end" name="heart" className="iconSize heart "></IonIcon>
                                    }
                                </div>
                                <img src={item.image} alt="" />
                                <IonCardContent>
                                    <IonRow>
                                        <IonCol>
                                            <span className="contentTextSmall">{item.title}</span>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="rowSection">
                                        <IonCol size="12" className="colSection">
                                            <div className="discountSection">
                                                <IonLabel text-uppercase>{item.rate}</IonLabel>
                                                <IonIcon icon={star}></IonIcon>
                                            </div>
                                            <div>
                                                <span className="salesCount">(124)</span>
                                            </div>
                                        </IonCol>
                                        <IonCol size="12" className="colSection">
                                            <span className="regularPriceSection">₹{item.regularPrice}</span>
                                            <span className="PriceSection">₹{item.salePrice}</span>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonSlide>
        ))

        return (
            <>
                <Menu />
                <IonPage id="main">
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonButtons slot="start">
                                <IonMenuButton color="light"></IonMenuButton>
                            </IonButtons>
                            <IonTitle slot="start" className="title-ios" text-capitalize>Multiple Sliders</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="content-bg">
                        <IonListHeader>
                            <IonLabel>Full Width Card Slider</IonLabel>
                        </IonListHeader>
                        <IonSlides pager={true} className="sliderSection" options={this.slideOpts}>
                            {FullWidthImageSlider}
                        </IonSlides>
                        <IonListHeader>
                            <IonLabel>Image Card Slider</IonLabel>
                        </IonListHeader>
                        <IonSlides pager options={this.slideOpts}>
                            {ImageSlider}
                        </IonSlides>
                        <IonListHeader>
                            <IonLabel>Product Slider 2X</IonLabel>
                        </IonListHeader>
                        <IonSlides pager options={this.slideOpts} >
                            {Product2XSlider}
                        </IonSlides>
                        <IonListHeader>
                            <IonLabel>Product Slider 3X</IonLabel>
                        </IonListHeader>
                        <IonSlides pager options={this.slideOpts} >
                            {Product3XSlider}
                        </IonSlides>
                    </IonContent>
                </IonPage >
            </>
        );
    }
}

export default Sliders;
