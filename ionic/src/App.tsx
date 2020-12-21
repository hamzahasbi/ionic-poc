import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Academy from './pages/Academy';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainMenu from "./components/Menu/menu";
import NodeAcademy from "./pages/node-academy";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/:lang/home" render={(props:any) => <Home {...props} />} exact={true} />
        <Route path="/:lang/academy" render={(props:any) => <Academy {...props} />} exact={true} />
        <Route path="/:lang/academy/:id" render={(props:any) => <NodeAcademy {...props} language='fr'  />} />
        <Route exact path="/" render={() => <Redirect to="/fr/academy" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;