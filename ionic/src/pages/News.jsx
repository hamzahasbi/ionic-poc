import React, { useState, useEffect } from 'react';
import {
  useIonViewWillEnter,
  IonContent,
  IonButton,
  IonRippleEffect,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonList,
} from '@ionic/react';
import './Home.css';
import { YearsAgo } from '../config/global';
import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import Loader from '../components/Loader/Loader';
import { getThematique, getNewsNodes } from '../config/newsApi';
import PageLayout from '../layout/PageLayout';
import CardInlineWrapper from '../components/CardInline/CardInline';

const NewsPage = () => {
  const [items, setItems] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [filters, setFilters] = useState([
    {
      id: 'all',
      name: 'Toutes',
    },
  ]);

  const years = YearsAgo(5).reverse();
  const handleChange = tid => {
    setOffset(0);
    setItems([]);
    setPageNumber(0);
    setSelectedTerm(tid);
  };

  const handleYearChange = year => {
    setItems([]);
    setOffset(0);
    setPageNumber(0);
    setSelectedYear(year);
  };
  const handleScroll = () => {
    const selected = pageNumber + 1;
    const newOffset = Math.ceil(selected * 4);
    setPageNumber(selected);
    setOffset(newOffset);
  };

  useIonViewWillEnter(() => {
    getThematique(currentLanguage)
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
  }, []);

  const ButtonFilter = ({ buttons, selectedTerm }) => {
    return (
      <section>
        <header> {'Catégories'} </header>
        {buttons.map(element => {
          return (
            <IonButton
              key={element.id}
              size="small"
              disabled={selectedTerm === element.id}
              color="dark"
              shape="round"
              onClick={e => handleChange(element.id)}
            >
              {element.name}
              <IonRippleEffect type="unbounded" />
            </IonButton>
          );
        })}
      </section>
    );
  };
  const fetchData = () => {
    setIsLoading(true);
    getNewsNodes(currentLanguage, selectedTerm, selectedYear, offset)
      .then(res => {
        let nodes = res.data.map(el => {
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
        setHasMore(!!res.links.next);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerm, offset, selectedYear]);

  return (
    <PageLayout title={'Actualités'}>
      <IonContent className="content-bg">
        <SelectFilters
          filters={years}
          selectedTerm={selectedYear}
          handleChange={handleYearChange}
        />
        <ButtonFilter buttons={filters} selectedTerm={selectedTerm} />
        {isLoading && (
          <Loader
            callback={() => setIsLoading(false)}
            isOpen={isLoading}
            message={'Chargement...'}
          />
        )}
        {items.length > 0 && <CardInlineWrapper items={items} />}
        <InfiniteScroll
          disabled={!hasMore}
          callback={handleScroll}
          loadingText={'Loading....'}
        />
        {!isLoading && items.length <= 0 && (
          <IonLabel>{'Aucune actualité pour le moment'}</IonLabel>
        )}
      </IonContent>
    </PageLayout>
  );
};

function SelectFilters({ filters, handleChange, selectedTerm }) {
  const customOptions = {
    header: 'Choisir une date',
    translucent: true,
  };
  return (
    <IonList>
      <IonItem>
        <IonLabel>{'Toutes'}</IonLabel>
        <IonSelect
          interfaceOptions={customOptions}
          interface="action-sheet"
          placeholder="Date"
          cancel-text="Annuler"
          ok-text="Confirmer"
          onIonChange={e => handleChange(e.detail.value)}
          value={selectedTerm}
        >
          {filters.map((filter, index) => {
            return (
              <IonSelectOption key={index} value={filter}>
                {filter}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </IonList>
  );
}

export default NewsPage;
