
define(['sMods/UIModule'], function(UIModule){
	"use strict";
	return function() {
		var modules;
		return {
			init: function(uiType){
				if(uiType === '4') {
				    uiType = '1';
				}
				if(uiType){    
				    modules = new UIModule();
				    if(uiType == 3){
				    	modules.init(6, 6, 'ui'+uiType);
				    }
				    else {
				    	modules.init(8, 6, 'ui'+uiType);
				    }
				    uiType = parseInt(uiType) + 1;
				}
				else {
				    modules = new UIModule();
				    modules.init(8, 6, 'ui1');
				    var uiType = 1;
				}
				this.getTooltip();
				this.loadJquery(this);
			},

		setButtonValue: function (id) {
		    var buttonID = id.match(/[0-9]+/g);
		    if (modules.uiType == 'ui3') {
		        modules.setButtonValueYN(buttonID);
		    }
		    else {
		        modules.setButtonValue(buttonID);
		    }
		},
		setSliderValue: function (ui, id) {
		    var sliderID = id.match(/[0-9]+/g);
		    if (modules.uiType == 'ui1') {
		        modules.setSliderValue(ui.value, sliderID);
		    }
		    else {
		        modules.setSliderYNValue(ui.value, sliderID);
		    }
		},
		getTooltip: function() {
			var updateToolTip = modules.getTooltip();
			updateToolTip.setModules(modules);
		},
		updateChartPosition : function(ui, id) { modules.updateChartPositions(id);},
		changeSlider: function() {
		    //document.getElementById('screenSize').innerHTML = $(window).width();
		    $('body').trigger('click');
		    var windowWidth = $(window).width();
		    if (windowWidth <= 992 && !modules.windowResizeBool) {
		        if (modules.uiType == 'ui1') {
		            var orientation = $(".slider").slider("option", "orientation");
		            $('.slider').slider("option", "orientation", "horizontal");
		            $('.handleStyle').this.helper.addClass("fa-rotate-90 fa-lg");
		            $('.handleStyle').this.helper.removeClass("fa-2x");
		            $('.elementWrapper').this.helper.addClass('elementWrapperWidth');
		            this.helper.updateClassNamesRemove('tooltip1', 'right');
		            this.helper.updateClassNamesAdd('tooltip1', ' top');
		       
		        }
		        if (modules.uiType == 'ui3') {
		            $('.handleStyle').this.helper.addClass("fa-lg");
		            $('.handleStyle').this.helper.removeClass("fa-2x");
		            $('.elementWrapper').this.helper.addClass('elementWrapperWidth');
		        }
				// update the grey outs
				var buttonArray = modules.getButtonArray();
				for(var i = 0; i < buttonArray.length; i++){
					if(buttonArray[i].disabledBool){
						setGreyOut(false, i);
						setGreyOut(true, i);
					}
				}
				$('.elementWrapper').this.helper.removeClass('setTransition');
				document.getElementById('tabDecide').disabled = true;
				document.getElementById('tabSlide').disabled = true;
				document.getElementById('tabTap').disabled = true;
				modules.windowResizeBool = true;
			}
			if(windowWidth > 992){
			    if (modules.windowResizeBool) {
			        if (modules.uiType == 'ui1') {
			            var orientation = $(".slider").slider("option", "orientation");
			            $('.slider').slider("option", "orientation", "vertical");
			            $('.handleStyle').this.helper.removeClass("fa-rotate-90 fa-lg");
			            $('.handleStyle').this.helper.addClass("fa-2x");
			            $('.elementWrapper').this.helper.removeClass('elementWrapperWidth');
			            this.helper.updateClassNamesRemove('tooltip1', 'top');
			            this.helper.updateClassNamesAdd('tooltip1', ' right');
		                
			        }
			        if (modules.uiType == 'ui3') {
			            $('.handleStyle').this.helper.removeClass("fa-lg");
			            $('.handleStyle').this.helper.addClass("fa-2x");
			            $('.elementWrapper').this.helper.removeClass('elementWrapperWidth');
			        }
			        // add and remove the transition class
			        setTimeout(function () {
			            $('.elementWrapper').this.helper.addClass('setTransition');
			        }, 500);
			        if(modules.uiType !== 'ui3'){
			            // devide the set width of a slider row by the number of sliders giving the width per slider
					    var containerWidth = (modules.elementWidth * modules.numberOfElements) + 30;
			            $('.elementWrapper').css('width', containerWidth);
			            $('.sliderNavWrapper').css('width', containerWidth);
			        }
				    // collapse the navbar;
			        document.getElementById('navbarCollapse').className = "";
			        document.getElementById('navbarCollapse').className = "navbar-collapse collapse";
			        modules.windowResizeBool = false;
			    }
				// update the grey outs
				var buttonArray = modules.getButtonArray();
				for(var i = 0; i < buttonArray.length; i++){
					if(buttonArray[i].disabledBool){
						setGreyOut(false, i);
						setGreyOut(true, i);
					}
				}
				if (windowWidth <= 1200) {
				    var setWidthEl = $('#chartHeader0').outerWidth();
				    var labelToHideRight = modules.currentElement + 4;
		            var labelToHideLeft = modules.currentElement - 1;
				    // $('#sliderLabel' + labelToHide).css('visibility', 'hidden');
				    var classNames = document.getElementById('sliderLabel' + labelToHideRight).className;
				    var showHide = classNames.indexOf('hideVisibility');
				    if (showHide === -1) {
				        document.getElementById('sliderLabel' + labelToHideRight).className = this.helper.addClass('sliderLabel' + labelToHideRight, 'hideVisibility');
		                if(labelToHideLeft !== -1){
		                    document.getElementById('sliderLabel' + labelToHideLeft).className = this.helper.addClass('sliderLabel' + labelToHideLeft, 'hideVisibility');
		                }
		            }
		            if(windowWidth <= 1100) {
		              //  $('.elementContainer').this.helper.addClass('elementContainerTablet').this.helper.removeClass('elementContainer');  
		                $('.sliderNavContainer1200').css('margin', '0');
		            }
		            if(windowWidth > 1100) {
		              //  $('.elementContainerTablet').this.helper.addClass('elementContainer').this.helper.removeClass('elementContainerTablet');  
		                $('.sliderNavContainer1200').css('margin', '0 auto');
		            }
				}
				if (windowWidth > 1200) {
				    var labelToShowRight = modules.currentElement + 4;
		            var labelToShowLeft = modules.currentElement - 1;
		            var classNames = document.getElementById('sliderLabel' + labelToShowRight).className;
				    var showHide = classNames.indexOf('hideVisibility');
				    if (showHide !== -1) {
				      document.getElementById('sliderLabel' + labelToShowRight).className = this.helper.removeClass('sliderLabel' + labelToShowRight, 'hideVisibility');
		              if(labelToShowLeft !== -1){
		                document.getElementById('sliderLabel' + labelToShowLeft).className = this.helper.removeClass('sliderLabel' + labelToShowLeft, 'hideVisibility');
		              }
		            }
		        }
				document.getElementById('tabDecide').disabled = false;
				document.getElementById('tabSlide').disabled = false;
				document.getElementById('tabTap').disabled = false;
				window.scrollTo(0, 0);
			}	
		},
		setGreyOut: function(hideShow, id) {
			var self = this;
			if(hideShow){
				var greyOutWidth = $('.moduleRow'+id ).outerWidth();
				var greyOutHeight = $('.moduleRow'+id ).outerHeight();
				var rowOffset = $('.moduleRow'+id ).offset();
				document.getElementById('greyOut'+id).setAttribute('class','fa fa-plus fa-lg greyOutClick');
				$('body').append('<div class="greyOut" id="greyOutOverlay'+id+'" style="width:'+greyOutWidth+'px;height:'+greyOutHeight+'px;top:'+rowOffset.top+'px;left:'+rowOffset.left+'px;">'+
								 '<div class="greyOutPlus" id="greyOutPlus'+id+'"></div>'+
								 '</div>');
				$('#greyOutPlus'+id).on('click', function(){ self.turnOffGrey(id);})
			}
			else {
				var element = document.getElementById("greyOutOverlay"+id);
				element.parentNode.removeChild(element);
			}
		},
		turnOffGrey: function(id){
			//var id = id.match(/[0-9]+/g);
			var plusMinusSignID = 'greyOut' + id;
			var buttonArray = modules.getButtonArray();
			var buttonUpdateID = 0;
			this.setGreyOut(false, id);
			//$('#greyOutOverlay'+id).remove();
			document.getElementById(plusMinusSignID).setAttribute('class','fa fa-minus fa-lg greyOutClick');
			buttonArray[id].disabledBool = false;
			for(var i = 0; i < modules.numberOfButtons; i++){
				if(!buttonArray[i].disabledBool){
					buttonArray[i].buttonUpdateID = buttonUpdateID;
					buttonUpdateID += 1;
				}
				else { buttonArray[i].buttonUpdateID = null;}	
			}


			modules.addChartSegment(id);
			for (var i = 0; i < modules.numberOfButtons; i++) {
			    if (modules.uiType == 'ui3') {
			        modules.updateButtonValueYN(i);
			    }
			    else {
			        modules.updateButtonValue(i);
			    }
			}



			//if (modules.uiType == 'ui3') {
			//    modules.updateButtonValueYN(id);
			//}
			//else {
			//    modules.updateButtonValue(id);
			//}
			modules.numberOfGreyOuts += 1;
		},
		loadJquery: function(self) {
			//	grey out the sliders, button and chart
			$('.greyOutClick').click(function () {
			    if (modules.numberOfGreyOuts > 1) {
			        var id = this.id.match(/[0-9]+/g);
			        var buttonArray = modules.getButtonArray();
			        var buttonUpdateID = 0;
			        self.setGreyOut(true, id);
			        // set the disabled bool for sliders to true
			        var elementArray = modules.getElementArray();
			//        for (var i = 0; i < modules.numberOfElements; i++) {
			//            elementArray[id][i].disabledBool = true;
			//        }
			        // remove the segemnts disabled
			        modules.removeChartSegment(id);
			        //modules.numberNotDisable -= 1;

			        // update the temp id's for the button so they match the new amount of segments
			        buttonArray[id].disabledBool = true;
			        for (var i = 0; i < modules.numberOfButtons; i++) {
			            if (!buttonArray[i].disabledBool) {
			                buttonArray[i].buttonUpdateID = buttonUpdateID;
			                buttonUpdateID += 1;
			            }
			            else { buttonArray[i].buttonUpdateID = null; }
			        }
			        if (modules.uiType == 'ui3') {
			            modules.updateButtonValueYN(id);
			        }
			        else {
			            modules.updateButtonValue(id);
			        }
			        modules.numberOfGreyOuts -=1;
			    }
				
			});

			$('.sliderNavFunction').click( function (event){
				var currentPos = $('.elementWrapper').css('right');
			    var windowWidth = $(window).width();
				currentPos = currentPos.match(/[0-9]+/g);
				if (event.target.id.match('Right') && (modules.currentElement + 5) < modules.numberOfElements) {
					document.getElementById(event.target.id).disabled = true;
					var newPos = parseInt(currentPos[0]) + modules.elementWidth + 'px';
			        if(windowWidth <= 1200 && windowWidth >= 1050){
					  var labelToShowRight = modules.currentElement + 4;
			          var labelToHideRight = modules.currentElement + 5;
			          var labelToHideLeft = modules.currentElement;
			          document.getElementById('sliderLabel' + labelToShowRight).className = this.helper.removeClass('sliderLabel' + labelToShowRight, 'hideVisibility');
			          document.getElementById('sliderLabel' + labelToHideRight).className = this.helper.addClass('sliderLabel' + labelToHideRight, 'hideVisibility');
			        }
					setTimeout(function(){ 
			            if(windowWidth <= 1200 && windowWidth >= 1050){
			                document.getElementById('sliderLabel' + labelToHideLeft).className = this.helper.addClass('sliderLabel' + labelToHideLeft, 'hideVisibility');
			            }
			            document.getElementById(event.target.id).disabled = false;
			            modules.currentElement += 1;}, 1000);
				}
				else if(event.target.id.match('Left') && modules.currentElement > 0) {
					document.getElementById(event.target.id).disabled = true;
					var newPos =  parseInt(currentPos[0]) - modules.elementWidth + 'px';
			         if(windowWidth <= 1200 && windowWidth >= 1050){
					  var labelToShowLeft = modules.currentElement - 1;
			          var labelToHideRight = modules.currentElement + 3;
			          var lableToShowRight = modules.currentElement + 4;
			          document.getElementById('sliderLabel' + labelToShowLeft).className = this.helper.removeClass('sliderLabel' + labelToShowLeft, 'hideVisibility');
			        }
					setTimeout(function(){
			            if(windowWidth <= 1200 && windowWidth >= 1050){
			                document.getElementById('sliderLabel' + labelToHideRight).className = this.helper.addClass('sliderLabel' + labelToHideRight, 'hideVisibility');
			                document.getElementById('sliderLabel' + lableToShowRight).className = this.helper.removeClass('sliderLabel' + lableToShowRight, 'hideVisibility');
			            }
			            document.getElementById(event.target.id).disabled = false; 
			             modules.currentElement -= 1;
			        }, 1000);
				}
				$('.sliderNavWrapper').css({ right: newPos });
				$('.elementWrapper').css({ right: newPos });
			});
			$('.tab').click(function (event) {
			    var id = event.currentTarget.id;
			    modules.highLight.addHighLight(id);
			});
			$( document ).bind( 'mobileinit', function(){
				  $.mobile.loader.prototype.options.text = "";
				  $.mobile.loader.prototype.options.textVisible = false;
				  $.mobile.loader.prototype.options.theme = "a";
				  $.mobile.loader.prototype.options.html = "";
				  $.mobile.hidePageLoadingMsg();
			});
			$( window ).resize(function() {
		    	self.changeSlider();
			});
		}

		}
	}
});