// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file

//gets the prodnum and checks runs the check score function



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'prodNum') {
        checkScore(message);
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});


//the score values and urls for the popup to access
var dnScore = '';
var aperitifScore = '';

var aperitifUrl ='';
var dnUrl = '';


//Creates a url to different databases based on the prodnum, and runs it in the load function
function checkScore(request){
   let varenummer = request.text;
   console.log(varenummer)

   aperitifUrl = 'https://www.aperitif.no/pollisten?minPrice=&maxPrice=&q='+varenummer+'&sortBy=editorial_rating&offset=0'
   load(aperitifUrl , getScoreApertif);
   dnUrl = 'https://www.dn.no/smak/vinsok/?q='+varenummer+'&fromDate=&toDate=&useFromToDate=false&sort=reld&dateField=&facets=%7Bcm%7Dwine_available_cust%3Awaf%7Cavailable&_facets=on'
   load(dnUrl, getScoreDN);
  };

//extracts the score from the apertif search site.
function getScoreApertif( site ){
  scorePos = site.search('rating-points') + 12;
  score = site[scorePos+3] + site[scorePos+4];
  if(checkValue(score[0])){
    aperitifScore = score;
    sendScore('popup', 'aperitif', score, site)
  }
  else {
    aperitifScore = '';
  }
  console.log(aperitifScore);
}

//Used as a function to extract the score from the SMAK database
function getScoreDN( site ){
  scorePos = site.search('Poeng:') + 13;
  score = site[scorePos + 2] + site[scorePos + 3];
  if(checkValue(score[0])){
    dnScore = score;
    sendScore('popup', 'dn', score, site)
  }
  else {
    dnScore = '';
  }
  console.log(dnScore);
}

//load function that gets string format of the input url, and runs string in callbackfunction
function load(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  }
  xhr.open('GET', url, true);
  xhr.send('');
}

//checks if the score is valid number.
function checkValue(value){
  var values = ['0','1','2','3','4','5','6','7','8','9']
  if(values.includes(value)){
    return true;
  }
  else{
  return false;
  }
}


/*
function sendScore(layer, site, score, url){
  let message = {
        type: layer,
        author: site,
        poeng: score,
        link: url
    }
    chrome.runtime.sendMessage(message);
}
*/
