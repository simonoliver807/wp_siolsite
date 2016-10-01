define([],function(){return function(){return{init:function(){this.tablist=["tabTap","tabSlide","tabDecide","tabShare"],this.bodyBindClick=!1,this.currentHighLighted1=null,this.currentHighLighted2=null},addHighLight:function(e){switch(e){case"tabTap":var t=document.getElementById("tabTap").className,a=t.indexOf("selectBackground");if(a===-1){this.removeHighLightOverlay(),this.bodyRemoveHighLight(),document.getElementById("tabTap").className=t+" selectBackground",$(".overlayDiv").addClass("bc");var d=document.getElementById("labelsFirstCol").getBoundingClientRect().width,i=$("#modules").offset(),l=i.left+getCSSint($("#labelsFirstCol").css("padding-left"));document.getElementById("sliderNav").style.background="0",this.updateOverlay("highLightOverlay1",0,$(window).width(),"tabTap",!1),this.updateOverlay("highLightOverlay2",l,d,"tabTap",!0),this.currentHighLighted1="tabTap",this.currentHighLighted2="Tap",$(".tab").unbind("click")}else $("#tabTap").removeClass("selectBackground"),$(".buttonColumn").removeClass("selectBackground"),$(".overlayDiv").removeClass("bc"),this.updateOverlay("highLightOverlay1",0,0,0,0,"",!1),this.updateOverlay("highLightOverlay2",0,0,0,0,"",!1),this.currentHighLighted1="null",this.currentHighLighted2="null";break;case"tabSlide":var t=document.getElementById("tabSlide").className,a=t.indexOf("selectBackground");if(a===-1){this.removeHighLightOverlay(),this.bodyRemoveHighLight(),"ui1"==modules.uiType?updateClassNamesAdd("slider"," bc"):"ui2"==modules.uiType?updateClassNamesAdd("scorer"," bc"):(updateClassNamesRemove("tooltip1","right"),updateClassNamesAdd("slider"," bc")),document.getElementById("tabSlide").className=t+" selectBackground";var d=document.getElementById("labelsSecondCol").getBoundingClientRect().width,s=$("#tabSlide").offset().left,r=d-getCSSint($("#labelsSecondCol").css("padding-left"));document.getElementById("sliderNav").style.background="0",document.getElementById("sliderNavLeft").style.background="0",document.getElementById("sliderNavRight").style.background="0",document.getElementById("labelsBackground").className="",document.getElementById("sliderNavWrapper").className=addClass("sliderNavWrapper","selectedCBC"),this.updateOverlay("highLightOverlay1",0,$(window).width(),"tabSlide",!1),this.updateOverlay("highLightOverlay2",s,r,"tabSlide",!0),this.currentHighLighted1="tabSlide",this.currentHighLighted2="Slide",$(".tab").unbind("click")}else $("#tabSlide").removeClass("selectBackground"),$(".slider").removeClass("bc"),document.getElementById("sliderNavLeft").style.background="#fff",document.getElementById("sliderNavRight").style.background="#fff",document.getElementById("labelsBackground").className="labelsBackground",document.getElementById("sliderNavWrapper").className=removeClass("sliderNavWrapper","selectedCBC"),"ui2"==modules.uiType?updateClassNamesRemove("scorer","bc"):updateClassNamesRemove("slider","bc"),this.updateOverlay("highLightOverlay1",0,0,0,0,"",!1),this.updateOverlay("highLightOverlay2",0,0,0,0,"",!1),this.currentHighLighted1="null",this.currentHighLighted2="null";break;case"tabDecide":var t=document.getElementById("tabDecide").className,a=t.indexOf("selectBackground");if(a===-1){this.removeHighLightOverlay(),this.bodyRemoveHighLight(),document.getElementById("tabDecide").className=t+" selectBackground",document.getElementById("results").className=addClass("results","selectedCBC"),$(".result-header").addClass("selectedCBC45");var n=!0;$(".results").children("li").each(function(){n?(this.className="firstNoBackground",n=!1):this.className="chartHeaderNoBackground"});document.getElementById("results").getBoundingClientRect().width;this.updateOverlay("highLightOverlay1",0,$(window).width(),"tabDecide",!1),this.currentHighLighted1="tabDecide",this.currentHighLighted2="Decide",$(".tab").unbind("click")}else{$("#tabDecide").removeClass("selectBackground"),removeClass("results","selecetedCBC"),document.getElementById("results").className=removeClass("results","selectedCBC"),$(".result-header").removeClass("selectedCBC45");var n=!0;$(".results").children("li").each(function(){n?(this.className="first",n=!1):this.className="defaultChartHeader"}),this.updateOverlay("highLightOverlay1",0,0,0,0,"",!1),this.currentHighLighted1="null",this.currentHighLighted2="null"}break;case"tabShare":var t=document.getElementById("results").className,a=t.indexOf("resultsDisplayNone");a===-1?(this.removeHighLightOverlay(),this.bodyRemoveHighLight(),document.getElementById("tabShare").className=addClass("tabShare","selectBackground"),document.getElementById("results").className=addClass("results","resultsDisplayNone"),document.getElementById("shareDropDown").style.display="block",document.getElementById("shareDropDown").style.borderTop="1px solid #1597a7",this.currentHighLighted1="tabShare",this.currentHighLighted2="Now Share",$(".tab").unbind("click")):(document.getElementById("results").className=removeClass("results","resultsDisplayNone"),$("#tabShare").removeClass("selectBackground"),document.getElementById("shareDropDown").style.display="none",document.getElementById("shareDropDown").style.borderTop="none",this.updateOverlay("highLightOverlay1",0,0,0,0,"",!1),this.currentHighLighted1="null",this.currentHighLighted2="null")}},updateOverlay:function(e,t,a,d,i){var l=195,s=$("#game-content").css("padding-top"),r=$("#game-content").height()+parseInt(s.match(/[0-9]+/g)[0]);document.getElementById(e).style.left=t+"px",document.getElementById(e).style.top=l+"px",document.getElementById(e).style.width=a+"px",document.getElementById(e).style.height=r+"px",i&&(document.getElementById(e).style.background="#73c1ca",document.getElementById(e).style.zIndex="-1"),document.getElementById(e).setAttribute(e,d)},removeHighLightOverlay:function(){for(var e=["tabTap","tabSlide","tabDecide","tabShare"],t=0;t<e.length;t++){var a=document.getElementById(e[t]).className,d=a.indexOf("selectBackground");d!==-1&&this.addHighLight(e[t])}},bodyRemoveHighLight:function(){var e=this;$("body").click(function(t){if(e.bodyBindClick){$("body").unbind("click");var a=t.target.id,d=t.target.innerHTML;"tabTap"!=a&&"tabSlide"!=a&&"tabDecide"!=a&&"tabShare"!=a||a==e.currentHighLighted1?"Tap"!=d&&"Slide"!=d&&"Decide"!=d&&"Now Share"!=d||d==e.currentHighLighted2?(e.removeHighLightOverlay(),e.bodyBindClick=!1,$(".tab").click(function(t){var a=t.currentTarget.id;e.addHighLight(a)})):e.addHighLight(t.target.parentElement.id):e.addHighLight(a)}else e.bodyBindClick=!0})}}}});