define([], function(){
    return function () {
        var sliderValue;
        var totalValue;
        var sliderID;
        var disabledBool;
        var tooltipBool;
       // var setSliderValue;
        return {
            setSliderID: function (sliderID) {
                this.sliderValue = 0;
                this.totalValue = 0;
                this.sliderID = sliderID;
                this.disabledBool = false;
                this.tooltipBool = false;
               // this.overscrollStatus = false;
            },
            setValues: function (sliderValue, buttonValue) {
                if (sliderValue !== '') {
                    this.sliderValue = sliderValue.value - 1;
                    //  update the tooltip
                    var position = $('#' + this.sliderID).offset();
                    $('#tooltipValue'+this.sliderID).text(this.sliderValue);
                    document.getElementById('sliderBackground' + this.sliderID).style.width = this.sliderValue + '%';
                }
                this.totalValue = buttonValue * this.sliderValue;
            }
        };
    }
});