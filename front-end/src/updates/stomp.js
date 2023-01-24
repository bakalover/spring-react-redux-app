'use strict';


function register(registrations) {

  let SockJS = require('sockjs-client');
  let Stomp = require('stompjs');
  let token = "token:"+JSON.parse(localStorage.getItem('userWl4')).token;
  // let client = Stomp.client('ws://localhost:8080/entities');
  // client.connect({'Authorization':token}, function(frame) {
  //   registrations.forEach(function (registration) {
  //     client.subscribe(registration.route, registration.callback);
  //   });
  // });

  let socket = new SockJS('http://localhost:8080/entities');
  let stompClient = Stomp.over(socket);

  stompClient.connect({},function(frame) {
    registrations.forEach(function (registration) {
      stompClient.subscribe(registration.route, registration.callbackfunc);
    });
  });
}

module.exports.register = register;
