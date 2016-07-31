/**
 * @File for managment jsonObject
 * @author Maria Camila Naranjo <cami.tsuki@gmail.com>
 * @version 0.1
 */

function getJson(){
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	if (window.requestFileSystem) {
		alert("si");
	} else {
		alert("no");
	}
}

function getFileWithAjax(){
	var xmlhttp = new XMLHttpRequest();
	var url = "/api/nav.json";
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var itemsArray = jsonToArray(xmlhttp.responseText);
	        var listNav = '<ul>' + arrayLinksToHtmlLinks(true,itemsArray[0]) 
	        + '<li class="hamburger"><a href="javascript:void(0);"><img src="/images/hamburger.png" alt="Hamburger menu" height="20" width="24" onclick="showMobileMenu();"></a></li>'
	        +'</ul>';
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
   * Method that transforms arrays objects to html links
   *
   * @param {Object} array - The array with the data to show as a list.
   */
function arrayLinksToHtmlLinks(isFather, itemsArray) {
    var listItems = "";
    for(var i = 0; i < itemsArray.length; i++) {
    	var urlItem = "";
    	var labelItem = "";
    	var items = itemsArray[i];
    	if(items != null){
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
    		if(subItems == ""){
    			if(isFather){
    				listItems += '<li><a target="_blank" href="'+ urlItem + '">' + labelItem + '</a></li>'
    			}else{
    				listItems += '<a target="_blank" href="'+ urlItem + '">' + labelItem + '</a>';
    			}
    		}else{
    			listItems += '<li class="dropdown">';
    			listItems += '<a href="javascript:void(0);" class="dropbtn" onclick="showSubItems(this)">' + labelItem + '</a>';
    			listItems += '<div class="dropdown-content">';
	    		listItems += subItems;
	    		listItems += '</div>';
	    		listItems += '</li>'
    		}
    	}
    }
    return listItems;
}

function showMobileMenu() {
    var x = document.getElementById("navBar");
    if (x.className === "topNav") {
        x.className += "navMobile";
    } else {
        x.className = "topNav";
    }
}


function showSubItems(elementClicked) {
	hideSubMenu();
	document.getElementById('headLineDesktop').style.zIndex = "-1";
	document.getElementById('bodyCopyDesktop').style.zIndex = "-1";
	document.getElementById('bodyCopyMobile').style.zIndex = "-1";
    elementClicked.nextSibling.classList.toggle("show");
}

function closeSubItem(event) {
  	if (!event.target.matches('.dropbtn')) {
	    hideSubMenu();
	    document.getElementById('headLineDesktop').style.zIndex = "0";
		document.getElementById('bodyCopyDesktop').style.zIndex = "0";
		document.getElementById('bodyCopyMobile').style.zIndex = "0";

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