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
        var listNav = '<ul>' + arrayLinksToHtmlLinks(itemsArray[0]) 
            + '<li class="hamburger Mobile">'
            +'<a href="javascript:void(0);">'
            +'<img src="/images/hamburger.png"  alt="Hamburger menu" height="20" width="24" onclick="showMobileMenu();">'
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
   * @param {Object} jsonObj - Json with the data to transform in array 
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
   */
function arrayLinksToHtmlLinks(itemsArray) {
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
            subItems += arrayLinksToHtmlLinks(value);
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

/**
   * Method that create the HTML structure list with menu data
   *
   * @param {String} subItems  - String with the list of child if the object has a submenu
   * @param {String} urlItem   - String that contains url target
   * @param {String} labelItem - String that contains label name of the Item
   */
function setHTMLFormatList(subItems, urlItem, labelItem){
  var listItems = "";
  if(subItems == ""){
      listItems = '<li><a target="_blank" href="'+ urlItem + '">' + labelItem + '</a></li>'
    }else{
      listItems += '<li class="dropdown">';
      listItems += '<a href="javascript:void(0);" class="dropbtn" onclick="subItems(this);">' + labelItem + '</a>';
      listItems += '<ul class="dropdown-content">';
      listItems += subItems;
      listItems += '</ul>';
      listItems += '</li>';
    }
    return listItems;
}