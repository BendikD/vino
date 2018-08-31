console.log("Extention running")

chrome.runtime.sendMessage({type:'showPageAction'});


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
sendVarenummer(getVarenummer());




//Motta scores fra background script

//inject scores i HTML dokumentet
//Add  item to li

/*
function addScores(){


  var charistics = document.getElementsByClassName('list-unstyled product-characteristics');
  var title = document.getElementsByClassName('product__hgroup');

  var freshness = charistics.item(2);

  console.log(charistics);
  console.log(freshness);
  console.log(title);
  //console.log(charistics[1])

  var DNscore = document.createElement('li');
  DNscore.appendChild(document.createTextNode('SCORE'));
//  DNscore.appendChild(
//    document.createElement(images/)
  DNscore.setAttribute('class', 'DNscore')
  console.log(DNscore);

  //charistics.appendChild(DNscore);
  title.appendChild(DNscore);
  alert(li.id);
  console.log(charistics)
}
*/
