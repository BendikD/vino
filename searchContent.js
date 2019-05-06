console.log("searchContent running ");

var dnLogo = 'https://www.dn.no/skins/dn/gfx/SmakLogo.png';
var aperitifLogo = 'https://static.gfx.no/images/main/aperitif.png';

//console.log(aperitifLogo);


init();

function init(){
  var produktliste = document.getElementsByClassName("product-list product-list--grid-view").item(0).getElementsByClassName("product-item");
  var i;
  //console.log(produktliste);
  console.log(produktliste.length);
  for(i = 0; i < produktliste.length; i++){
    var produkt = produktliste.item(i);
    console.log(produkt);
    varenummer = produkt.getElementsByClassName('product-item__tool-favorite js-favorite').item(0).dataset.productCode;
    console.log(varenummer);
    checkScore(varenummer, produkt);
    if(i == produktliste.length - 1){
      zoom();
    }
  }
  //to fix dug- where the graphic overlaps due to the html injection
  //document.addEventListener("DOMContentLoaded", zoom());



}

var testElement = document.getElementsByClassName("product-list product-list--grid-view").item(0).getElementsByClassName("product-item").item(0);

function insertScore(produkt, score, url, bilde){

  produkt = produkt.getElementsByClassName("product-item__inner-container").item(0);


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
  d.innerHTML = score + '/100'
  e.appendChild(d);

  produkt.insertBefore(e, produkt.children[1]);
  //console.log(produkt);

}




function checkScore(varenummer, produkt){
   aperitifUrl = 'https://www.aperitif.no/pollisten?minPrice=&maxPrice=&q='+varenummer+'&sortBy=editorial_rating&offset=0'
   load(aperitifUrl , getScoreApertif, produkt);

   dnUrl = 'https://www.dn.no/smak/vinsok/?q='+varenummer+'&fromDate=&toDate=&useFromToDate=false&sort=reld&dateField=&facets=%7Bcm%7Dwine_available_cust%3Awaf%7Cavailable&_facets=on'
   load(dnUrl, getScoreDN, produkt);

  };


//extracts the score from the apertif search site.
function getScoreApertif( site , url, produkt){
  scorePos = site.search('rating-points') + 12;
  score = site[scorePos+3] + site[scorePos+4];
  if(checkValue(score[0])){
    insertScore(produkt , score , url , aperitifLogo )
  }
  else {
    noScoreFound();
  }

}

//Used as a function to extract the score from the SMAK database
function getScoreDN( site , url, produkt){
  scorePos = site.search('Poeng:') + 13;
  score = site[scorePos + 2] + site[scorePos + 3];
  if(checkValue(score[0])){
    //dnScore = score;

    insertScore(produkt, score, url, dnLogo)
  }
  else {
    dnUrl='';
    noScoreFound();
  }

}

//load function that gets string format of the input url, and runs string in callbackfunction
function load(url, callback, produkt) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response, url, produkt);
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
  console.log('Mangler Rating');
}



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
