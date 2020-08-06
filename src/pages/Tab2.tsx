import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonList, IonItem
  , IonText, IonLabel, IonRow, IonGrid, IonCardHeader, IonCol } from '@ionic/react';
  import { constructOutline, arrowBackOutline } from 'ionicons/icons';
import './Tab2.css';
import { t_info, Store, getData } from "./Store"
import update from 'immutability-helper';

const a_state : t_info = {
    ГУИД:       "",
    Дата:       "",
    Номер:      "",
    Услуга:     "",
    Адрес:      "",
    Статус:     "",
    Сумма:       0,
    Телефон:    "",
    Описание:   "",
    Исп:        "",

}


const Tab2: React.FC = () => {


  const [page, setPage] = useState(0);
  const [info, setInfo] = useState<Array<t_info>>([]);
  const [upd,  setUpd]  = useState(0)

  const [curr, setCurr] = useState<t_info>(a_state);

  Store.upd_subscribe2(()=>{
    setUpd(upd + 1);
  })

  useEffect(()=>{
    let jarr = Store.getState().Задания;
    setInfo(jarr)
    let current = a_state;

    jarr.every(function(elem: any, index: number) {
      if(elem.Статус === "В ожидании") { current = elem;return false
      } else return true;
    });

    setCurr(current);
  }, [upd])


function Page1(props:{curr: t_info}):JSX.Element {
  let curr = props.curr;
  let item = <></> 
  let item1 = <></>
  for(let i = 0; i < info.length; i++){
      if(info[i] !== curr && info[i].Статус === "В ожидании")
      item = <>
          { item }
          <IonItem  class="item-1" detail={ false } lines="none" onClick={()=> {
              setCurr(info[i]);
          }}>
              <IonIcon class="b-icon" src="assets\icon\serv05.svg"  slot="start" />  
              <IonGrid>
                  <IonRow>
                      <IonText class="b-text">
                          { info[i].Статус }
                      </IonText>
                  </IonRow>
                  <IonRow>
                      <IonText class="i-text-3">    { info[i].Адрес }</IonText>
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
  for(let i = 0; i < info.length; i++){
    if(info[i] !== curr && info[i].Статус === "Выполнено")
    item1 = <>
        { item1 }
        <IonItem class="item-1" detail={ false } lines="none" onClick={()=> {
            setCurr(info[i]);
            curr.Статус = "В ожидании"
        }}>
            <IonIcon class="b-icon" src="assets\icon\serv05.svg"  slot="start" />  
            <IonGrid>
                <IonRow>
                    <IonText class="b-text">
                        { info[i].Статус }
                    </IonText>
                </IonRow>
                <IonRow>
                    <IonText class="i-text-3">    { info[i].Адрес }</IonText>
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
  let fcard = ""
  if(curr.ГУИД === "") fcard = "hidden"
  let elem = <>
  <IonText class="text-1">ТЕКУЩИЙ</IonText>
  <IonCard class={ fcard }>
      <IonItem  class="item-1" detail={ true } lines="none" onClick={()=> {
        if(curr.ГУИД !== "") setPage(2)
      }}>
      <IonIcon class="b-icon" src="assets\icon\serv05.svg"  slot="start" />  
              <IonGrid>
                  <IonRow>
                      <IonText class="b-text-1">
                          { curr.Услуга }
                      </IonText>
                  </IonRow>
                  <IonRow>
                      <IonText class="b-text">    {  curr.Адрес }</IonText>
                  </IonRow>
                  <IonRow>
                      <IonText class="i-text-2">
                          { curr.Дата }
                      </IonText>
                  </IonRow>
              </IonGrid>
      </IonItem>
  </IonCard>
  <IonText class="text-1">ЗАДАНИЯ</IonText>
  <IonCard>
      { item }
  </IonCard>
  <IonText class="text-1">ВЫПОЛНЕННЫЕ</IonText>
  <IonCard>
      { item1 }
  </IonCard>
  </>
  return elem;
}

function Page2():JSX.Element {
  let elem = <>
      <IonCard class="p-15">
          <IonList>
              <IonItem  class="item-1" detail={ true } lines="none" onClick={()=>{
                  setPage(2)
              }}>
                  <IonIcon  icon={ constructOutline } slot="start"/>
                  <IonText class="b-text">
                      Вызов разнорабочего
                  </IonText>
              </IonItem>
              <IonItem class="t-line item-1" detail={ true } lines="none" onClick={()=>{
                  setPage(2)
              }}>
                  <IonIcon icon={ constructOutline } slot="start"/>
                  <IonText class="b-text">
                      Вызов сантехника
                  </IonText>
              </IonItem>
              <IonItem class="t-line item-1" detail={ true } lines="none" onClick={()=>{
                  setPage(2)
              }}>
                  <IonIcon icon={ constructOutline } slot="start"/>
                  <IonText class="b-text">
                      Вызов электрика
                  </IonText>
              </IonItem>
          </IonList>
      </IonCard>
  </>
  return elem;
}

function Page3():JSX.Element {
  let elem = <>
      <IonCard>
        <IonCardHeader class="a-center"> Детали заказа</IonCardHeader>

        <IonList>
          <IonItem>
            <IonLabel position="stacked"> Телефон </IonLabel>
            <IonText> { curr.Телефон } </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked"> Адрес </IonLabel>
            <IonText> { curr.Адрес } </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked"> Описание </IonLabel>
            <IonText> { curr.Описание }</IonText>
          </IonItem>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="block" onClick={()=>{
                curr.Статус = "Выполнено"
                let params = {
                    ГУИД:       curr.ГУИД,
                    Статус:     "Выполнено",
                }
                updDoc(params)
                setPage(0);
              }}>
                Выполнено
              </IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </IonCard>
  </>;
  return elem;
}

async function updDoc(params){
  
  let res =  await getData("У_Заявка", params);

  if(res.Код === 100){
    let jarr = Store.getState().Задания;
    let doc = res.Данные

    var commentIndex = jarr.findIndex(function(b) { 
        return b.ГУИД === doc.ГУИД 
    });
    if(commentIndex >= 0){

        var updated = update(jarr[commentIndex], {
            Статус:     {$set: doc.Статус}, 
        }); 
        Store.dispatch({type: "upd_usl", data: updated})
        Store.dispatch({type: "upd_doc", data: updated})
      }

    setUpd(upd + 1);

  } 
}

function Pages():JSX.Element {
  let elem = <></>
 
  switch( page ){
      case 0:return <Page1  curr = { curr }/>
      case 1:return <Page2 />
      case 2:return <Page3 />
  }
  return elem
}

function BackButton():JSX.Element{

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="a-center"> Услуги </IonTitle>
          <BackButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>

          <Pages />
       
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
