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

  updateScores('aperitif-link', aperitifScore, aperitifUrl, 'images/aperitifFull.png')
}
if(dnScore != ''){

  updateScores('dn-link', dnScore, dnUrl, 'images/SmakLogo.png')
}
else {
  noScoreFound();
}



function updateScores( id, score, url, bilde){

  var p = document.createElement('p');

  //create link congfig
  var a = document.createElement('a');
  a.setAttribute('id', id);
  a.setAttribute('href', url);
  a.setAttribute('targets', '_blank');
  //a.setAttribute('onclick', 'myHandle(this)');


  //create image
  var img = document.createElement('img');
  img.setAttribute('src',  bilde);

  //put img in link
  a.appendChild(img);

  //create score element
  var node = document.createElement('object')
  node.innerHTML = ' : ' + score;
  
  //create scale
  var scale = document.createElement('var');
  scale.innerHTML = '/100';

  //append above elements in p
  p.appendChild(a);
  p.appendChild(node);
  p.appendChild(scale);

  //append p in score list
  main = document.getElementById('Scores');
  main.appendChild(p);
}

function noScoreFound(){
  console.log('No score');
  var p = document.createElement('var')

  p.innerHTML = 'Mangler score'

  //append p in score list
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
