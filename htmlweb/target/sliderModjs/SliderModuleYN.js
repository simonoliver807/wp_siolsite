define([],function(){return function(){return{setSliderID:function(e){this.sliderValue=0,this.totalValue=0,this.sliderID=e,this.disabledBool=!1,this.tooltipBool=!1,this.isNegetiveBool=!1},setValues:function(e,t){if(""!==e){e<0?this.isNegetiveBool=!0:this.isNegetiveBool=!1,this.sliderValue=e-1,this.sliderValue=Math.abs(this.sliderValue),$("#tooltipValue"+this.sliderID).text(Math.abs(this.sliderValue));var i=this.sliderValue/2;this.isNegetiveBool?(document.getElementById("sliderBackground1"+this.sliderID).style.width=50-i+"%",document.getElementById("sliderBackground2"+this.sliderID).style.width=i+"%",document.getElementById("sliderBackground3"+this.sliderID).style.width="0%",document.getElementById("sliderBackground4"+this.sliderID).style.width="50%"):(document.getElementById("sliderBackground1"+this.sliderID).style.width="50%",document.getElementById("sliderBackground2"+this.sliderID).style.width="0%",document.getElementById("sliderBackground3"+this.sliderID).style.width=i+"%",document.getElementById("sliderBackground4"+this.sliderID).style.width=50-i+"%")}this.totalValue=t*this.sliderValue}}}});