define(["sMods/TemplateModule","sMods/TooltipModulesto","sMods/HighLight","sMods/SliderModule","sMods/ButtonModule","sMods/DoughNutModule","sMods/ScorerModule","sMods/SliderModuleYN"],function(e,t,a,s,o,n,l,i){"use strict";return function(){var r,u=[],d=[],h=[];return{init:function(e,s,o){"ie9"==document.getElementsByTagName("body")[0].getAttribute("browser")&&(document.getElementsByTagName("body")[0].className="cms-bootstrap ie9",this.ie9="ie9");var n=new t;this.setTooltip(n),this.highLight=new a,this.currentElement=0,this.elementWidth=105,this.windowWidth=$(window).width(),this.windowResizeBool=!1,this.bodyRemoveHighLight=!1,this.numberOfGreyOuts=s,this.elementLabels=["Arsenal","Chelsea","Liverpool","Portsmouth","Man United","Man City","Leeds","Bournemouth"],this.buttonLabels=["Manager","Goal Keeper & Defence","Midfield","League Position & Recent Form","Attack","Owner"],this.scorerValues=[],this.chartData=document.getElementById("jsonInput").value,this.chartData=JSON.parse(this.chartData),"ui3"==o?this.numberOfElements=s:this.numberOfElements=e,this.numberOfButtons=s,this.numberOfCharts=2,this.uiType=o,"ui1"==this.uiType?(document.getElementById("game-content").className="ui1",this.slider()):"ui2"==this.uiType?(document.getElementById("game-content").className="ui2",this.scorer()):(this.uiType="ui3")&&(document.getElementById("game-content").className="ui3",this.sliderYN()),$(".custom-col-md-4").mouseover(function(){n.disableTooltip()}),$(".custom-col-md-3").mouseover(function(){n.disableTooltip()}),document.getElementById("fixedHeader").addEventListener("mouseover",function(){n.disableTooltip()},!1),$("footer").mouseover(function(e){e.stopPropagation(),n.disableTooltip()}),$(".leftRightButton").on("mouseOver",function(e){e.stopPropagation(),n.disableTooltip()}),$(".sliderContainer").on("mouseover",function(e){e.stopPropagation(),n.tooltipActivate("",this.id)}),$(".sliderContainerYN").on("mouseover",function(e){e.stopPropagation(),n.tooltipActivate("",this.id)}),$("#modules").on("mouseout",function(e){e.stopPropagation(),n.disableTooltip("",this.id)}),this.windowWidth<=1100&&$(".sliderNavContainer1200").css("margin","0"),this.windowWidth>1100&&$(".sliderNavContainer1200").css("margin","0 auto"),this.windowWidth<=1200&&(document.getElementById("sliderLabel4").className=addClass("sliderLabel4","hideVisibility"))},setTooltip:function(e){this.tooltip=e},getTooltip:function(){return this.tooltip},slider:function(){for(var t=new e,a=["Arsenal","Chelsea","Liverpool","Portsmouth","Man United","Man City","Leeds","Bournemouth"],l=0;l<this.numberOfElements;l++)$("#sliderNavWrapper").append('<li id="sliderLabel'+l+'" class="sliderLabelContainer">'+a[l]+"</li>");for(var l=0;l<this.numberOfButtons;l++)d[l]=new o,d[l].setButtonID(l),t.createButton(l,this.buttonLabels[l],this);for(var i=0;i<this.numberOfButtons;i++){for(var r=[],l=0;l<this.numberOfElements;l++){r[l]=new s;var c=i+"_"+l;r[l].setSliderID(c),t.createSlider(c,i,a[l],this.windowWidth,this)}u.push(r)}for(var l=0;l<this.numberOfElements;l++){h[l]=new n;var m=this.getOrdinalPosition(l+1);h[l].setDoughnutID(l,m,this.chartData),h[l].doughnutObject=t.createDoughnut(l,this.chartData,a[l],m)}if($("canvas").css({width:"100%",height:"100%"}),this.windowWidth<992)updateClassNamesAdd("ui-slider-handle"," fa fa-minus-square fa-lg fa-rotate-90 handleStyle"),updateClassNamesAdd("tooltip1"," top"),this.windowResizeBool=!0;else{updateClassNamesAdd("ui-slider-handle"," fa fa-minus-square fa-2x handleStyle"),updateClassNamesAdd("tooltip1"," right");var f=this.elementWidth*this.numberOfElements+30;$(".elementWrapper").css("width",f),$(".sliderNavWrapper").css("width",f)}this.updateChartPositions()},scorer:function(){for(var t=this,a=new e,s=0;s<this.numberOfElements;s++)$("#sliderNavWrapper").append('<li id="sliderLabel'+s+'" class="sliderLabelContainer">'+this.elementLabels[s]+"</li>");for(var i=[],s=0;s<this.numberOfElements;s++)i[s]=s+1;for(var s=0;s<this.numberOfButtons;s++)d[s]=new o,d[s].setButtonID(s),a.createButton(s,this.buttonLabels[s],this),this.scorerValues.push(i);for(var r=0;r<this.numberOfButtons;r++){for(var c=[],s=0;s<this.numberOfElements;s++){c[s]=new l;var m=r+"_"+s;c[s].setscorerID(m,this.numberOfElements),a.createScorer(m,r,this.elementLabels[s],this.windowWidth)}u.push(c)}for(var s=0;s<this.numberOfElements;s++){h[s]=new n;var f=this.getOrdinalPosition(s+1);h[s].setDoughnutID(s,f,this.chartData),h[s].doughnutObject=a.createDoughnut(s,this.chartData,this.elementLabels[s],f)}$(".scorer").on("click",function(){t.setScorerValue(this.id)}),$("canvas").css({width:"100%",height:"100%"});var v=this.elementWidth*this.numberOfElements+30;$(".elementWrapper").css("width",v),$(".sliderNavWrapper").css("width",v),this.updateChartPositions()},sliderYN:function(){var t=["No","Yes"],a=["Manager","Goal Keeper & Defence","Midfield","League Position & Recent Form","Attack","Owner"],s=new e;this.windowResizeBool=!0;for(var l=0;l<this.numberOfbuttons;l++)$("#sliderNavWrapper").append('<li class="sliderLabelContainer">'+sliderLabels[l]+"</li>");for(var l=0;l<this.numberOfButtons;l++)d[l]=new o,d[l].setButtonID(l),s.createButton(l,a[l],this),u[l]=new i,u[l].setSliderID(l),s.createSliderYN(l,this);for(var l=0;l<this.numberOfCharts;l++){h[l]=new n;var r=this.getOrdinalPosition(l+1);h[l].setDoughnutID(l,r,this.chartData),h[l].doughnutObject=s.createDoughnut(l,this.chartData,t[l],r)}$(".navButtonContainer").css("display","none"),$(".labelsBackground").css("display","none"),$("canvas").css({width:"100%",height:"100%"});for(var l=0;l<this.numberOfButtons;l++)document.getElementById("sliderID"+l).className=addClass("sliderID"+l," overlaydiv overlayDiv1 handleStyle");this.windowWidth<992?updateClassNamesAdd("ui-slider-handle"," fa fa-minus-square fa-lg fa-rotate-90 handleStyle"):updateClassNamesAdd("ui-slider-handle"," fa fa-minus-square fa-2x fa-rotate-90 handleStyle"),this.updateChartPositions()},setButtonValue:function(e,t){var e=e.charAt(e.length-1),a=d[e];a.setButtonValue();for(var s=d[e].buttonValue,o=0;o<this.numberOfElements;o++)3==modules.baseURI.charAt(modules.baseURI.length-1)?u[e].setValues("",s):u[e][o].setValues("",s);1===d[e].buttonValue?$("#moduleButton"+e).children().removeClass("overlayDiv5"):$("#moduleButton"+e).children().removeClass("overlayDiv"+(d[e].buttonValue-1)),$("#moduleButton"+e).children().addClass("overlayDiv"+d[e].buttonValue),this.updateButtonValue(e)},setSliderValue:function(e,t,a){var s=t.charAt(t.length-1),o=t.charAt(t.length-3);t=[o,s],u[t[0]][t[1]].setValues(e,d[t[0]].buttonValue),this.updateTotal(t[[1]]);var n=h[t[1]].doughnutObject,l=d[t[0]].buttonUpdateID,i=2*parseInt(l),r=i+1,e=u[t[0]][t[1]].totalValue/10,c=10*d[t[0]].buttonValue-e;n.segments[i].value=c,n.segments[r].value=e,n.update()},updateButtonValue:function(e){if(null!==d[e].buttonUpdateID)for(var t=d[e].buttonUpdateID,a=2*parseInt(t),s=a+1,o=0;o<this.numberOfElements;o++){var n=h[o].doughnutObject;if(3==modules.baseURI.charAt(modules.baseURI.length-1))var l=u[o].totalValue/10;else var l=u[e][o].totalValue/10;var i=10*d[e].buttonValue-l;n.segments[a].value=i,n.segments[s].value=l,n.update(),this.updateTotal(o)}else for(var o=0;o<this.numberOfElements;o++){var n=h[o].doughnutObject,l=0,i=0;this.updateTotal(o)}this.updateChartPositions()},updateTotal:function(e){for(var t=0,a=0,s=0;s<this.numberOfButtons;s++)d[s].disabledBool||(t+=3==modules.baseURI.charAt(modules.baseURI.length-1)?u[s].totalValue:u[s][e].totalValue,a+=d[s].buttonValue);var o=Math.round(100*(t/(100*a)));h[e].totalScore=o,document.getElementById("sliderTotal"+e).innerHTML=o,document.getElementById("sliderTotalSmall"+e).innerHTML=o},removeChartSegment:function(e){for(var t=2*d[e].buttonUpdateID,a=0;a<h.length;a++)h[a].doughnutObject.removeData(t),h[a].doughnutObject.removeData(t)},addChartSegment:function(e){e=2*parseInt(e);for(var t=e+1,a=0;a<h.length;a++){var s=h[a].data;h[a].doughnutObject.addData({value:1,color:s[e].color},String(e)),h[a].doughnutObject.addData({value:0,color:s[t].color},t)}for(var a=0;a<h.length;a++)for(var o=h[a],n=0,l=1,i=0;i<this.numberOfButtons;i++){var r=2*i,u=r+1,c=i;d[c].disabledBool||(o.doughnutObject.segments[n].fillColor=o.data[r].color,o.doughnutObject.segments[n].highlightColor=o.data[r].color,o.doughnutObject.segments[l].fillColor=o.data[u].color,o.doughnutObject.segments[l].highlightColor=o.data[u].color,n+=2,l=n+1)}for(var a=0;a<h.length;a++)h[a].doughnutObject.update()},updateChartPositions:function(){r="ui3"==this.uiType?this.numberOfCharts:this.numberOfElements;for(var e=0;e<r;e++)document.getElementById("canvasContainer"+e).setAttribute("totalScore",h[e].totalScore);tinysort("ul.results>li",{attr:"totalScore",order:"desc"}),$(".results").children("li").each(function(){this.className=""});var t=1,a=this;$(".results").children("li").each(function(){var e=a.getOrdinalPosition(t),s=this.id;switch(s=s.match(/[0-9]+/g),$("#ordianlPosition"+s[0]).text(e),document.getElementById("sliderTotalSmall"+s[0]).className="badge",t){case 1:"ui3"!==a.uiType&&$("#canvas"+s[0]).css("display","block"),document.getElementById("sliderTotalSmall"+s[0]).className=addClass("sliderTotalSmall"+s[0],"goldBadge"),this.className="first";break;case 2:"ui3"!==a.uiType&&$("#canvas"+s[0]).css("display","none"),document.getElementById("sliderTotalSmall"+s[0]).className=addClass("sliderTotalSmall"+s[0],"silverBadge"),this.className="defaultChartHeader";break;case 3:$("#canvas"+s[0]).css("display","none"),document.getElementById("sliderTotalSmall"+s[0]).className=addClass("sliderTotalSmall"+s[0],"bronzeBadge"),this.className="defaultChartHeader";break;default:$("#canvas"+s[0]).css("display","none"),this.className="defaultChartHeader"}t+=1})},getOrdinalPosition:function(e){var t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]||t[a]||t[0])},getElementArray:function(){return u},getChartArray:function(){return h},getButtonArray:function(){return d},setScorerValue:function(e){var e=e.match(/[0-9]+/g),t=u[e[0]][e[1]].opValue,a=[],s=null,o=this.scorerValues[e[0]][this.scorerValues[e[0]].length-1];if(0==t){for(var n=0;n<this.scorerValues[e[0]].length;n++)0==n?s=this.scorerValues[e[0]][n]:a.push(this.scorerValues[e[0]][n]);this.scorerValues[e[0]]=a,u[e[0]][e[1]].setScorerValue=this.numberOfElements-(s-1),u[e[0]][e[1]].opValue=s}else if(t>o||"undefined"==typeof o){s=0;for(var n=0;n<this.scorerValues[e[0]].length;n++)a.push(this.scorerValues[e[0]][n]);a.push(t),this.scorerValues[e[0]]=a,0!=s?u[e[0]][e[1]].setScorerValue=this.numberOfElements-(s-1):u[e[0]][e[1]].setScorerValue=0,u[e[0]][e[1]].opValue=s}else{for(var n=0;n<this.scorerValues[e[0]].length;n++)t<this.scorerValues[e[0]][n]&&null===s?(s=this.scorerValues[e[0]][n],a.push(t)):a.push(this.scorerValues[e[0]][n]);u[e[0]][e[1]].setScorerValue=this.numberOfElements-(s-1),u[e[0]][e[1]].opValue=s,this.scorerValues[e[0]]=a}u[e[0]][e[1]].setValues(f,d[e[0]].buttonValue);var l=this.getOrdinalPosition(s);0!==u[e[0]][e[1]].opValue?document.getElementById("scorerValue"+e[0]+"_"+e[1]).innerHTML=l:document.getElementById("scorerValue"+e[0]+"_"+e[1]).innerHTML="",this.updateTotalScorer(e[[1]]);var i=h[e[1]].doughnutObject,r=d[e[0]].buttonUpdateID,c=2*parseInt(r),m=c+1,f=u[e[0]][e[1]].totalValue/10,v=10*d[e[0]].buttonValue-f;i.segments[c].value=v,i.segments[m].value=f,i.update(),this.updateChartPositions()},updateTotalScorer:function(e){for(var t=0,a=0,s=0;s<this.numberOfButtons;s++)d[s].disabledBool||(t+=u[s][e].totalValue,a+=d[s].buttonValue);var o=Math.round(100*(t/(100*a)));h[e].totalScore=o,document.getElementById("sliderTotal"+e).innerHTML=o,document.getElementById("sliderTotalSmall"+e).innerHTML=o},setSliderYNValue:function(e,t){var a,s,t=t.charAt(t.length-1);u[t].setValues(e.value,d[t].buttonValue),u[t].isNegetiveBool?u[t].isNegetiveBool&&(a=0,s=1):(a=1,s=0);var o=h[a].doughnutObject,n=d[t[0]].buttonUpdateID,l=2*parseInt(n),i=l+1,e=u[t].totalValue/10,r=10*d[t].buttonValue-e;o.segments[l].value=r,o.segments[i].value=e,o.update();var c=h[s].doughnutObject,m=0,f=10*d[t].buttonValue-m;c.segments[l].value=f,c.segments[i].value=m,c.update(),this.updateTotalYN()},setButtonValueYN:function(e){var t=d[e];t.setButtonValue();for(var a=d[e].buttonValue,s=0;s<this.numberOfElements;s++)u[e].setValues("",a);1===d[e].buttonValue?$("#moduleButton"+e).children().removeClass("overlayDiv5"):$("#moduleButton"+e).children().removeClass("overlayDiv"+(d[e].buttonValue-1)),$("#moduleButton"+e).children().addClass("overlayDiv"+d[e].buttonValue),this.updateButtonValueYN(e)},updateButtonValueYN:function(e){for(var t,a,s=e,a=0;a<this.numberOfCharts;a++){if(t=0,null!==d[e].buttonUpdateID){var o=d[e].buttonUpdateID,n=2*parseInt(o),l=n+1,i=h[a].doughnutObject;u[s].isNegetiveBool&&0==a&&(t=u[s].totalValue/10),u[s].isNegetiveBool||1!=a||(t=u[s].totalValue/10);var r=10*d[e].buttonValue-t;i.segments[n].value=r,i.segments[l].value=t,i.update(),this.updateTotalYN()}else this.updateTotalYN();this.updateChartPositions()}},updateTotalYN:function(){for(var e,t=0,a=0,e=0;e<this.numberOfCharts;e++){t=0,a=0;for(var s=0;s<this.numberOfButtons;s++)d[s].disabledBool||(u[s].isNegetiveBool&&0==e&&(t+=u[s].totalValue),u[s].isNegetiveBool||1!=e||(t+=u[s].totalValue),a+=d[s].buttonValue);var o=Math.round(100*(t/(100*a)));h[e].totalScore=o,document.getElementById("sliderTotal"+e).innerHTML=o,document.getElementById("sliderTotalSmall"+e).innerHTML=o}}}}});