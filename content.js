console.log("Extention running")

chrome.runtime.sendMessage({type:'showPageAction'});

checkScore(getVarenummer());


//fetches the productnumber from url, which is the last section of the url on the vinmonopolet site.
function getVarenummer(){
    var url = window.location.pathname.split('/');
    var varenummer = url[url.length- 1];
    return varenummer;
}

//sends the productnumber to the backgroundscript
function sendVarenummer( varenummer ){
  let message = {
        type: 'prodNum',
        text: varenummer
    }
    chrome.runtime.sendMessage(message);
}

//inits
//sendVarenummer(getVarenummer());


function insertScore(id, score, url, bilde){

  var cList = document.getElementsByClassName('list-unstyled product-characteristics').item(0);

  var e = document.createElement('li');
  e.setAttribute('id', id);
  e.setAttribute('style', 'text-align:center;')


  //create link congfig
  var a = document.createElement('a');
  a.setAttribute('id', id);
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');

  //create image
  var img = document.createElement('img');
  img.setAttribute('src',  bilde);
  img.setAttribute('style', " width:55px; height:auto;")
  a.appendChild(img);


  e.appendChild(a);

  var d = document.createElement('div');
  d.setAttribute('class', 'pie');
  d.setAttribute('style', 'font-family: Playfair Display; font-size: 14pt;');
  d.innerHTML = score + '/100'
  e.appendChild(d);

  cList.appendChild(e);

}


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
    insertScore('ap', score , url , 'https://static.gfx.no/images/main/aperitif.png')
  }
  else {
    noScoreFound();
  }

}

//Used as a function to extract the score from the SMAK database
function getScoreDN( site , url){
  scorePos = site.search('Poeng:') + 13;
  score = site[scorePos + 2] + site[scorePos + 3];
  if(checkValue(score[0])){
    //dnScore = score;

    insertScore('dn', score, url, 'https://www.dn.no/skins/dn/gfx/SmakLogo.png')
  }
  else {
    dnUrl='';
    noScoreFound();
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

function noScoreFound(){
  console.log('No score');
  //var p = document.createElement('var')

  //p.innerHTML = 'Mangler score'

  //append p in score list
 //  main = document.getElementById('');
  //main.appendChild(p);

}
