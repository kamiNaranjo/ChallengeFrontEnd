/**
 * @File for build HTML index file
 * @author Maria Camila Naranjo <cami.tsuki@gmail.com>
 * @version 0.1
 */
 
/**
  * Method for getting NavBar's Element in HTML structure
  *
  * @param {Object} array - The array that contents .
*/

function getNavList(){
  var xmlhttp = new XMLHttpRequest();
  var url = "/api/nav.json";
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var itemsArray = jsonToArray(xmlhttp.responseText);
        var listNav = '<ul>' + arrayLinksToHtmlLinks(true,itemsArray[0]) 
            + '<li class="hamburger">'
            +'<a href="javascript:void(0);">'
            +'<img src="/images/hamburger.png" alt="Hamburger menu" height="20" width="24" onclick="showMobileMenu();">'
            +'</a></li>'
            +'</ul>'
            +'<h3>© 2016 Huge. All Rights Reserved</h3>';
        div =document.getElementById('itemsNav');
        div.innerHTML = listNav;
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

/**
   * Method that transforms json's object to array
   *
   * @param {Object} array - The array that contents .
   */
function jsonToArray(jsonObj){
  var array = [];
  var jsonParser = JSON.parse(jsonObj);
  for(var obj in jsonParser){
      array.push(jsonParser[obj]);
  }
  return array;
}

/**
   * Method that transforms arrays objects to html list structure
   *
   * @param {Object} itemsArray - The array with the data to show as a list.
   * @param {isFather} itemsArray - The array with the data to show as a list.
   */
function arrayLinksToHtmlLinks(isFather, itemsArray) {
    var listItems = "";
    for(var i = 0; i < itemsArray.length; i++) {
      var items = itemsArray[i];
      if(items != null){
        var urlItem = "";
        var labelItem = "";
        var subItems = "";
        for(var key in items){
          var value = items[key];
          switch(key){
            case 'items':
              subItems += arrayLinksToHtmlLinks(false,value);
              break;
            case 'url':
              urlItem = value;
              break;
            case 'label':
              labelItem = value;
              break;
          }
        }
        listItems += setHTMLFormatList(subItems, urlItem, labelItem);
      }
    }
    return listItems;
}

function setHTMLFormatList(subItems, urlItem, labelItem){
  var listItems = "";
  if(subItems == ""){
      listItems = '<li><a target="_blank" href="'+ urlItem + '">' + labelItem + '</a></li>'
    }else{
      listItems += '<li class="dropdown">';
      listItems += '<a href="javascript:void(0);" class="dropbtn" onclick="showSubItems(this)">' + labelItem + '</a>';
      listItems += '<ul class="dropdown-content">';
      listItems += subItems;
      listItems += '</ul>';
      listItems += '</li>';
    }
    return listItems;
}

/*********/

function showMobileMenu() {
    var x = document.getElementById("navBar");
    if (x.className === "topNav") {
        x.className += "navMobile";
        openNav();
    } else {
        x.className = "topNav";
        closeNav();
    }
    
}


function showSubItems(elementClicked) {
  hideSubMenu();
  document.getElementById('headLineDesktop').style.zIndex = "-1";
  document.getElementById('bodyCopy').style.zIndex = "-1";
    elementClicked.nextSibling.classList.toggle("show");
    elementClicked.parentNode.className = "dropdown-active";
}

function closeSubItem(event) {
    if (!event.target.matches('.dropbtn')) {
      hideSubMenu();
      document.getElementById('headLineDesktop').style.zIndex = "0";
    document.getElementById('bodyCopy').style.zIndex = "0";
    }
}

function hideSubMenu(){
  var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var d = 0; d < dropdowns.length; d++) {
        var openDropdown = dropdowns[d];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
  }
}

function openNav() {
  var size = document.body.clientWidth - 72;
    document.getElementById("itemsNav").style.width = size.toString() + "px";
    //document.getElementById("itemsNav").style.height = document.documentElement.clientHeight.toString() + "px";
    document.getElementById("bodyContent").style.marginLeft = size.toString() + "px";
    document.getElementById("bodyContent").style.width = document.body.clientWidth.toString() + "px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("itemsNav").style.height = "60px";
  document.getElementById("bodyContent").style.marginLeft= "0";
    document.getElementById("itemsNav").style.width = "60px";
    document.getElementById("bodyContent").style.zIndex = 1000;
    document.body.style.backgroundColor = "#ffffff";
}