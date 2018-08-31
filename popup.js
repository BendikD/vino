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
    updateScores('aperitifScoreParagraph', aperitifScore, 'aperitif-link', aperitifUrl);
}
if(dnScore != ''){
  updateScores('dnScoreParagraph', dnScore, 'dn-link', dnUrl);

}


function updateScores(id, score, linkId, url){

  Selement = document.getElementById(id);
  Selement.innerHTML = score;

  Lelement = document.getElementById(linkId);
  Lelement.href = url;
  Lelement.target = "_blank";
}


function updateScores(id, score, linkId, url, bilde){

  var p = document.createElement("p");
  p.appendChild(document.createElement("a").href)


  var element = document.getElementById("Scores");
  element.appendChild(p)



}


/*
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.type === 'popup') {
      //type(layer), author, poeng, link
        console.log('meldingen er mottatt');
        updateScores(message);

    }
});

//updateScores('ap', aperitifUrl, aperitifScore);
//updateScores('dn', dnUrl, dnScore);

function updateScores(message){
  element = document.getElementById(message.author);
  element.innerHTML= message.poeng;
  element.href = message.link;
  element.target = "_blank";
}
*/
