import { combineReducers  } from 'redux'
import axios from 'axios'

export async function getData(url : string, params: any){

    let user = "У_Админ"
    let password = ""

    let res = await axios.post(
        URL + url
        ,params
        ,{
          auth: {
            username: unescape(encodeURIComponent(user)),
            password: unescape(encodeURIComponent(password))
          }
        } 
      ).then(response => response.data)
      .then((data) => {
          console.log(url)
          console.log(data);
          if(data.Код === 200) console.log(data) 
          return data
      }).catch(error => {
        console.log(error)
        return {Код: 200, Описание: error}
      })

    return res

}

interface           t_login {
    ГУИД:       string,
    Телефон:    string,
    Пароль:     string,    
    Пароль1:    string,
    СМС:        string,
}

export interface    t_info {
    ГУИД:           string,
    Дата:           string,
    Номер:          string,
    Услуга:         string,
    Адрес:          string,
    Статус:         string,
    Сумма:          number,
    Телефон:        string,
    Описание:       string,
    Исп:            string
}

export interface    t_exec {
    ГУИД:       string,
    Услуга:     string,
    Телефон:    string,
    ФИО:        string,
}

export interface    t_hist {
    Дата:       string,
    Тариф:      number,
}

export interface    t_serv {
    ГУИД:           string,
    Наименование:   string,
    Тариф:          number,
    Роль:           string,
}

interface           i_type {
    auth:   boolean,
    Логин:   t_login,

    Услуги:         Array<t_serv>,
    Заявки:         Array<t_info>,
    Задания:        Array<t_info>,

    Исполнители:    Array<t_exec>,
    Администраторы: Array<t_exec>,

    phone:          string,
    addr:           string,
    descr:          string,

    Документы:      Array<t_info>
}

const       i_state: i_type | any = {

    auth:   false,

    Логин: {
        ГУИД:       "",
        Телефон:    "",
        Пароль:     "",        
        Пароль1:    "",
        СМС:        "",
        Роль:       "",
    },

    Услуги:         [],
    Заявки:         [],    
    Задания:        [],

    Исполнители:    [],
    Администраторы: [],

    phone:          "",
    addr:           "",
    descr:          "",

    Документы:      []
}

function    auReducer(state = i_state.auth, action) {
    switch(action.type){
        case "auth": {
            return action.auth
        }
        default: return state;
    }
}

function    lgReducer(state = i_state.Логин, action) {
    switch(action.type){
        case "login": {
            return {
                ГУИД:       action.ГУИД === undefined ? state.ГУИД : action.ГУИД,                
                Телефон:    action.Телефон === undefined ? state.Телефон : action.Телефон,                
                Пароль:     action.Пароль === undefined ? state.Пароль : action.Пароль,                
                Пароль1:    action.Пароль1 === undefined ? state.Пароль1 : action.Пароль1,                
                СМС:        action.СМС === undefined ? state.СМС : action.СМС,                      
                Роль:       action.Роль === undefined ? state.Роль : action.Роль,                      
            }
        }
        default: return state;
    }
}

function    inReducer(state = i_state.Заявки, action) {
    switch(action.type){
        case "doc": return action.data        
        case "add_doc": return [...state, action.data]
        case "upd_doc":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Статус:     action.data.Статус, 
                    Телефон:    action.data.Телефон,
                    Описание:   action.data.Описание, 
                    Адрес:      action.data.Адрес
                }
            }
            return todo
          })  
        case "cl_doc": return []
        default: return state
    }
}

function    isReducer(state = i_state.Задания, action) {
    switch(action.type){
        case "usl": return action.data        
        case "add_usl": return [...state, action.data]
        case "upd_usl":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Статус:     action.data.Статус
                }
            }
            return todo
          })  
        case "cl_usl": return []
        default: return state
    }
}

function    exReducer(state = i_state.Исполнители, action){
    switch(action.type){
        case "exec": return action.data        
        case "add_exec": return [...state, action.data]
        case "upd_exec":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Телефон:    action.data.Телефон,
                    ФИО:        action.data.ФИО, 
                    Услуга:     action.data.Услуга
                }
            }
            return todo
          })  
        case "cl_exec": return []
        default: return state
    }
}

function    adReducer(state = i_state.Администраторы, action){
    switch(action.type){
        case "adm": return action.data        
        case "add_adm": return [...state, action.data]
        case "upd_adm":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Телефон:    action.data.Телефон,
                    ФИО:        action.data.ФИО, 
                    Услуга:     action.data.Услуга
                }
            }
            return todo
          })  
       case "cl_adm": return []
        default: return state
    }
}

function    usReducer(state = i_state.Услуги, action){
    switch(action.type){
        case "serv": return action.data        
        case "upd_serv": return state.map((todo : any) => { 
            if (todo.Наименование === action.Наименование) {
              return { ...todo, Тариф: action.Тариф }
            }
            return todo
          })          
        case "cl_serv": return []
        default: return state
    }
}

function    phReducer(state = i_state.phone, action:any) {
    switch(action.type){
        case "phone": {
            return action.phone
        }
        default: return state;
    }
}

function    dsReducer(state = i_state.descr, action:any) {
    switch(action.type){
        case "descr": {
            return action.descr
        }
        default: return state;
    }
}

function    adrReducer(state = i_state.addr, action:any) {
    switch(action.type){
        case "addr": {
            return action.addr
        }
        default: return state;
    }
}

function    dcReducer(state = i_state.Документы, action) {
    switch(action.type){
        case "docs": return action.data        
        case "upd_docs":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Исп:        action.data.Исполнитель,
                }
            }
            return todo
          })  
        case "cl_docs": return []
        default: return state
    }
}

const       rootReducer = combineReducers({

    auth:           auReducer,
    Логин:          lgReducer,

    Услуги:         usReducer,
    Заявки:         inReducer,    
    Задания:        isReducer,

    Исполнители:    exReducer,
    Администраторы: adReducer,

    descr:          dsReducer,
    addr:           adrReducer,
    phone:          phReducer,

    Документы:      dcReducer,

})


 function    create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var upd_listener1 = () => {};    
    var upd_listener2 = () => {};
    var upd_listener3 = () => {};    

    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            //console.log(action);
            currentState = currentReducer(currentState, action);
            if(action.type.indexOf("usl")  > -1) {upd_listener1();upd_listener2()}
            if(action.type.indexOf("doc")  > -1) {upd_listener1();upd_listener2()}
            if(action.type === "ex_ec") upd_listener3();
            return currentState;
        },
        upd_subscribe1(newListener: any) {
            upd_listener1 = newListener;
        },
        upd_subscribe2(newListener: any) {
            upd_listener2 = newListener;
        },        
        upd_subscribe3(newListener: any) {
            upd_listener3 = newListener;
        },
    };
}


export const Store = create_Store(rootReducer, i_state)
export const URL = " https://mfu24.ru/lombard/hs/MyAPI/V1/"

export async function getDatas(){
    let params = { ГУИД: Store.getState().Логин.ГУИД }
    let res;
    res = await getData("У_Услуги", params)
    if(res.Код === 100){
        Store.dispatch({type: "doc", data: res.Данные})
    }

    res = await getData("У_Задания", params)
    if(res.Код === 100){
        Store.dispatch({type: "usl", data: res.Данные})
    }

    res = await getData("У_Исполнители", params)
    if(res.Код === 100){
        Store.dispatch({type: "exec", data: res.Данные})
        Store.dispatch({type: "ex_ec"})
    }

    res = await getData("У_Администраторы", params)
    if(res.Код === 100){
        Store.dispatch({type: "adm", data: res.Данные})
        Store.dispatch({type: "ex_ec"})
    }

    res = await getData("У_Документы", params)
    if(res.Код === 100){
        Store.dispatch({type: "docs", data: res.Данные})
        Store.dispatch({type: "ex_ec"})
    }
 
}