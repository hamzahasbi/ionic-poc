import React, { useState } from 'react';
import {
  IonMenu,
  IonHeader,
  IonMenuToggle,
  IonIcon,
  IonImg,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonLabel,
  IonButton,
} from '@ionic/react';
import { withRouter } from 'react-router-dom';
import { apps, camera } from 'ionicons/icons';
import './Menu.css';
import { MenuData } from '../../config/mocData';
import logo from '../../assets/icon/logoDam.png';

const MainMenu = () => {
  const items = MenuData;
  const [isOpen, setIsOpen] = useState(false);

  const MenuItem = ({ label, link, submenu }) => {
    if (submenu !== undefined) {
      // @TODO IsOpen must wrap each top side menu.
      return (
        <IonList>
          <IonButton button onClick={e => setIsOpen(!isOpen)} detail={true}>
            <IonIcon slot="start" icon={apps} color="tertiary"></IonIcon>
            <IonLabel mode="md"> {label} </IonLabel>
          </IonButton>
          {isOpen && <MenuList elements={submenu} />}
        </IonList>
      );
    } else
      return (
        <IonMenuToggle>
          <IonItem button routerLink={link} detail={false}>
            <IonIcon slot="start" icon={camera} color="danger"></IonIcon>
            <IonLabel mode="md">{label}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      );
  };

  const MenuList = ({ elements }) => {
    return (
      <IonList className="ion-margin-vertical">
        {elements.map((el, key) => (
          <MenuItem
            submenu={el.below}
            key={key}
            label={el.title}
            link={el.url}
          />
        ))}
      </IonList>
    );
  };
  return (
    <>
      <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader className="head">
          <div className="enappd-header">
            <div className="logoImage">
              <IonImg src={logo}></IonImg>
            </div>
            <div className="titleHeader">Mobile Factory</div>
          </div>
        </IonHeader>
        <IonContent>
          <MenuList elements={items} />
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main" />
    </>
  );
};

export default withRouter(MainMenu);
