console.log("Extention running")

chrome.runtime.sendMessage({type:'showPageAction'});


sendVarenummer(getVarenummer());

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
        vareNr: varenummer
    }
    chrome.runtime.sendMessage(message);
    console.log('ProdNr sent: ' + varenummer);
}


//Lytter etter score meldinger og sender videre til insert score
chrome.runtime.onMessage.addListener(function(message) {
    if(message.type === 'score') {
        insertScore(message.db, message.score, message.url);
    }
    console.log('Score recieved ' + message.score);
});


function insertScore(db, score, url){
  if(db == 'dn'){
    bilde = 'https://www.dn.no/skins/dn/gfx/SmakLogo.png';
  }
  else {
    bilde = 'https://static.gfx.no/images/main/aperitif.png';
  }



  var cList = document.getElementsByClassName('product__image-container').item(0);

  var e = document.createElement('ul');
  e.setAttribute('id', db);
  e.setAttribute('style', 'text-align:center;')


  //create link congfig
  var a = document.createElement('a');
  a.setAttribute('id', db);
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
  d.innerText = score + '/100'
  e.appendChild(d);

  cList.appendChild(e);

}
