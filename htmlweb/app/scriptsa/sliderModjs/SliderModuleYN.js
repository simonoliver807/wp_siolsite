define([], function() {
    return function () {
        var sliderValue;
        var totalValue;
        var sliderID;
        var disabledBool;
        var tooltipBool;
        var isNegetiveBool;
       // var setSliderValue;
        
        return {
            setSliderID: function (sliderID) {
                this.sliderValue = 0;
                this.totalValue = 0;
                this.sliderID = sliderID;
                this.disabledBool = false;
                this.tooltipBool = false;
                this.isNegetiveBool = false;
               // this.overscrollStatus = false;
            },
            setValues: function (sliderValue, buttonValue) {
                if (sliderValue !== '') {
                	if(sliderValue < 0){
                		this.isNegetiveBool = true;
                	}
                	else {
                		this.isNegetiveBool = false;
                	}
                    this.sliderValue = sliderValue - 1;
                    this.sliderValue = Math.abs(this.sliderValue);
                    //  update the tooltip
                    $('#tooltipValue' + this.sliderID).text(Math.abs(this.sliderValue));
                    var setSliderBackground = this.sliderValue / 2; 
                    if (this.isNegetiveBool) {
                        document.getElementById('sliderBackground1' + this.sliderID).style.width = (50 - setSliderBackground) + '%';
                        document.getElementById('sliderBackground2' + this.sliderID).style.width = setSliderBackground + '%';
                        document.getElementById('sliderBackground3' + this.sliderID).style.width = '0%';
                        document.getElementById('sliderBackground4' + this.sliderID).style.width = '50%';
                    }
                    else {
                        document.getElementById('sliderBackground1' + this.sliderID).style.width = '50%';
                        document.getElementById('sliderBackground2' + this.sliderID).style.width = '0%';
                        document.getElementById('sliderBackground3' + this.sliderID).style.width = setSliderBackground + '%';
                        document.getElementById('sliderBackground4' + this.sliderID).style.width = (50 - setSliderBackground) + '%';
                    } 
                }
                this.totalValue = buttonValue * this.sliderValue;
            }
        }
    }
});