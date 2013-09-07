
window.FullAjaxJS = window.FullAjaxJS==null ? {} : FullAjaxJS; 
window.FullAjaxJS.testMode = false;

FullAjaxJS.initFullAjax = function(){
    FullAjaxJS.initAnchors();
    if(window.onpopstate == null){
        window.onpopstate = FullAjaxJS.onPushPopState;
        FullAjaxJS.initState =  {"aHref": "/" + document.location.pathname.substr(1) , "updateContainerId":"mid", "initialLoad":true};
    }
    FullAjaxJS.loaderDiv = $("#loader-div");
    $("#loader-div").remove();
    
    FullAjaxJS.executeOnReady();
};

FullAjaxJS.initAnchors = function(){
    $("a.ajaxAnchor").unbind("click");
    $("a.ajaxAnchor").click(function(event){
        
        var updateContainerId = $(this).attr("data-update-container-id");
        var aHref = $(this).attr("href");
		FullAjaxJS.makeAjaxCall(aHref,updateContainerId,true);
        event.preventDefault();
        return false;
    });
};

FullAjaxJS.makeAjaxCall = function(aHref,updateContainerId,isNew){
    if(FullAjaxJS.loaderDiv){
        var containerToUpdate = $("#" + updateContainerId);  
        containerToUpdate.css("position","relative");
        containerToUpdate.append(FullAjaxJS.loaderDiv);
    }
    var callAjax = function(){
    $.ajax({type: "GET",dataType: 'html', url: aHref
        })
        .done(function(data) {
            FullAjaxJS.updateContent(data, updateContainerId, aHref, isNew);
        })
        .fail(function(error) { 
            throw error;
        });
    };
    if(window.FullAjaxJS.testMode)
        setTimeout(callAjax,500);
    else    
        callAjax();
};

FullAjaxJS.updateContent = function(data, updateContainerId, aHref, isNew){
    if(isNew){
        var stateObj = {"aHref":aHref , "updateContainerId":updateContainerId};
        history.pushState( stateObj, "title" , aHref);  
    }
    var containerToUpdate = $("#" + updateContainerId);
    var parseData = $.parseHTML(data,document,true);
    var containerToAdd=null;
    $(parseData).each(function(i,o){        
        if(o.toString().indexOf("HTMLDivElement") > -1){     
            var foundDiv = $(o).find("#" + updateContainerId);
            if(containerToAdd == null && foundDiv.length > 0)
                containerToAdd = foundDiv;         
        }
        else if(o.toString().indexOf("Script") > -1){
            if(o.src.length > 0){
                jQuery.getScript(o.src, function(){});
            }
            else{
                eval(o.textContent);
            }
        }
    });
       
    containerToUpdate.empty();    
    containerToUpdate.append(containerToAdd.contents());
    //init Anchors
    FullAjaxJS.initAnchors();
    //execute custom on ready
    FullAjaxJS.executeOnReady();

    //scripting -- oldway
    /*var scriptRegex = /<script>([^]*)<\/script>/g;
    var s,s1;
    while( s = scriptRegex.exec(data)){
        eval(s[1]);
    }
    
    scriptRegex = /<script src=\"(.*)\"\/>/g;
    while( s1 = scriptRegex.exec(data)){
            jQuery.getScript(s1[1], function(){
                    //TODO
                    FullAjaxJS.executeOnReady();
            });
    }*/
};

FullAjaxJS.onPushPopState = function(event)
{   
    var stateObj;
    if(event.state){
        stateObj = event.state;
    }
    else if(event.state == null){
        stateObj = FullAjaxJS.initState;    
        if(FullAjaxJS.initState.initialLoad == true){
            FullAjaxJS.initState.initialLoad = false;
            return;
        }
    }
    FullAjaxJS.makeAjaxCall(stateObj.aHref, stateObj.updateContainerId, false);

};

FullAjaxJS.executeOnReady = function(){
    if(FullAjaxJS.readyFunctionList){
    for( var i = 0; i < FullAjaxJS.readyFunctionList.length; i++)
        FullAjaxJS.readyFunctionList[i]();
    }
    FullAjaxJS.readyFunctionList = undefined;

};

FullAjaxJS.onReady = function(func){
    FullAjaxJS.readyFunctionList =  FullAjaxJS.readyFunctionList || [];
    FullAjaxJS.readyFunctionList.push(func);
};

$(document).ready(FullAjaxJS.initFullAjax);