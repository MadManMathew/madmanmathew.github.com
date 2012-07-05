var index = 0;
var count = 0;

function initialNavigation(containerSelector,specialComponentSelector,backgroundPath,buttonLeftClass,buttonRightClass)
{
    $(containerSelector).append('\
    <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
        <div id="couldBG" style="position:absolute;left:-200px;width:150%;height:100%;background-image:url(\''+ backgroundPath + '\')"><\/div> \
    <\/div> \
    <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
        <div style="margin:auto;width:1186px;"> \
            <div style="float:left;"><button id="leftButton" onclick="clickLeft(event)" disabled="disabled" class="'+buttonLeftClass+'"><\/button> <\/div>\
            <div style="float:right;"><button id="rightButton" onclick="clickRight(event)" class="'+buttonRightClass+'"><\/button> <\/div>\
        <\/div>\
        <div  style="width:966px;margin:auto;overflow:hidden;height:350px;">\
            <div id="testNav"  style="left:0px;position:relative;"><\/div>\
            <h3 id="indexText" style="right:0px;top:0px;position:relative;text-align:right;"> 1</h3>\
        <\/div>\
    <\/div>');
    
    $(specialComponentSelector).each(function(i,e)
    {
        $(e).appendTo("#testNav");
        $(e).addClass("testNavDiv");
        $(e).css("top","0px");
        $(e).css("position","absolute");
        $(e).css("width","100%");
        $(e).css("left", i * 966 + "px");
        count++;
    });
}
function clickLeft(ev)
{
    index--;
    if(index==0)
        $("#leftButton").attr("disabled","disabled");

   $("#testNav").animate({left:(-index)*966+'px'},500,'linear',onLeftComlete);
   $("#couldBG").animate({left:(-index-1)*200 +'px'},500);
   $("#indexText").html((index+1).toString());

}
function clickRight(ev)
{
    index++;
    if(index == count-1)
        $("#rightButton").attr("disabled","disabled");
   $("#testNav").animate({left:(-index)*966+'px'},500,'linear',onRightComplete);
   $("#couldBG").animate({left:(-index-1)*200 +'px'},500);
   $("#indexText").html((index+1).toString());
    
}
function onLeftComlete()
{
    if(index < count-1)
        $("#rightButton").removeAttr("disabled");
}
 function onRightComplete()
{
    if(index > 0)
        $("#leftButton").removeAttr("disabled");
}
