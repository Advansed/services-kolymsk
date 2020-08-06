import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonText, IonIcon, IonGrid
    , IonRow, IonCard, IonList, IonLabel, IonButton, IonCardHeader, IonSelect
    , IonSelectOption, IonCol } from '@ionic/react';

import './Tab3.css';
import { personOutline, arrowBackOutline } from 'ionicons/icons';
import { Store, getData, t_info} from './Store';
// import update from 'immutability-helper';

interface t_exec {
  name: string,
  type: 'radio',
  label: string,
  value: string,
  checked: true
}

const Tab3: React.FC = () => {
  const [page,    setPage]  = useState(0);
  const [upd,     setUpd]   = useState(0);
  const [param,   setParam] = useState();
  const [docs,    setDocs]  = useState<Array<t_info>>([]); 


  Store.upd_subscribe3(()=>{
    setUpd(upd + 1);
  })

  useEffect(()=>{
    setDocs(Store.getState().Документы)

  }, [upd])

  function  Items(props:{ info }):JSX.Element{
    let elem = <>
    </>
    let info = props.info;
  
    for(let i = 0;i < info.length;i++){
      elem = <>
        { elem }
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
            setParam(info[i]);setPage(3);
        }}>
          <IonIcon class="b-icon" icon={ personOutline }  slot="start" />  
            <IonGrid>
              <IonRow>
                <IonText class="b-text">
                    { info[i].Адрес }
                </IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-1">   { info[i].Статус }</IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-2">
                  { info[i].Дата }
                </IonText>
              </IonRow>
            </IonGrid>        
        </IonItem>
      </>
    }
  
    elem = <>
      <IonText class="text-1">ЗАЯВКИ</IonText>
      <IonCard>
        { elem } 
      </IonCard>
    </>
    return elem 
  
  }

  function  Page1():JSX.Element {
    return <>
      <Items  info = { docs } />
    </>
  }

  function  Page4(props:{info}):JSX.Element {
    let info = props.info;
    let Исполнитель = info.Исп;
  
    let isp = Store.getState().Исполнители; let options = <></>

    for(let i = 0;i < isp.length; i++){
      options = <>
        { options }
        <IonSelectOption value={ isp[i].ФИО }>{ isp[i].ФИО }</IonSelectOption>
      </>
    }

    let elem = <>
      <IonCard>
        <IonCardHeader class="a-center"> Детали заказа</IonCardHeader>

        <IonList>
          <IonItem>
            <IonLabel position="stacked"> Телефон </IonLabel>
            <IonText> { info.Телефон } </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked"> Адрес </IonLabel>
            <IonText> { info.Адрес } </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked"> Описание </IonLabel>
            <IonText> { info.Описание }</IonText>
          </IonItem>
          <IonItem  class="item-1">
            <IonLabel position="stacked"> Исполнитель </IonLabel>
            <IonSelect
                  interface="popover"
                  value = { Исполнитель }
                  placeholder="Выбрать..."
                  onIonChange={e => {
                    Исполнитель = e.detail.value
                  }}
            >
              { options }
            </IonSelect>
          </IonItem>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="block" onClick={()=>{
                let params = {
                    ГУИД:           info.ГУИД,          
                    Исполнитель:    Исполнитель,
                }
                updDoc(params)
                setPage(0);
              }}>
                Записать
              </IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </IonCard>
  </>;
  return elem;
  }

  async function updDoc(params){
  
    let jarr = Store.getState().Документы;
    var commentIndex = jarr.findIndex(function(b) { 
        return b.ГУИД === params.ГУИД 
    });
    if(commentIndex >= 0){ 
      Store.dispatch({type: "upd_docs", data: params})
      getData("У_Заявка", params);
      Store.dispatch({type: "ex_ec"})
    } 
  }  

  function  BackButton():JSX.Element{

    let elem = <>
    </>
  
    if( page !== 0){
      elem = 
      <IonButton slot = "start" fill="clear" onClick={()=>setPage(0)}>
        <IonIcon icon={ arrowBackOutline } slot="icon-only" />
      </IonButton>
    }
  
    return elem
  }

  function  Content(props:{page: number }):JSX.Element{
    
    switch (props.page) {
      case 0: return <Page1 />    
      case 3: return <Page4 info = { param }/>      
      default: return  <></>
    }
  
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="a-center">
          <IonTitle> Настройки </IonTitle>
          <BackButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Content page = { page } />
      </IonContent>

    </IonPage>
  );
};

export default Tab3;
