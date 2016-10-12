define([], function(){ 

    return function () {

      return {
            l: function(output){	
            	console.log('the output is '+ output);
            },
            removeClass: function(id,className){
            	var allClassNames = document.getElementById(id).className;
            	return allClassNames.replace(' ' + className,'');
            },
            addClass: function(id,className){
            	var allClassNames = document.getElementById(id).className;
            	return allClassNames + ' ' +  className;
            },
            updateClassNamesAdd: function(getClassEl, theClassNames) {
                var e = document.getElementsByClassName(getClassEl);
                for (var i = 0; i < e.length; i++) {
                    e[i].className = e[i].className + theClassNames;
                }
            },
            updateClassNamesRemove: function(getClassEl, theClassNames) {
                var e = document.getElementsByClassName(getClassEl);
                for (var i = 0; i < e.length; i++) {
                    e[i].className = e[i].className.replace(' ' + theClassNames, '');
                }
            },
            getCSSint: function(el) {
                var strVal = el.replace('px', '');
                return parseInt(strVal);
            }
        }

    }    

});