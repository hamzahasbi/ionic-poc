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
import AcademyCards from "./pages/academy-cards";
import NodeAcademy from "./pages/node-academy";
import ListingEvents from "./pages/Events";
import MasonryListing from "./pages/Masonry";
import PageLayout from './layout/PageLayout';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <PageLayout>
      <IonRouterOutlet>
        <Route path="/:lang/home" render={(props:any) => <Home {...props} />} exact={true} />
        <Route path="/:lang/academy" render={(props:any) => <Academy {...props} />} exact={true} />
        <Route path="/:lang/academy-cards" render={(props:any) => <AcademyCards {...props} />} exact={true} />
        <Route path="/:lang/events" render={(props:any) => <ListingEvents {...props} />} exact={true} />
        <Route path="/:lang/masonry" render={(props:any) => <MasonryListing {...props} />} exact={true} />
        <Route path="/:lang/academy/:id" render={(props:any) => <NodeAcademy {...props} language='fr'  />} />
        <Route exact path="/" render={() => <Redirect to="/fr/academy" />} />
      </IonRouterOutlet>
      </PageLayout>

    </IonReactRouter> 

  </IonApp>
);

export default App;
