function supportFS(){
	window.requestFileSystem = window.requestFileSystem || 
                           window.webkitRequestFileSystem;
	if (window.requestFileSystem) {
	 window.alert("yes");
	} else {
	 window.alert("not");
	}
}