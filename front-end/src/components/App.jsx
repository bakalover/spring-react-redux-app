import React, { useState, useEffect } from 'react';
import HeaderContainer from './Header/HeaderContainer';
import TitleHelmet from './common/TitleHelmet'
import MainContent from './MainContent/MainContent';
import IndexContent from './IndexContent/IndexContent'
import Preloader from './Preloader/Preloader';
import stompClient from "../updates/stomp";

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      props.initializeAuth();
      setIsLoaded(true);
    }
  }, [isLoaded, props]);

  if (props.isLoading) {
    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Загрузка..." />
        <Preloader />
      </div>

    );
  } else if (props.loggedUser) {

    let callbackEntity = function(message) {
      if (message.body) {
        props.addEntry(JSON.parse(message.body));
      }
       else {
        console.log("empty websock message");
      }
    };
    let stompClient = require('../updates/stomp');
    stompClient.register([
      {route: '/topic/newEntity', callbackfunc: callbackEntity},
    ]);

    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Основная страница" />
        <MainContent />
      </div>
    );

    if (props.logout){

    }
   } else {
    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Страница авторизации" />
        <IndexContent />
      </div>
    );
  }
 }

export default App;
