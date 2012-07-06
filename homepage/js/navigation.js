function Navigation()
{
    
    var index = 0;
    var count = 0;
    var radSelector = "";
    
    this.init = function (containerSelector,specialComponentSelector,backgroundPath,buttonLeftSelector,buttonRightSelector,radGroupName)
    {
        $(containerSelector).prepend('\
        <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
            <div id="couldBG" style="position:absolute;left:-200px;width:150%;height:100%;background-image:url(\''+ backgroundPath + '\')"></div> \
        </div> \
        <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
            <div  style="width:966px;margin:auto;overflow:hidden;height:350px;top:0px;position:relative;">\
                <div id="testNav"  style="left:0px;position:relative;"></div>\
            </div>\
        </div> ');
        $(buttonLeftSelector).click(clickLeft);
        $(buttonRightSelector).click(clickRight);
        radSelector = 'input[name='+ radGroupName + ']:radio';
        $(radSelector).click(radClick);
        
        $(specialComponentSelector).each(function(i,e)
        {
            $(e).appendTo("#testNav");
            $(e).addClass("testNavDiv");
            $(e).css("top","0px");
            $(e).css("position","absolute");
            $(e).css("width",966+"px");
            $(e).css("left", i * 966 + "px");
            count++;
        });
    }
    function clickLeft(ev)
    {
        index--;
        navigate(ev,onLeftComplete);
    
    }
    function clickRight(ev)
    {
        index++;
         navigate(ev,onRightComplete)
        
    }
    function navigate(ev,onComplete)
    { 
        if(index==0)
            $("#leftButton").attr("disabled","disabled");
        else if(index == count-1)
            $("#rightButton").attr("disabled","disabled");
       $("#testNav").animate({left:(-index)*966+'px'},500,'linear',onComplete);
       $("#couldBG").animate({left:(-index-1)*200 +'px'},500)
    }
    function onLeftComplete()
    {
        if(index < count-1)
            $("#rightButton").removeAttr("disabled");
        setRadio();
        
    }
     function onRightComplete()
    {
        if(index > 0)
            $("#leftButton").removeAttr("disabled");
        setRadio();
    }
    function setRadio()
    {
        $(radSelector).each(function (i,e)
            {
                if(i == index)
                {
                    $(e).attr("checked","checked");
                }
                else
                    $(e).removeAttr("checked");
            });
    }
    function radClick(ev)
    {
        $(radSelector).each(function (i,e)
            {
                if(e == ev.target)
                {
                    if(i > index)
                    {
                        index = i;
                        navigate(ev,onRightComplete);
                    }
                    else
                    {   
                        index = i;
                        navigate(ev,onLeftComplete);
                    }
                }
            });
    }
}
