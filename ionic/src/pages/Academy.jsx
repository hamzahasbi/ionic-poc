import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonLoading,
  IonRippleEffect,
  useIonViewWillEnter,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import {
  COUR_TYPE,
  getAcademyNodes,
  getAcademyTerms,
} from '../config/academyApi';
import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import AccordeonWrapper from '../components/Expandable/Accordeon';
import PageLayout from '../layout/PageLayout';
import { GetLocale } from '../config/language';

const Academy = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState([
    {
      id: 'all',
      name: 'Toutes',
    },
  ]);
  const types = [
    {
      id: 0,
      label: 'EN REPLAY',
    },
    {
      id: 1,
      label: 'EN COURS',
    },
    {
      id: 2,
      label: 'A VENIR',
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [selectedType, setSelectedType] = useState(COUR_TYPE.EN_REPLAY);
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const handleChange = tid => {
    setItems([]);
    setOffset(0);
    setPageNumber(0);
    setSelectedTerm(tid);
  };

  const handleChangeType = type => {
    setItems([]);
    setOffset(0);
    setPageNumber(0);
    setSelectedType(type);
  };

  const handleScroll = () => {
    const selected = pageNumber + 1;
    const newOffset = Math.ceil(selected * 10);
    setPageNumber(selected);
    setOffset(newOffset);
  };

  const ButtonFilter = ({ buttons }) => {
    return (
      <section>
        <header> Tous Les cours </header>
        {buttons.map(element => {
          return (
            <IonButton
              key={element.id}
              size="small"
              disabled={selectedType === element.id}
              color="dark"
              shape="round"
              onClick={e => handleChangeType(element.id)}
            >
              {element.label}
              <IonRippleEffect type="unbounded" />
            </IonButton>
          );
        })}
      </section>
    );
  };
  const SegmentFilter = ({ buttons }) => {
    return (
      <section>
        <header> Tous Les cours </header>
        <IonSegment
          scrollable
          swipeGesture
          onIonChange={e => handleChangeType(e.detail.value)}
        >
          {buttons.map(element => {
            return (
              <IonSegmentButton
                key={element.id}
                size="small"
                // color="dark" shape="round"
                value={element.id}
              >
                <IonLabel>{element.label}</IonLabel>
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </section>
    );
  };
  const fetchData = () => {
    getAcademyNodes(selectedType, selectedTerm, offset, currentLanguage)
      .then(data => {
        let nodes = data.data.map(el => {
          const alias = '/' + currentLanguage + el.path.alias;
          return {
            ...el,
            path: {
              ...el.path,
              alias: alias,
            },
          };
        });
        setItems(items.concat(nodes));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useIonViewWillEnter(() => {
    getAcademyTerms(currentLanguage)
      .then(data => {
        const terms = data.data.map(el => {
          return {
            ...el,
            id: el.drupal_internal__tid,
          };
        });
        setFilters(filters.concat(terms));
      })
      .catch(e => {
        console.log(e);
      });
    // const fnc = async () => {
    //     const lng = await GetLocale();
    //     console.log(lng);
    //     return lng;
    // }
  });

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [selectedTerm, offset, selectedType]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageLayout title={'Academy'}>
      <IonContent fullscreen>
        <SelectFilters
          filters={filters}
          selectedTerm={selectedTerm}
          handleChange={handleChange}
        />
        <ButtonFilter buttons={types} />
        {/*<SegmentFilter buttons={types}/>*/}
        {isLoading && (
          <IonLoading
            cssClass="custom-loader"
            isOpen={isLoading}
            onDidDismiss={() => setIsLoading(false)}
            translucent={true}
            message={'Chargement...'}
            duration={10000}
          />
        )}
        {items.length > 0 && <AccordeonWrapper data={items} />}
        <InfiniteScroll
          disabled={items.length === 0}
          callback={handleScroll}
          loadingText={'Loading....'}
        />
      </IonContent>
    </PageLayout>
  );
};

const SelectFilters = ({ filters, handleChange, selectedTerm }) => {
  const customOptions = {
    header: 'Choisir une thématique',
    translucent: true,
  };
  return (
    <IonList>
      <IonItem>
        <IonLabel>{'Thématiques'}</IonLabel>
        <IonSelect
          interfaceOptions={customOptions}
          interface="action-sheet"
          placeholder="Thématique"
          cancel-text="Annuler"
          ok-text="Confirmer"
          onIonChange={e => handleChange(e.detail.value)}
          value={selectedTerm}
        >
          {filters.map(filter => {
            return (
              <IonSelectOption key={filter.id} value={filter.id}>
                {filter.name}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default Academy;
