import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonList, IonItem
  , IonText, IonLabel, IonRow, IonGrid, IonTextarea, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import update from 'immutability-helper';
import './Tab1.css';
import { Store, getData, t_serv, t_info } from "./Store"
import MaskedInput  from '../mask/reactTextMask'

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import { IPAY, ipayCheckout } from '../components/sber'


declare type Dictionary = {
  [key: string]: any;
};

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

const b_state : t_serv = {

  ГУИД:           "",
  Наименование:   "",
  Тариф:          0,
  Роль:           "",

}

const Tab1: React.FC = () => {
  const [page,      setPage]  = useState(0);
  const [serv,      setServ]  = useState(b_state);
  const [doc,       setDoc]   = useState<t_info>(a_state);
  const [upd,       setUpd]   = useState(0);
  const [value,     setValue] = useState("");
  const [info,      setInfo]  = useState<Array<t_info>>([]);


  //  registerWebPlugin( PushNotifications );

  let item : Dictionary = {"city": "Среднеколымск"};  
  let  dict: Dictionary[] = []; dict.push(item);

  function setInfo_( arg ) {
    if(typeof(info) !== undefined) {
      setInfo(arg)
    }
  }

  Store.subscribe({ num: 1, type: "doc", func: ()=>{ setInfo_(Store.getState().Заявки) }})
  Store.subscribe({ num: 2, type: "add_doc", func: ()=>{ setInfo_(Store.getState().Заявки) }})
  Store.subscribe({ num: 3, type: "upd_doc", func: ()=>{ setInfo_(Store.getState().Заявки) }})

  
useEffect(()=>{
  setInfo(Store.getState().Заявки)
}, [upd])

function        Page1():JSX.Element {
    
  let item = <></>;let item1 = <></>
  let txt = <></>
    for(let i = 0; i < info.length; i++){
        if(info[i].Статус === "В ожидании")
            txt = <IonText class="i-text-1">    { info[i].Статус }</IonText>
        if(info[i].Статус === "Выполнено")
            txt = <IonText class="i-text-11">   { info[i].Статус }</IonText>
        if(info[i].Статус === "Отменено")
            txt = <IonText class="i-text-111">  { info[i].Статус }</IonText>
        if(info[i].Статус === "Завершен") continue

        item = <>
            { item }
            <IonItem class="item-1" detail={ false } lines="none" onClick={()=> {
                Store.dispatch({type: "phone", phone: info[i].Телефон});
                Store.dispatch({type: "descr", descr: info[i].Описание});
                setValue(info[i].Адрес);
                setDoc(info[i]);setPage(3)
            }}>
                <IonIcon class="b-icon" src="assets\icon\serv05.svg" slot="start" />  
                <IonGrid>
                    <IonRow>
                        <IonText class="b-text-1">
                            { info[i].Услуга }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText class="b-text">
                            { info[i].Адрес }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        { txt }
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

        if(info[i].Статус !== "Завершен") continue
  
        item1 = <>
            { item1 }
            <IonItem class="item-1" detail={ false } lines="none" onClick={()=> {
              Store.dispatch({type: "phone", phone: info[i].Телефон});
              Store.dispatch({type: "descr", descr: info[i].Описание});
              setValue(info[i].Адрес);
              setDoc(info[i]);setPage(3)
            }}>
                <IonIcon class="b-icon" src="assets\icon\serv05.svg" slot="start" />  
                <IonGrid>
                    <IonRow>
                        <IonText class="b-text">
                            { info[i].Услуга }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText class="b-text">
                            { info[i].Адрес }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText class="i-text-11">   { info[i].Статус }</IonText>
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
    let elem = <>
  <IonCard>
      <IonItem class="item-1" detail={ true } lines="none" onClick={()=> setPage(1)}>
          <IonIcon class="b-icon" src="assets\icon\serv04.svg" slot="start" />  
              <IonText class="b-text-1">
              Закажите новую услугу
          </IonText>
      </IonItem>
  </IonCard>
  <IonText class="text-1">МОИ ЗАЯВКИ</IonText>
  <IonCard>
      { item }
  </IonCard>
  <IonText class="text-1">ЗАВЕРШЕННЫЕ</IonText>
  <IonCard>
      { item1 }
  </IonCard>
  </>
  return elem;
}

function        Page2():JSX.Element {
  let serv = Store.getState().Услуги;
  let item = <></>
  for(let i = 0; i < serv.length; i++){
    if(serv[i].Роль === "Пользователь"){
      item = <>
        { item }
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
            setServ(serv[i]);setPage(2)
        }}>
        <IonIcon class="b-icon" src="assets\icon\serv05.svg" slot="start" />  
            <IonGrid>
              <IonRow>
                <IonText class="b-text-1">
                    { serv[i].Наименование }
                </IonText>
              </IonRow>
              <IonRow>
                <IonText class="b-text"> Тариф: { serv[i].Тариф }</IonText>
              </IonRow>
            </IonGrid> 
        </IonItem>
      </>
    }  
  }
  let elem = <>
      <IonCard class="p-15">
          <IonList>
              { item }
          </IonList>
      </IonCard>
  </>
  return elem;
}

function        Page3():JSX.Element {

  Store.dispatch({type: "phone", phone: Store.getState().Логин.Телефон})

  let elem = <>
    <IonCard>
      <IonList class="p-15">
          <IonItem class="item-1">
              <IonLabel position="stacked">Телефон</IonLabel>  
  
              <MaskedInput
                    mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input"
                    autoComplete="off"
                    placeholder="+7 (914) 000-00-00"
                    id='1'
                    type='text'
                    value = { Store.getState().phone }
                    onChange={(e: any) => {
                      Store.dispatch({type: "phone", phone:(e.target.value as string)})
                    }}
              />

          </IonItem>
          <IonLabel class="h-margin" >Адрес</IonLabel>
            <AddressSuggestions 
                // ref={suggestionsRef} 
                token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                filterLocations ={ dict }
                hintText = "г. СреднеКолымск"
                onChange={(e)=>{
                  if(e !== undefined){
                    console.log(e.value)
                    Store.dispatch({type: "addr", addr: e.value})
                  }
                }}
            
            /> 
          <IonItem class="item-1">
              <IonLabel position="floating">Примечание </IonLabel>  
              <IonTextarea 
                // value= {  }
                placeholder="гусак отдельно, подъезд со стороны... и т.д."

                onIonChange={(e)=>{
                  Store.dispatch({type: "descr", descr:(e.detail.value as string)})
              }}></IonTextarea>
          </IonItem>
              <IonButton expand="block" onClick={()=>{
                  IPAY({api_token: 'v32e4mhbmbcu0o7ts1l2ps9ii5'});
                  ipayCheckout({
                    amount: serv.Тариф,
                    currency:'RUB',
                    order_number:'',
                    description: 'Откачка септика ' + Store.getState().addr},
                    function(order) { showSuccessfulPurchase(order) },
                    function(order) { showFailurefulPurchase(order) })
                 // createDoc();        
              }}>                    
                  Заказать
              </IonButton>
      </IonList>
    </IonCard>
  </>;
  return elem;
}

function        showSuccessfulPurchase(order){
  console.log("success")
  console.log(order)
  createDoc()
}

function        showFailurefulPurchase(order){
  console.log("failure")
  console.log(order)
}

function        Page4():JSX.Element {
  let Статус    = doc.Статус;
  let Телефон   = doc.Телефон;
  let Описание  = doc.Описание;

  Store.dispatch({type: "addr", addr: doc.Адрес})

  let elem = <>
    <IonCard>
      <IonList class="p-15">
          <IonItem  class="item-1">
              <IonLabel position="stacked">Телефон</IonLabel>  

              <MaskedInput
                    mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input"
                    autoComplete="off"
                    placeholder="+7 (914) 000-00-00"
                    id='1'
                    type='text'
                    value = { Телефон }
                    onChange={(e) => {
                        Телефон = (e.target.value as string)
                    }}
                />

          </IonItem>
          <IonLabel class="h-margin">Адрес</IonLabel>  
          <AddressSuggestions 
                // ref={suggestionsRef} 
                token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                filterLocations ={ dict }
                hintText = "г. СреднеКолымск"
                defaultQuery = { Store.getState().addr }
                onChange={(e)=>{

                  if(e !== undefined)
                    Store.dispatch({type: "addr", addr: e.value})

                }}
             ></AddressSuggestions>
  
          <IonItem  class="item-1">
              <IonLabel position="floating">Примечание </IonLabel>  
              <IonTextarea 
                value= { Описание }
                placeholder="гусак отдельно, подъезд со стороны... и т.д."

                onIonChange={(e)=>{
                  Описание = (e.detail.value as string)
                }}
              ></IonTextarea>
          </IonItem>
          <IonItem>
              <IonLabel position="stacked">Статус </IonLabel>  
              <IonSelect
                interface="popover"
                value = { Статус }
                placeholder="Выбрать..."
                onIonChange={e => {
                  Статус = e.detail.value as string;
              }}              
              >
                <IonSelectOption value={"В ожидании"}> В ожидании </IonSelectOption>
                <IonSelectOption value={"Завершен"}> Завершено </IonSelectOption>
              </IonSelect>
          </IonItem>
          <IonRow>
            <IonCol>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={()=>{
                let params = {
                    ГУИД:       doc.ГУИД,
                    Статус:     Статус,
                    Телефон:    Телефон,
                    Адрес:      value,
                    Описание:   Описание,
                }
                updDoc(params) 
                setPage(0);      
              }}>              
                  Обновить
              </IonButton>
            </IonCol>
          </IonRow>
      </IonList>
    </IonCard>
  </>;
  return elem;
}

async function  createDoc(){

  let phone = Store.getState().phone
  let addr = Store.getState().addr
  let descr = Store.getState().descr

  if(phone === "" || addr === ""){
    return
  }

  let params = { 
      Пользователь:   Store.getState().Логин.ГУИД,
      Телефон:        phone,
      Адрес:          addr,
      Услуга:         (serv as t_serv).ГУИД,
      Тариф:          (serv as t_serv).Тариф,
      Описание:       descr
  }

  let res = await getData("У_Заявка", params)

  if(res.Код === 100){
    Store.dispatch({type: "add_doc", data: res.Данные})
  } 
  if(res.Код === 101){
    Store.dispatch({type: "upd_doc", data: res.Данные})
 
  } 
  setPage(0);  

  setValue("")
  Store.dispatch({type: "phone", phone: ""})
  Store.dispatch({type: "descr", descr: ""})
  Store.dispatch({type: "addr",  addr: ""})

  setUpd(upd + 1);
}

async function  updDoc(params){
  
  let res =  await getData("У_Заявка", params);

  if(res.Код === 100){
    let jarr = Store.getState().Заявки;
    let doc = res.Данные

    var commentIndex = jarr.findIndex(function(b) { 
        return b.ГУИД === doc.ГУИД 
    });
    if(commentIndex >= 0){

        var updated = update(jarr[commentIndex], {
            Телефон:    {$set: doc.Телефон}, 
            Статус:     {$set: doc.Статус}, 
            Описание:   {$set: doc.Описание}, 
            Адрес:      {$set: doc.Адрес}
        }); 
        Store.dispatch({type: "upd_doc", data: updated})
        Store.dispatch({type: "upd_usl", data: updated})
      }

    setUpd(upd + 1);

  } 
}

function        Pages():JSX.Element {
  let elem = <></>
 
  switch( page ){
      case 0:return <Page1 />
      case 1:return <Page2 />
      case 2:return <Page3 />
      case 3:return <Page4 />
  }
  return elem
}

function        BackButton():JSX.Element{

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

export default Tab1;
