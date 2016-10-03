define(['ddUtil/createDragDropElement'], function(createDragDropElement){

"use strict";

// load the json data and start set up
var dragElements = [];
loadJsonData('jsonInput');
function loadJsonData(jsonInput) {
    var jsonItems = document.getElementById(jsonInput).value;
    jsonItems = JSON.parse(jsonItems);
    var dragDropNumber;
    for (var i = 0; i < jsonItems.length; i++) {
        dragDropNumber = jsonItems[i].mapID;
        var e_id = 'e_' + dragDropNumber;
        var e_cont_id = 'container_' + dragDropNumber;
        var label_id = 'label_' + dragDropNumber;
        var isNew = jsonItems[i].isNew;
        var labelReplacedBy = jsonItems[i].labelReplacedBy; 
        // if we have a postion append to the drop wrapper
        if (jsonItems[i].x !== -1 && jsonItems[i].y !== -1 && jsonItems[i].e_x !== -1 && jsonItems[i].e_y !== -1) {
            var element_x = jsonItems[i].x;
            var element_y = jsonItems[i].y;
            $('#dragDropList').append('<div id="' + e_cont_id + '" class="e_container"></div>');
            if (isNew) {
                $('#dragDropList').append('<div id="' + e_cont_id + '" class="e_container"></div>');
                $('#dropWrapper').append('<div id="' + e_id + '" class="dragDropLabelRed">' + jsonItems[i].labelName + '</div>');
            }
            else {
                $('#dragDropList').append('<div id="' + e_cont_id + '" class="e_container"></div>');
                $('#dropWrapper').append('<div id="' + e_id + '" class="dragDropLabelBlack">' + jsonItems[i].labelName + '</div>');
            }
            $('#' + e_id).css({ left: element_x, top: element_y, position: 'absolute' });
        }
        else {
            if (isNew) {
                $('#dragDropList').append('<div id="' + e_cont_id + '" class="e_container"><div id="' + e_id + '" class="dragDropLabelRed">' + jsonItems[i].labelName + '</div></div>');
            }
            else {
                $('#dragDropList').append('<div id="' + e_cont_id + '" class="e_container"><div id="' + e_id + '" class="dragDropLabelBlack"><div>' + jsonItems[i].labelName + '</div><div class="labelReplacedBy">'+labelReplacedBy+'</div></div>');
            }
        }
        dragElements[i] = new createDragDropElement;
        dragElements[i].init(e_id, jsonItems[i], label_id, e_cont_id, isNew, labelReplacedBy, dragElements);
        var labelWidth = $('.dragDropLabel').width();
        var labelHeight = $('.dragDropLabel').height();
        // lets position the elements if there are not -1 values
        if (jsonItems[i].x !== -1 && jsonItems[i].y !== -1 && jsonItems[i].e_x !== -1 && jsonItems[i].e_y !== -1) {
            var labelText = '<div>' + jsonItems[i].labelName + '</div><div class="labelReplacedBy">' + labelReplacedBy + '</div>';
            createLabel(dragElements[i], dragDropNumber, labelText, jsonItems[i].x, jsonItems[i].y, jsonItems[i].e_x, jsonItems[i].e_y, labelWidth, labelHeight)
        }
        dragElements[i].setDragEl = dragElements;
    }

    var dropWrapper = document.getElementById('dropWrapper');
    var dragDropLabel = document.getElementsByClassName('dragDropLabel');
    var resetItem = document.getElementById('resetItem');
    document.addEventListener('click', function (e) {
        $('.rightClickMenu').css('display', 'none');
        for (var i = 0; i < dragElements.length; i++) {
            if (dragElements[i].setReset) {
                dragElements[i].setReset = false;
            }
        }
    }, false);
    resetItem.addEventListener('click', function (e) {
        for (var i = 0; i < dragElements.length; i++) {
            if (dragElements[i].setReset) {
                dragElements[i].resetLabel();
            }
        }
    }, false);
//    $('.dragDropLabelRed').click(function (event) {
//        var line_id = 'line_' + this.id.split('_');
//        $(line_id).css('z-index', '999999');
//    });
}
$('#dropWrapper').droppable({
    tolerance: 'fit',
    drop: function (event, ui) {
        var dropWrapper = $('#dropWrapper');
        var labelWidth = $(ui.draggable).width();
        var labelHeight = $(ui.draggable).height();
        var pos = dropWrapper.offset();
        var labelText = $(ui.draggable).html();
        var droppedID = $(ui.draggable).attr('id');
        var droppedNumber = droppedID.split('_');
        droppedNumber = droppedNumber[1];
        var elementID = 'e_' + droppedNumber;
        var labelElement = document.getElementById('label_' + droppedNumber);
        // get the module element were dealing with
        for (var i = 0; i < dragElements.length; i++) {
                if (dragElements[i].e_id == elementID) {
                    var droppedElement = dragElements[i];
                }
        }
        if ($('#' + elementID).parent().attr('id') != 'dropWrapper') {
            $('#' + elementID).remove();
            $('#dropWrapper').append('<div id="' + elementID + '"></div>');
            $('#' + elementID).css({ left: event.clientX - pos.left, top: event.clientY -  pos.top});
            droppedElement.makeDraggable(dragElements);
        }
        if (event.clientX > (dropWrapper.width() + pos.left) - (labelWidth))
        {
            var labelOverX = true;
        }
        if (event.clientY < (pos.top + labelHeight))
        {
            var labelOverY = true;
        }
        if(event.clientY > (dropWrapper.height() + pos.top) - 80) 
        {
            var labelUnderY = true;
        }
        if (labelOverX && labelOverY) {
            var posX = (event.clientX - pos.left) - 45;
            var posY = (event.clientY - pos.top) + 40;
        }
        else if (labelOverX && !labelOverY) {
            var posX = (event.clientX - pos.left) - 45;
            var posY = (event.clientY - pos.top) + 40;
        }
        else if (!labelOverX && labelOverY) {
             var posX = (event.clientX - pos.left) + 20;
             var posY = (event.clientY - pos.top) + 40;
        }
        else {
            var posX = (event.clientX - pos.left) + 20;
            var posY = (event.clientY - pos.top) + 40;
        }
        // need to update posY if under
        if (labelUnderY){
            var posY = (event.clientY - pos.top) - 80;
        }
        if (!labelElement) {
            createLabel(droppedElement, droppedNumber,labelText, '', '', posX, posY, labelWidth, labelHeight);
        }
        // get and set the postions for element and label
        var elementPos = $('#' + elementID).offset();
        var labelPos = $('#label_' + droppedNumber).offset();
        var dropWrapperPos = $('#dropWrapper').offset();
        var elXY = {
            x: elementPos.left - dropWrapperPos.left,
            y: elementPos.top - dropWrapperPos.top,
        }
        var labelXY = {
            x: labelPos.left - dropWrapperPos.left,
            y: labelPos.top - dropWrapperPos.top,
        }
        droppedElement.setPositions(elXY, labelXY);

        for(var i=0;i<dragElements.length;i++){
            if(dragElements[i].elXYpos.x > -1 || dragElements[i].elXYpos.y > -1)
            document.getElementById('el'+i).innerHTML = Math.round(dragElements[i].elXYpos.x) + 'x , ' + Math.round(dragElements[i].elXYpos.y)+'y';
        }

    }
});
function createLabel(droppedElement, droppedNumber, labelText, el_x, el_y, label_x, label_y,labelWidth, labelHeight) {
    droppedElement.setDroppedBool(true);
    var dropWrapperPos = $('#dropWrapper').offset();
    // change the class create the label element and then set it draggable
    var label_id = 'label_' + droppedNumber;
    if (droppedElement.isNew) {
        $('#e_' + droppedNumber).removeClass('dragDropLabelRed').addClass('dragDropDotRed').text('');
        $('#dropWrapper').append('<div id="' + label_id + '" class="dragDropLabelRed">' + labelText + '</div>');
    }
    else {
        $('#e_' + droppedNumber).removeClass('dragDropLabelBlack').addClass('dragDropDotBlack').text('');
        $('#dropWrapper').append('<div id="' + label_id + '" class="dragDropLabelBlack">' + labelText + '</div>');
    }
    var dragLabel = new createDragDropElement();
    dragLabel.init('', '', label_id, '');
    $('#' + label_id).css({ left: label_x, top: label_y, position: 'absolute' });
    // add a right click event to delete
    document.getElementById(label_id).addEventListener('contextmenu', function (e) {
        e.preventDefault();
        $('.rightClickMenu').css({ display: 'block', left: e.clientX, top: e.clientY });
        var droppedNumber = this.id.split('_');
        droppedNumber = droppedNumber[1];
        droppedNumber = 'e_' + droppedNumber;
        for (var i = 0; i < dragElements.length; i++) {
            if (dragElements[i].e_id == droppedNumber) {
                // get ready to reset this label
                dragElements[i].setReset = true;
            }
            else{ dragElements[i].setReset = false; }
        }
    }, false);
    drawLine(droppedNumber, droppedElement.isNew, false);
    $('#label_' + droppedNumber).draggable('option', 'containment', '#dropWrapper');
    $('#e_' + droppedNumber).draggable('option', 'containment', '#dropWrapper');
    dragLabel.setDragEl(dragElements);
}

function drawLine(lineNumber, isNew, redraw) {
    if (!redraw) {
        if (isNew) { var lineClass = 'lineStyleRed'; }
        else { var lineClass = 'lineStyleBlack'; }
    }
    var thickness = 1;
    var off1 = $('#e_' + lineNumber).position();
    var off2 = $('#label_' + lineNumber).position();
    var x1 = off1.left;
    var y1 = off1.top;
    var x2 = off2.left;
    var y2 = off2.top;
    // distance
    var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    // make hr
    if (!redraw) {
        var htmlLine = '<div id="lineDiv' + lineNumber + '" class="' + lineClass + '" style="left:' + cx + 'px; top:' + cy + 'px; width:' + length + 'px; -moz-transform:rotate(' + angle + 'deg); -webkit-transform:rotate(' + angle + 'deg); -o-transform:rotate(' + angle + 'deg); -ms-transform:rotate(' + angle + 'deg); transform:rotate(' + angle + 'deg);" />';
        $('#dropWrapper').append(htmlLine);
    }
    else { $('#lineDiv' + lineNumber).css({ left: cx + 'px', top: cy + 'px', width: length + 'px', transform: 'rotate(' + angle + 'deg)' }); }
}
document.getElementById('submitJson').addEventListener('click', function(){
    console.log('json sent');
    
});


});