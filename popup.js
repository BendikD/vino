// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';

console.log('Popup running');

var background = chrome.extension.getBackgroundPage()

var aperitifScore = background.aperitifScore;
var aperitifUrl = background.aperitifUrl;
var dnScore = background.dnScore;
var dnUrl = background.dnUrl;

if(aperitifScore != ''){

  updateScores('ap', aperitifScore, aperitifUrl, 'images/aperitifFull.png')
}
if(dnScore != ''){

  updateScores('dn', dnScore, dnUrl, 'images/SmakLogo.png')
}



function updateScores( id, score, url, bilde){

  var p = document.createElement('p');

  var a = document.createElement('a');
  a.setAttribute('id', id);
  a.setAttribute('href', "https://www.vg.no/");
  a.setAttribute('targets', '_blank');

  var node = document.createTextNode(' : ' + score);
  var scale = document.createElement('var');
  scale.innerHTML = '/100';

  var img = document.createElement('img');
  img.setAttribute('src',  bilde);
  a.appendChild(img);

  p.appendChild(a);
  p.appendChild(node);
  p.appendChild(scale);

  main = document.getElementById('Scores');
  main.appendChild(p);

}


/*
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.type === 'popup') {
      //type(layer), author, poeng, link
        console.log('meldingen er mottatt');
        updateScores(message);

    }
});

*/
