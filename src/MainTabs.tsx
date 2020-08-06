import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";
import { readerOutline, listCircleOutline, optionsOutline, documentsOutline } from "ionicons/icons";
import { Store } from "./pages/Store";

const MainTabs: React.FC = () => {
    let tab1 = "", tab2 = "hidden", tab3 = "hidden", tab4 = "hidden", toTab = "/tab1";
    let usl = Store.getState().Услуги;
    usl.forEach(elem => {
      if(elem.Роль === "Админ")         {tab3 = ""; tab4 = ""}
      if(elem.Роль === "Исполнитель")   {tab2 = ""}
    });
    
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to={ toTab } />
        <Route path="/tab1" component={ Tab1 }  />
        <Route path="/tab2" component={ Tab2 } />
        <Route path="/tab3" component={ Tab3 } />        
        <Route path="/tab4" component={ Tab4 } />        
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton class={ tab1 }  tab="tab1" href="/tab1">
          <IonIcon icon={ listCircleOutline } />
          <IonLabel> Услуги </IonLabel>
        </IonTabButton>
        <IonTabButton class={ tab2 }  tab="tab2" href="/tab2">
          <IonIcon icon={ readerOutline } />
          <IonLabel> Задания </IonLabel>
        </IonTabButton>
        <IonTabButton class={ tab4 }  tab="tab4" href="/tab4">
          <IonIcon icon={ documentsOutline } />
          <IonLabel> Заявки </IonLabel>
        </IonTabButton>
        <IonTabButton class={ tab3 }  tab="tab3" href="/tab3">
          <IonIcon icon={ optionsOutline } />
          <IonLabel> Настройки </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
