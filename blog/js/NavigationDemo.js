function Navigation()
{
    
    var index = 0;
    var count = 0;
    var leftButtonSelector = "";
    var rightButtonSelector = "";
    var radSelector = "";
    var properties = { width: 600, height: 400, backgroundUrl: null, duration:500};
    var isAutoRotate =  true;
    var defaultRotateDuration = 7000;
    var autoRotateDuration = defaultRotateDuration;
    var navBackgroundId = "navBackground";
    var navContainerId = "navContainer";
    var timeoutId;
    this.init = function (containerSelector,specialComponentSelector,buttonLeftSelector,buttonRightSelector,radGroupName,newProperties)
    {
        if(newProperties!=null)
        {
           if(newProperties.width!=null)
               properties.width = newProperties.width;      
           if(newProperties.height!=null)
               properties.height = newProperties.height;
           if(newProperties.backgroundUrl!=null)
               properties.backgroundUrl = newProperties.backgroundUrl;
           if(newProperties.duration!=null)
               properties.duration = newProperties.duration;
        }
        
        var navHtml = '';
        if(properties.backgroundUrl != null)
        {
            navHtml+='<div id="'+navBackgroundId+'" style="position:absolute;left:0px;width:400%;height:100%;background-image:url(\''+ properties.backgroundUrl + '\')">\
                      </div>';
        }    
        navHtml+=' <div  style="width:'+properties.width+'px;margin:auto;overflow:hidden;height:'+properties.height+'px;top:0px;position:relative;">\
                        <div id="'+navContainerId+'"  style="left:0px;position:relative;"></div>\
                    </div>';
        $(containerSelector).prepend(navHtml);
            
        leftButtonSelector = buttonLeftSelector;
        rightButtonSelector = buttonRightSelector;
        $(leftButtonSelector).click(clickLeft);
        $(rightButtonSelector).click(clickRight);
        
        radSelector = 'input[name='+ radGroupName + ']:radio';
        if($(radSelector).length > 0)
            $(radSelector).click(radClick);
        
        $(specialComponentSelector).each(function(i,e)
        {
            $(e).appendTo("#"+navContainerId);
            $(e).css("left", i * properties.width + "px");
            $(e).css("position","absolute");
            $(e).css("width",properties.width+"px");
            $(e).css("height",properties.height+"px");
            $(e).css("top","0px");            
            count++;
        });
        resetInterval();
    }
    function resetInterval()
    {
        if(isAutoRotate)
        {
            if(timeoutId != null)
                clearInterval(timeoutId);
            timeoutId = setInterval(function autoRotate()
                {
                    if(index<count-1)
                    {
                        clickRight(null);
                    }
                    else
                    {
                        index = 0;
                        navigate(null,onLeftComplete);
                    }
                },autoRotateDuration);
        }
    }
    function clickRight(ev)
    {
        index++;
        resetInterval();
        navigate(ev,onRightComplete);
    }
    function clickLeft(ev)
    {
        index--;
        resetInterval();
        navigate(ev,onLeftComplete);
    }
    function navigate(ev,onComplete)
    { 
        if(index==0)
            $(leftButtonSelector).attr("disabled","disabled");
        else if(index == count-1)
            $(rightButtonSelector).attr("disabled","disabled");
        
       $("#"+navContainerId).animate({left:(-index)*properties.width+'px'},properties.duration,'linear',onComplete);
        
        if(properties.backgroundUrl!=null)
            $("#"+navBackgroundId).animate({left:(-index-1)*properties.width/count +'px'},properties.duration)
    }
    function onLeftComplete()
    {
        if(index < count-1)
            $(rightButtonSelector).removeAttr("disabled");
        setRadio();
    }
    function onRightComplete()
    {
        if(index > 0)
            $(leftButtonSelector).removeAttr("disabled");
        setRadio();
    }
    function setRadio()
    {
        $(radSelector).each(function (i,e)
            {
                if(i == index)
                    $(e).attr("checked","checked");
                else
                    $(e).removeAttr("checked");
            });
    }
    function radClick(ev)
    {
        resetInterval();
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
