// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file

//gets the prodnum and checks runs the check score function


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});


chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'prodNum') {
        checkScore(message.vareNr);
    }
    console.log('prodNum recieved ' + message.vareNr);
});


//Creates a url to different databases based on the prodnum, and runs it in the load function
function checkScore(varenummer){
   aperitifUrl = 'https://www.aperitif.no/pollisten?minPrice=&maxPrice=&q='+varenummer+'&sortBy=editorial_rating&offset=0'
   load(aperitifUrl , getScoreApertif);

   dnUrl = 'https://www.dn.no/smak/vinsok/?q='+varenummer+'&fromDate=&toDate=&useFromToDate=false&sort=reld&dateField=&facets=%7Bcm%7Dwine_available_cust%3Awaf%7Cavailable&_facets=on'
   load(dnUrl, getScoreDN);

  };

//extracts the score from the apertif search site.
function getScoreApertif( site , url){
  scorePos = site.search('rating-points') + 12;
  score = site[scorePos+3] + site[scorePos+4];
  if(checkValue(score[0])){
    //insertScore('ap', score , url , 'https://static.gfx.no/images/main/aperitif.png')
    sendScore('ap', url, score)
  }
  else {
    noScoreFound();
    sendscore('ap','','no score found');
  }

}

//Used as a function to extract the score from the SMAK database
function getScoreDN( site , url){
  scorePos = site.search('Poeng:') + 13;
  score = site[scorePos + 2] + site[scorePos + 3];
  if(checkValue(score[0])){
    //dnScore = score;

    //insertScore('dn', score, url, 'https://www.dn.no/skins/dn/gfx/SmakLogo.png')

    sendScore('dn', url, score);
  }
  else {

    noScoreFound();
    sendScore('dn','', 'no score found');
  }

}

//load function that gets string format of the input url, and runs string in callbackfunction
function load(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response, url);
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

function sendScore(db, url, score){
  let message = {
    type: 'score',
    db: db,
    url: url,
    score: score
  }


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, message);
});

console.log('sending score to content: ' + score);



}

function noScoreFound(){
  console.log('No score');
}
