import React , {useState} from 'react';
import getMenu from '../../config/menuApi';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonMenuToggle,
    IonIcon,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonLabel, IonMenuButton, useIonViewWillEnter, IonBackButton, IonButton
} from '@ionic/react';

import {apps, camera} from 'ionicons/icons';
import './Menu.css';


const MainMenu = () => {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    useIonViewWillEnter(() => {
        getMenu().main.then(data => {
            setItems(data[0].items)
        }).catch(e => {
            console.log(e)
        })
    }, []);

    const MenuItem = ({label, link, submenu}) => {
        if(submenu !== undefined) {
            // @TODO IsOpen must wrap each top side menu.
            return (
                <IonList>
                    <IonButton button onClick={(e) => (setIsOpen(!isOpen))} detail={true}>
                        <IonIcon slot="start" icon={apps} color='tertiary'></IonIcon>
                        <IonLabel mode='md'> {label} </IonLabel>
                    </IonButton>
                    {isOpen && <MenuList elements={submenu}/>}
                </IonList>
    
            );
        }
        else return (
            <IonMenuToggle>
                <IonItem button routerLink={link} detail={false}>
                    <IonIcon slot="start" icon={camera} color='danger'></IonIcon>
                    <IonLabel mode='md'>{label}</IonLabel>
                </IonItem>
            </IonMenuToggle>
        );
    }
    
    const MenuList = ({elements}) => {
        return(
            <IonList className="ion-margin-vertical"> 
                {elements.map((el, key) => (<MenuItem submenu={el.below} key={key} label={el.title} link={el.url} />))}
            </IonList>
        );
    }
    return (
        <>

            <IonMenu side="start" menuId="first" contentId="main">
                <IonHeader className="head">
                        <div className="enappd-header">
                            <div className="logoImage">
                                Menu
                            </div>
                            <div className="titleHeader">
                                Menu
                            </div>
                        </div>
                    </IonHeader>
                <IonContent >
                    <MenuList elements={items}/>
                </IonContent>
            </IonMenu>
            <IonRouterOutlet id="main"/>
        </>
    );
}

export default MainMenu;
