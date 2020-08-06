import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonText, IonIcon, IonGrid
    , IonRow, IonCard, IonList, IonLabel, IonInput, IonButton, IonCardHeader, IonAlert, IonSelect
    , IonSelectOption } from '@ionic/react';

import './Tab3.css';
import { personOutline, personAddOutline, arrowBackOutline, saveOutline } from 'ionicons/icons';
import MaskedInput from '../mask/reactTextMask';
import { Store, getData} from './Store';
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
  const [alert,   setAlert] = useState(false);
  const [exec,    setExec]  = useState<Array<t_exec>>([]); 


  Store.upd_subscribe3(()=>{
    setUpd(upd + 1);
  })

  useEffect(()=>{
    setExec(Store.getState().Исполнители)
  
  }, [upd])

  function  Servs(props:{ info }):JSX.Element{
    let elem = <>
    </>
    let info = props.info;
    for(let i = 0;i < info.length;i++){
      if(info[i].Роль !== "Админ") continue
      elem = <>
        { elem }
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
          setParam(info[i]);setPage(2);
        }}>
          <IonIcon class="b-icon" src="assets\icon\serv05.svg" slot="start" />  
            <IonGrid>
              <IonRow>
                <IonText class="b-text">
                    { info[i].Наименование }
                </IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-11"> Тариф: { info[i].Тариф }</IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-2">
                  {/* { info[i].Статус } */}
                </IonText>
              </IonRow>
            </IonGrid>        
        </IonItem>
      </>
    }
  
    elem = <>
      <IonText class="text-1">УСЛУГИ</IonText>
      <IonCard>
        { elem } 
      </IonCard>
    </>
    return elem 
  
  }

  function  Execs(props:{ info }):JSX.Element{
    let elem = <>
    </>
    let info = props.info;
    for(let i = 0;i < info.length;i++){
      elem = <>
        { elem }
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
          setParam(info[i]);
          setPage(11);
        }}>
          <IonIcon class="b-icon" icon={ personOutline }  slot="start" />  
            <IonGrid>
              <IonRow>
                <IonText class="b-text">
                    { info[i].Услуга }
                </IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-11">   { info[i].ФИО }</IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-2">
                  { info[i].Телефон }
                </IonText>
              </IonRow>
            </IonGrid>        
        </IonItem>
      </>
    }
  
    elem = <>
      <IonText class="text-1">ИСПОЛНИТЕЛИ</IonText>
      <IonCard>
        { elem } 
        <IonItem detail={ true } lines="none" onClick={()=>{
          setParam(undefined);
          setPage(11);
        }}>
          <IonIcon class="b-icon" icon={ personAddOutline }  slot="start" />  
          <IonText class="i-text-11">Добавить нового исполнителя</IonText>      
        </IonItem> 
      </IonCard>
    </>
    return elem 
  
  }

  function  Admins(props:{ info }):JSX.Element{
    let elem = <></>
    let info = props.info;
  
    for(let i = 0;i < info.length;i++){
      elem = <>
        { elem }
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
          setParam(info[i]);
          setPage(12);
        }}>
          <IonIcon class="b-icon" icon={ personOutline }  slot="start" />  
            <IonGrid>
              <IonRow>
                <IonText class="b-text">
                    { info[i].Услуга }
                </IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-11">   { info[i].ФИО }</IonText>
              </IonRow>
              <IonRow>
                <IonText class="i-text-2">
                  { info[i].Телефон }
                </IonText>
              </IonRow>
            </IonGrid>        
        </IonItem>
      </>
    }
  
    elem = <>
      <IonText class="text-1">АДМИНИСТРАТОРЫ</IonText>
      <IonCard>
        { elem } 
        <IonItem detail={ true } lines="none" onClick={()=>{
          setParam(undefined);
          setPage(12);
        }}>
          <IonIcon class="b-icon" icon={ personAddOutline }  slot="start" />  
          <IonText class="i-text-11">Добавить нового админа</IonText>      
        </IonItem> 
      </IonCard>
    </>
    return elem 
  
  }

  function  Page1():JSX.Element {
    return <>
      <Servs  info = { Store.getState().Услуги } />
      <Admins info = { Store.getState().Администраторы }/>
      <Execs  info = { exec }/>
    </>
  }

  function  Page21(props:{info}):JSX.Element {
    let info = props.info;

    let Телефон   = info === undefined ? "" : info.Телефон
    let ФИО       = info === undefined ? "" : info.ФИО
    let Услуга    = info === undefined ? "" : info.Услуга
    let Роль      = "Исполнитель"

    let usl = Store.getState().Услуги; let options = <></>
    for(let i = 0;i < usl.length; i++){
      if(usl[i].Роль !== "Админ") continue
      options = <>
        { options }
        <IonSelectOption value={ usl[i].Наименование } >
            { usl[i].Наименование }
        </IonSelectOption>
      </>
    }

    let elem = <>
      <IonCard>
        <IonList class="p-15">
          <IonItem  class="item-1">
            <IonLabel position="stacked"> Услуга </IonLabel>
            <IonSelect
                  interface="popover"
                  value = { Услуга }
                  placeholder="Выбрать..."
                  onIonChange={e => {
                    Услуга   = e.detail.value               
                  }}
            >
              { options }
            </IonSelect>
          </IonItem>
          <IonItem  class="item-1" detail={ false } >
              <IonLabel position="stacked">Телефон</IonLabel>  
              <MaskedInput
                    mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input"
                    autoComplete="off"
                    placeholder="+7 (914) 000-00-00"
                    id='1'
                    type='text'
                    value = { Телефон }
                    onChange={(e: any) => {
                      Телефон = (e.target.value as string)
                    }}
                />

          </IonItem>
          <IonItem  class="item-1" detail={ false } >
            <IonLabel position="floating">ФИО</IonLabel>  
            <IonInput value={ ФИО } onIonChange={(e)=>{
                ФИО = (e.detail.value as string)
            }}>

            </IonInput>
          </IonItem>
          <IonItem  class="item-1" detail={ false } >
              <IonLabel position="stacked"> Роль </IonLabel>  
              <IonSelect
                  interface="popover"
                  value = { Роль }
                  placeholder="Выбрать..."
                  onIonChange={e => {
                    Роль   = e.detail.value               
                  }}
            >
              <IonSelectOption value = { "Исполнитель" } >
                  Исполнитель
              </IonSelectOption>
              <IonSelectOption value = { "Нет" } >
                  Нет
              </IonSelectOption>            
            </IonSelect>
          </IonItem>
          <IonButton expand="block" onClick={()=>{
              if(Телефон.length > 0) {
                  let params = {};
                    params["ГУИД"] = info === undefined ? "" : info.ГУИД
                    params["Роль"] = Роль
                    params["Телефон"] = Телефон
                    if(info !== undefined)
                      if(ФИО !== info.ФИО) params["ФИО"] = ФИО
                    params["Услуга"] = Услуга

                  updExec(params);
                  setPage(0);

              }
          }}>            
            Отправить
          </IonButton>
        </IonList>
      </IonCard>
    </>

    return elem;
  }

  function  Page22(props:{info}):JSX.Element {
    let info = props.info;

    let Телефон   = info === undefined ? "" : info.Телефон
    let ФИО       = info === undefined ? "" : info.ФИО
    let Услуга    = info === undefined ? "" : info.Услуга
    let Роль      = "Админ"

    let usl = Store.getState().Услуги; let options = <></>
    for(let i = 0;i < usl.length; i++){
      if(usl[i].Роль !== "Админ") continue
      options = <>
        { options }
        <IonSelectOption value={ usl[i].Наименование } >
            { usl[i].Наименование }
        </IonSelectOption>
      </>
    }

    let elem = <>
      <IonCard>
        <IonList class="p-15">
          <IonItem  class="item-1">
            <IonLabel position="stacked"> Услуга </IonLabel>
            <IonSelect
                  interface="popover"
                  value = { Услуга }
                  placeholder="Выбрать..."
                  onIonChange={e => {
                    Услуга   = e.detail.value               
                  }}
            >
              { options }
            </IonSelect>
          </IonItem>
          <IonItem  class="item-1" detail={ false } >
              <IonLabel position="stacked">Телефон</IonLabel>  
              <MaskedInput
                    mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input"
                    autoComplete="off"
                    placeholder="+7 (914) 000-00-00"
                    id='1'
                    type='text'
                    value = { Телефон }
                    onChange={(e: any) => {
                      Телефон = (e.target.value as string)
                    }}
                />

          </IonItem>
          <IonItem  class="item-1" detail={ false } >
            <IonLabel position="floating">ФИО</IonLabel>  
            <IonInput value={ ФИО } onIonChange={(e)=>{
                ФИО = (e.detail.value as string)
            }}>

            </IonInput>
          </IonItem>
          <IonItem  class="item-1" detail={ false } >
              <IonLabel position="stacked"> Роль </IonLabel>  
              <IonSelect
                  interface="popover"
                  value = { Роль }
                  placeholder="Выбрать..."
                  onIonChange={e => {
                    Роль   = e.detail.value               
                  }}
            >
              <IonSelectOption value = { "Админ" } >
                  Админ
              </IonSelectOption>
              <IonSelectOption value = { "Нет" } >
                  Нет
              </IonSelectOption>            
            </IonSelect>
          </IonItem>
          <IonButton expand="block" onClick={()=>{
              if(Телефон.length > 0) {
                  let params = {};
                    params["ГУИД"] = info === undefined ? "" : info.ГУИД
                    params["Роль"] = Роль
                    params["Телефон"] = Телефон
                    if(info !== undefined)
                      if(ФИО !== info.ФИО) params["ФИО"] = ФИО
                    params["Услуга"] = Услуга

                  updAdmin(params);
                  setPage(0);

              }
          }}>            
            Отправить
          </IonButton>
        </IonList>
      </IonCard>
    </>

    return elem;
  }

  function  Page3(props:{info}):JSX.Element {

    let info = props.info;
    let str = ""
    let elem = <>
      <IonCard>
        <IonCardHeader class="a-center"> {info.Наименование} </IonCardHeader>
        <IonItem  lines="none">
          <IonLabel position="fixed"> Тариф: </IonLabel>
  
              <IonInput type="number" placeholder="Изменить" onIonChange={(e)=>{
                str = (e.detail.value as string);
              }}/>
  
          <IonButton class="but-3" slot="end" fill="clear" onClick={()=>{
            if(str === undefined) return;
            if(str.length === 0) return

            Store.dispatch({
              type: "upd_serv", 
              Наименование: info.Наименование, 
              Тариф: parseFloat(str)});

            setPage(0)
          }}>
            <IonIcon icon= { saveOutline } slot="icon-only"/>
          </IonButton>
        </IonItem>
      </IonCard>

      {/* <Execs info={Store.getState().Исполнители}/> */}

    </>

    return elem;
  }

  async function updExec(params){
  
    let jarr = Store.getState().Исполнители;

    var commentIndex = jarr.findIndex(function(b) { 
        return b.ГУИД === params.ГУИД 
    });
    if(commentIndex >= 0){ 
      if(params.Роль === "Нет"){
        jarr.splice(commentIndex, 1)
        Store.dispatch({type:"exec", data: jarr})
        params.Роль = "Исполнитель";
        params.УдалитьРоль = true;
        getData("У_Регистрация", params);
      }
    } else {
      if(params.Роль !== "Нет") {
        let res = await getData("У_Регистрация", params)  
        if((res.Код === 100)||(res.Код === 101)){
          let jarr = Store.getState().Исполнители;
          console.log(jarr)

          commentIndex = jarr.findIndex(function(b) { 
            return b.ГУИД === res.Данные.ГУИД 
          });
          if(commentIndex >= 0){ 

          } else {
            params.ГУИД = res.Данные.ГУИД
            params.ФИО = res.Данные.ФИО
            params.Телефон = res.Данные.Телефон
            res = await Store.dispatch({type: "add_exec", data: params}) 
            Store.dispatch({type: "ex_ec"})
          }

        }
      }
    
    }

  }  

  async function updAdmin(params){
  
    let jarr = Store.getState().Администраторы;

    var commentIndex = jarr.findIndex(function(b) { 
        return b.ГУИД === params.ГУИД 
    });
    if(commentIndex >= 0){ 
      if(params.Роль === "Нет"){
        jarr.splice(commentIndex, 1)
        Store.dispatch({type:"adm", data: jarr})
        params.Роль = "Админ";
        params.УдалитьРоль = true;
        getData("У_Регистрация", params);
      }
    } else {
      if(params.Роль !== "Нет") {
        let res = await getData("У_Регистрация", params)  
        if((res.Код === 100)||(res.Код === 101)){
          let jarr = Store.getState().Администраторы;

          commentIndex = jarr.findIndex(function(b) { 
            return b.ГУИД === res.Данные.ГУИД 
          });
          if(commentIndex >= 0){ 

          } else {
            params.ГУИД = res.Данные.ГУИД
            params.ФИО = res.Данные.ФИО
            params.Телефон = res.Данные.Телефон
            res = await Store.dispatch({type: "add_adm", data: params}) 
            Store.dispatch({type: "ex_ec"})
          }
        }
      }
    
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
      case 0:   return <Page1 />
      case 11:  return <Page21  info = { param }/>      
      case 12:  return <Page22  info = { param }/>      
      case 2:   return <Page3   info = { param }/>    
      default:  return <></>
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
        <Content page = {page} />
      </IonContent>
      <IonAlert
          isOpen={ alert }
          onDidDismiss={() => setAlert(false)}
          cssClass='my-custom-class'
          header={'Исполнители'}
          inputs={[
            {
                name: 'radio1',
                type: 'radio',
                label: 'Завершено',
                value: 'Завершено',
                checked: true
              },
              {
                name: 'radio2',
                type: 'radio',
                label: 'В ожидании',
                value: 'В ожидании'
              },
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                
              }
            },
            {
              text: 'Ok',
              handler: (data) => {

              }
            }
          ]}
        />

    </IonPage>
  );
};

export default Tab3;
