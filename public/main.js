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
	        var listNav = '<ul><li><a href="/">HUGE</a><li>' + arrayLinksToHtmlLinks(true,itemsArray[0]) + '</ul>';
	        nav =document.getElementById('navBar');
			nav.innerHTML = listNav;
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
    				listItems += '<li><a href="'+ urlItem + '">' + labelItem + '</a></li>'
    			}else{
    				listItems += '<a href="'+ urlItem + '">' + labelItem + '</a>';
    			}
    		}else{
    			listItems += '<li class="dropdown">';
    			listItems += '<a href="'+ urlItem + '" class="dropbtn">' + labelItem + '</a>';
    			listItems += '<div class="dropdown-content">';
	    		listItems += subItems;
	    		listItems += '</div>';
	    		listItems += '</li>'
    		}
    	}
    }
    return listItems;
}

function getSubItems(itemsArray){
	var listItems = "";
    for(var i = 0; i < itemsArray.length; i++) {
    	var urlItem = "";
    	var labelItem = "";
    	var items = itemsArray[i];
    	if(items != null){
    		for(var key in items){
    		var value = items[key];
    		switch(key){
    			case 'url':
    				urlItem = value;
    				break;
    			case 'label':
    				labelItem = value;
    				break;
    			}
    		}
    		listItems += '<li><a href="'+ urlItem + '">' + labelItem + '</a></li>\n';
    	}
    }
    return listItems;
};