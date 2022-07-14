/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event TEST: ' + id);
        
        var Puship = window.plugins.puship;
        Puship.EnableLog = true;
        Puship.PushipAppId = "kTOEmZLZ2WvGUxO"; // I.E.: puship_id = "h1mCVGaP9dtGnwG"
        
        Puship.Common.OnPushReceived(function(event) {
                                     console.log("Push received TEST");
                                     navigator.notification.alert("Message: " + event.notification.Alert);
                                     
                                     console.log("Alert: " + event.notification.Alert);                                       console.log("Sound: " + event.notification.Sound);
                                     console.log("Badge: " + event.notification.Badge);
                                     //console.log("Param1: " + event.notification.Param1);
                                     
                                     });
        
        if (Puship.Common.GetCurrentOs()==Puship.OS.ANDROID){
            var GCMCode = your_sender_id; // This is the senderID provided by Google. I.E.: "28654934133"
            Puship.GCM.Register(GCMCode,
                                {
                                successCallback: function (pushipresult){
                                navigator.notification.alert("device registered with DeviceId:" + pushipresult.DeviceId);
                                },
                                failCallback: function (pushipresult){
                                navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
                                }
                                });
        } else if (Puship.Common.GetCurrentOs()==Puship.OS.IOS){
            Puship.APNS.Register(
                                 {
                                 successCallback: function (pushipresult){
                                 navigator.notification.alert("device registered with DeviceId:" + pushipresult.DeviceId);
                                 },
                                 failCallback: function (pushipresult){
                                 navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
                                 }
                                 });
        } else if (Puship.Common.GetCurrentOs()==Puship.OS.WP){
            Puship.WP.Register(
                               {
                               successCallback: function (pushipresult){
                               navigator.notification.alert("device registered with DeviceId:" + pushipresult.DeviceId);
                               },
                               failCallback: function (pushipresult){
                               navigator.notification.alert("error during registration: "+ JSON.stringify(pushipresult));
                               }
                               });
        } else {
            Console.log("Not supported platform");
        }
        
        
        
    }
};

app.initialize();