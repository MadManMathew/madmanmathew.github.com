function Navigation2()
{
    var index = 0;
    var count = 0;
    var radSelector = "";
    var jsonData;
    var containerSelector;
    var columnClass;
    
    this.init = function (containerSel,columnCl,json,radGroupName)
    {        
        jsonData = json;
        containerSelector = containerSel;
        columnClass = columnCl;
        updateColumns();
        radSelector = 'input[name='+ radGroupName + ']:radio';
        $(radSelector).click(radClick);   
    };
    
    function updateColumns()
    {
        $(containerSelector).html("");
        for(var i =index; i < index+3; i++)
        {
            $(containerSelector).append('\
                <div class="'+columnClass+'">\
                        <img src="'+ jsonData.recentWork[i].img +'">\
                        <h4 >'+ jsonData.recentWork[i].title +'</h4>\
                        <p >'+ jsonData.recentWork[i].details +'</p>\
                </div>');
            if(i<index+2)
                   $(containerSelector).append('<div class="columnSpacer"></div>');
        }
        $(containerSelector).animate( {opacity:'1.0'},500 );  
    }
    
    function radClick(ev)
    {
        $(radSelector).each(function (i,e)
            {
                if(e == ev.target)
                {
                    index = i;
                    $(containerSelector).animate(
                        {opacity:'0.0'},
                        500 ,  
                        function(){
                            updateColumns();
                    });
                }
            });
    }
}       





