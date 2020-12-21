import {
    IonButton,
    IonContent,
    IonThumbnail,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonItemDivider,
    IonLoading,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRippleEffect,
    useIonViewWillEnter,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';
import React, {useState, useEffect} from 'react';
import './Home.css';
import {COUR_TYPE, getAcademyNodes, getAcademyTerms} from "../config/academyApi";
import MainMenu from "../components/Menu/menu";
import sanitizeHtml from "sanitize-html";
import instructor from "../assets/icon/instructor.svg"
import InfiniteScroll from "../components/InfiniteScroll/InfiniteScroll";
import AccordeonWrapper from "../components/Expandable/Accordeon"


const Academy = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState([{
        "id" : "all",
        "name": "Toutes",
    }]);
    const types = [
        {
            id: 0,
            label: "EN REPLAY"
        },
        {
            id: 1,
            label: "EN COURS"
        },
        {
            id: 2,
            label: "A VENIR",
        },
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTerm, setSelectedTerm] = useState("all");
    const [selectedType, setSelectedType] = useState(COUR_TYPE.EN_REPLAY);
    const [offset, setOffset] = useState(0);
    const [pageNumber, setPageNumber] = useState(0)
    const currentLanguage = 'fr';
    const handleChange = (tid) => {
        setItems([]);
        setOffset(0);
        setPageNumber(0);
        setSelectedTerm(tid);
    }

    const handleChangeType = (type) => {
        setItems([]);
        setOffset(0);
        setPageNumber(0);
        setSelectedType(type);
    }

    const handleScroll = () => {
        const selected = pageNumber + 1;
        const newOffset = Math.ceil(selected * 10);
        setPageNumber(selected);
        setOffset(newOffset);
    }

    const ButtonFilter = ({buttons}) => {
        return (
            <section>
                <header> Tous Les cours </header>
                {buttons.map(element => {
                    return (
                       <IonButton
                                  key={element.id} size="small"
                                  disabled={selectedType === element.id}
                                  color="dark" shape="round"
                                  onClick={e => handleChangeType(element.id)}
                       >{element.label}
                           <IonRippleEffect type="unbounded"/>
                       </IonButton>
                    );
                })}
            </section>
        );
    }

    const SegmentFilter = ({buttons}) => {
        return (
            <section>
                <header> Tous Les cours </header>
                <IonSegment scrollable swipeGesture onIonChange={e => handleChangeType(e.detail.value)}>
                    {buttons.map(element => {
                        return (
                            <IonSegmentButton
                                key={element.id} size="small"
                                // color="dark" shape="round"
                                value={element.id}
                            >
                                <IonLabel>
                                    {element.label}
                                </IonLabel>
                            </IonSegmentButton>
                        );
                    })}
                </IonSegment>

            </section>
        );
    }
    const fetchData = () => {
        setIsLoading(true);
        getAcademyNodes(selectedType, selectedTerm, offset, currentLanguage)
            .then(data => {
                let nodes = data.data.map(el => {
                    const alias = "/" + currentLanguage + el.path.alias
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
            }).catch(e => {
            console.log(e)
        })
    }
    useIonViewWillEnter(() => {
        getAcademyTerms(currentLanguage).then(data => {
            const terms = data.data.map(el => {
                return {
                    ...el,
                    id: el.drupal_internal__tid,
                }
            })
            setFilters(filters.concat(terms));
        }).catch(e => {
            console.log(e);
        });
    })
    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [selectedTerm, offset, selectedType]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <IonPage>
        <MainMenu/>
        <IonHeader>
            <IonToolbar>
                <IonTitle size="large">
                    <IonMenuButton menu="first" autoHide={false}/>
                </IonTitle>
            </IonToolbar>
            <IonToolbar>
                <IonSearchbar/>
            </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <SelectFilters filters={filters} selectedTerm={selectedTerm} handleChange={handleChange}/>
          <ButtonFilter buttons={types} />
          {/*<SegmentFilter buttons={types}/>*/}
          {isLoading  &&
              <IonLoading
                  cssClass='custom-loader'
                  isOpen={isLoading}
                  onDidDismiss={() => setIsLoading(false)}
                  translucent={true}
                  message={'Chargement...'}
                  duration={10000}
              />
          }
          {items.length > 0 && <AccordeonWrapper data={items}/>}
          <InfiniteScroll disabled={items.length === 0} callback={handleScroll} loadingText={"Loading...."}/>
      </IonContent>
    </IonPage>
  );
};

const SelectFilters = ({filters, handleChange, selectedTerm}) => {

    const customOptions = {
        header: 'Choisir une thématique',
        translucent: true
    };
    return (
        <IonList>
            <IonItem>
                <IonLabel>{"Thématiques"}</IonLabel>
                <IonSelect
                    interfaceOptions={customOptions}
                    interface="action-sheet"
                    placeholder="Thématique"
                    cancel-text="Annuler"
                    ok-text="Confirmer"
                    onIonChange={e => handleChange(e.detail.value)}
                    value={selectedTerm}
                >
                    {
                        filters.map(filter => {
                            return (
                                <IonSelectOption key={filter.id} value={filter.id}>{filter.name}</IonSelectOption>
                            );
                        })
                    }
                </IonSelect>
            </IonItem>

        </IonList>
    );
};

const CardAcademy = ({title, url, description, author, image = undefined}) => {
    return (
            <IonCard button={true} href={url}>
                <IonCardHeader>
                    {/*<IonCardSubtitle>Card Subtitle</IonCardSubtitle>*/}
                    <IonCardTitle>{title}</IonCardTitle>
                </IonCardHeader>


                <IonCardContent >
                    <IonText>
                        <p dangerouslySetInnerHTML={{__html: sanitizeHtml(description)}}/>
                    </IonText>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <img src={image === undefined ? instructor : image} alt="instructor thumbnail"/>
                        </IonThumbnail>
                        <IonLabel>
                            <h2>{author.name}</h2>
                        </IonLabel>
                    </IonItem>

                </IonCardContent>
            </IonCard>

    );
}

const Cards = ({data}) => {
    return (
      <IonList>
          { data.map((item) => {
              const author = {
                  description: item.internal_user.field_vactory_instructor.about[0].value,
                  name: `${item.internal_user.field_vactory_instructor.first_name} ${item.internal_user.field_vactory_instructor.last_name}`,
                  profession: item.internal_user.field_vactory_instructor.profession,
                  picture: item.internal_user.field_vactory_instructor.picture,
              };
              return (
                  <IonItemDivider  key={item.drupal_internal__nid}>
                      <CardAcademy author={author}
                                   title={item.title}
                                   description={item.field_vactory_excerpt.value}
                                   url={`/${item.langcode}/academy/${item.drupal_internal__nid}`}
                                   image={author.picture !== null ? author.picture._default : undefined}
                      />
                  </IonItemDivider>
              )
          })}
      </IonList>
      )
};

export default Academy;
