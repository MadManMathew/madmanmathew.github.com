var index = 0;
var count = 0;
var radSelector = "";

function initNavigation2(containerSelector,columnClass,jsonData,radGroupName)
{
    for(var i =0; i < 3; i++)
    {
        $(containerSelector).append('\
            <div class="'+columnClass+'">\
					<img src="'+ jsonData.recentWork[i].img +'">\
					<h4 >'+ jsonData.recentWork[i].title +'</h4>\
					<p >'+ jsonData.recentWork[i].details +'</p>\
            </div>');
        if(i<2)
               $(containerSelector).append('<div class="columnSpacer"></div>');

    }
    
    
   // radSelector = 'input[name='+ radGroupName + ']:radio';
    //$(radSelector).click(radClick);
    
}

function radClick(ev)
{
    $(radSelector).each(function (i,e)
        {
            if(e == ev.target)
            {
                index = i;
                if(i > index)
                    navigate(ev,onRightComplete);
                else
                    navigate(ev,onLeftComplete);
            }
        });
}
            





