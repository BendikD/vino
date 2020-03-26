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


//Creates a array of numbers
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}


//Creates a url to different databases based on the prodnum, and runs it in the load function
function checkScore(varenummer){
   aperitifUrl = 'https://www.aperitif.no/pollisten?minPrice=&maxPrice=&q='+varenummer+'&sortBy=editorial_rating&offset=0'
   load(aperitifUrl , getScoreApertif, varenummer);

   dnUrl = 'https://www.dn.no/smak/vinsok/?q='+varenummer+'&fromDate=&toDate=&useFromToDate=false&sort=reld&dateField=&facets=%7Bcm%7Dwine_available_cust%3Awaf%7Cavailable&_facets=on'
   load(dnUrl, getScoreDN, varenummer);

  };

//extracts the score from the apertif search site.
function getScoreApertif( site , url, vareNr){
  scoreElement = site.querySelector("#main > form > div > section.item-column.column.three-fourths > div.item-list > div > a > div > span > span.rating-points");
  score = scoreElement.innerText;

  try{
    if(scoreElement == null) throw ("Ingen Score AP");
    if(!range(101).includes(Number(score))) throw ("AP Score error")
  } catch(err) {
    console.log(err);

  }

     sendScore('ap', url, score, vareNr)

  }


//Used as a function to extract the score from the SMAK database
function getScoreDN( site , url, vareNr){
  site.querySelector("#vin-search-app > div.vrs-article__body > div > div > div.vrs-content-block__vin-resultbody > table > tbody > tr > td:nth-child(5)")
  scoreElement = site.querySelector("#vin-search-app > div.vrs-article__body > div > div > div.vrs-content-block__vin-resultbody > table > tbody > tr > td:nth-child(5)");
  score = scoreElement.innerText;

  try{
    if(scoreElement == null) throw ("Ingen Score DN");
    if(!range(101).includes(Number(score))) throw ("DN Score error")

  } catch(err) {
    console.log(err);
    return;
  }
     sendScore('dn', url, score, vareNr)
  }

//load function that gets string format of the input url, and runs string in callbackfunction
function load(url, callback, vareNr) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response, url, vareNr);
    }
  }
  xhr.open('GET', url, true);
  xhr.responseType = "document";
  xhr.send();
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

function sendScore(db, url, score, vareNr){
  let message = {
    type: 'score',
    db: db,
    url: url,
    score: score,
    vareNr: vareNr
  }


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, message);
});

console.log('sending score to content: ' + score);



}
