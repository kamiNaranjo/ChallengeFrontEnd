/**
 * @File to manage the response view
 * @author Maria Camila Naranjo <cami.tsuki@gmail.com>
 * @version 0.1
 */
 
/**
  * Method that show subItems on mobile and desktop view
  *
  * @param {eveentElement} elementClicked - Element clicked
*/
function showSubItems(elementClicked) {
  hideSubMenu();
  clearParentsOfSubMenuMobile();
  document.getElementById('headLineDesktop').style.zIndex = "-1";
  document.getElementById('bodyCopy').style.zIndex = "-1";
  elementClicked.nextSibling.classList.toggle("show");
  elementClicked.parentNode.className = "dropdown-active";
}

/**
  * Method to hide subMenuElemente
  *
*/
function hideSubMenu(){
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var d = 0; d < dropdowns.length; d++) {
    var openDropdown = dropdowns[d];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

/**
  * Method that reset to initial state submenu's parent
  *
*/
function clearParentsOfSubMenuMobile(){
  var dropUp = document.getElementsByClassName("dropdown-active");
  for(var i = 0; i < dropUp.length; i++)  {
    dropUp[i].className = "dropdown";
  }
}

/**
  * Method that allows expand or collapse hamburger and change the style for navBar
  *
*/
function showMobileMenu() {
  var nav = document.getElementById("navBar");
  if (nav.className === "topNav") {
      nav.className += "navMobile";
      openNav();
  } else {
      nav.className = "topNav";
      closeNav();
  } 
}

/**
  * Method that allows expand or collapse subMenu
  *
*/
function subItems(elementClicked){
  if(elementClicked.parentNode.classList.contains('dropdown')){
    showSubItems(elementClicked);
  }else{
    hideSubMenu();
    clearParentsOfSubMenuMobile();
  }
}

/**
  * Method that collapse subMenu
  *
*/
function closeSubItem(event) {
  if (!event.target.matches('.dropbtn')) {
    hideSubMenu();
    document.getElementById('headLineDesktop').style.zIndex = "0";
    document.getElementById('bodyCopy').style.zIndex = "0";  
    if(document.body.clientWidth < 768){
      showMobileMenu();
    }
  }
}

/**
  * Method that expand hamburger
  *
*/
function openNav() {
  var size = document.body.clientWidth - 72;
  document.getElementById("itemsNav").style.width = size.toString() + "px";
  document.getElementById("bodyContent").style.marginLeft = size.toString() + "px";
  document.getElementById("bodyContent").style.width = document.body.clientWidth.toString() + "px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.5)";
}

/**
  * Method that collapse hamburguer
  *
*/
function closeNav() {
  document.getElementById("itemsNav").style.height = "60px";
  document.getElementById("bodyContent").style.marginLeft= "0";
  document.getElementById("itemsNav").style.width = "60px";
  document.body.style.backgroundColor = "#ffffff";
}