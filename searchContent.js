console.log("searchContent running ");

var dnLogo = 'https://www.dn.no/skins/dn/gfx/SmakLogo.png';
var aperitifLogo = 'https://static.gfx.no/images/main/aperitif.png';

//console.log(aperitifLogo);
init()


function init(){
  var produktliste = document.querySelectorAll("#search-results > ul");

  try{
    if(produktliste == null) throw ("tom produktliste");
  } catch(err) {
    console.log(err);
    return;
  }

  console.log("Produktliste:"+ produktliste );

  var i;
  for(i = 0; i < produktliste.length; i++){
    var produkt = produktliste[i];
    console.log(produkt);
    varenummer = produkt.getElementsByClassName('product-item__tool-favorite js-favorite').item(0).dataset.productCode;
    console.log(varenummer);
    sendVarenummer(varenummer);
    if(i == produktliste.length - 1){
      zoom();
    }
  }
  //to fix dug- where the graphic overlaps due to the html injection
  //document.addEventListener("DOMContentLoaded", zoom());

}

function sendVarenummer( varenummer){
  let message = {
        type: 'prodNum',
        vareNr: varenummer
    }
    chrome.runtime.sendMessage(message);
    console.log('ProdNr sent: ' + varenummer);
}


function insertScore(vareNr, db, score, url){

  if(db == 'dn'){
    bilde = 'https://www.dn.no/skins/dn/gfx/SmakLogo.png';
  }
  else {
    bilde = 'https://static.gfx.no/images/main/aperitif.png';
  }

// produkt where vareNr = getElementsByClassName("product-item__inner-container").item(0)
  produkt = produkt.getElementsByClassName("product-item__inner-container").item();


  var e = document.createElement('div');
  e.setAttribute('style', 'text-align:center;')


  //create link congfig
  var a = document.createElement('a');
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
  d.setAttribute('style', 'font-family: Playfair Display; font-size: 12pt;');
  d.innerText = score + '/100'
  e.appendChild(d);

  produkt.insertBefore(e, produkt.children[1]);
  //console.log(produkt);

}

//Lytter etter score meldinger og sender videre til insert score
chrome.runtime.onMessage.addListener(function(message) {
  console.log('Score recieved ' + message.score + ' for product:' + message.vareNr);

    if(message.type === 'score') {
        insertScore(message.vareNr, message.db, message.score, message.url);
    }

});


function zoom() {
  console.log('*pover aa fikse displaybugs*');
        if(document.body.style.zoom != "101%"){
            document.body.style.zoom = "101%"}
        else{
          document.body.style.zoom = "100%"
        }
}

//document.addEventListener("DOMContentLoaded", zoom());

//if (document.readyState === "loading") {  // Loading hasn't finished yet
//document.addEventListener("DOMContentLoaded", zoom());
//} else {  // `DOMContentLoaded` has already fired
//zoom();
//}
