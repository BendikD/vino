console.log("Extention running")

chrome.runtime.sendMessage({type:'showPageAction'});

function getVarenummer(){
    var url = window.location.pathname.split('/');
    var varenummer = url[url.length- 1];
    return varenummer;
}

function sendVarenummer( varenummer ){
  let message = {
        type: 'prodNum',
        text: varenummer
    }
    chrome.runtime.sendMessage(message);
}
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
//skal ikonene ligge lokalt??
