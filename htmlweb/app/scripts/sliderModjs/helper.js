function l(output){	
	console.log('the output is '+ output);
}
function removeClass(id,className){
	var allClassNames = document.getElementById(id).className;
	return allClassNames.replace(' ' + className,'');
}
function addClass(id,className){
	var allClassNames = document.getElementById(id).className;
	return allClassNames + ' ' +  className;
}
function updateClassNamesAdd(getClassEl, theClassNames) {
    var e = document.getElementsByClassName(getClassEl);
    for (var i = 0; i < e.length; i++) {
        e[i].className = e[i].className + theClassNames;
    }
}
function updateClassNamesRemove(getClassEl, theClassNames) {
    var e = document.getElementsByClassName(getClassEl);
    for (var i = 0; i < e.length; i++) {
        e[i].className = e[i].className.replace(' ' + theClassNames, '');
    }
}
function getCSSint(el) {
    var strVal = el.replace('px', '');
    return parseInt(strVal);
}
