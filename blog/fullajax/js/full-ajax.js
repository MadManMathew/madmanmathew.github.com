
window.FullAjaxJS = window.FullAjaxJS==null ? {} : FullAjaxJS; 
window.FullAjaxJS.testMode = true;
window.FullAjaxJS.rootPath = "/blog/fullajax";



FullAjaxJS.initFullAjax = function(){
    FullAjaxJS.initAnchors();
    if(window.onpopstate == null){
        window.onpopstate = FullAjaxJS.onPushPopState;
        FullAjaxJS.initState =  {"aHref":document.location.pathname.substr(1) , "updateContainerId":"mid", "initialLoad":true};
    }
    FullAjaxJS.loaderDiv = $("#loader-div");
    $("#loader-div").remove();
    
    FullAjaxJS.executeOnReady();
};

FullAjaxJS.initAnchors = function(){
    $("a.ajaxAnchor").unbind("click");
    $("a.ajaxAnchor").click(function(event){
		FullAjaxJS.makeAjaxCall(this);
        event.preventDefault();
        return false;
    });
};

FullAjaxJS.makeAjaxCall = function(anchor){
    
    var updateContainerId = $(anchor).attr("data-update-container-id");
    var aHref = $(anchor).attr("href");
    
    if(FullAjaxJS.loaderDiv){
        var containerToUpdate = $("#" + updateContainerId);  
        containerToUpdate.css("position","relative");
        containerToUpdate.append(FullAjaxJS.loaderDiv);
    }
    var callAjax = function(){
    $.ajax({type: "GET",dataType: 'html', url: FullAjaxJS.rootPath + aHref
        })
        .done(function(data) {
            FullAjaxJS.updateContent(data, updateContainerId, aHref, true);
        })
        .fail(function(error) { 
            throw error;
        });
    };
    if(window.FullAjaxJS.testMode)
        setTimeout(callAjax,1000);
    else    
        callAjax();
};

FullAjaxJS.updateContent = function(data, updateContainerId, aHref, isForward){
    if(isForward == true){
        var stateObj = {"aHref":aHref , "updateContainerId":updateContainerId};
        history.pushState( stateObj, "title" , aHref);  
    }
    var containerToUpdate = $("#" + updateContainerId);
    var containerToAdd = $(data).find("#" + updateContainerId);
    
       
    containerToUpdate.empty();    
    containerToUpdate.append(containerToAdd.contents());
    //init Anchors
    FullAjaxJS.initAnchors();
    //scripting
    var scriptRegex = /<script>([^]*)<\/script>/g;
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
    }
    
    
};

FullAjaxJS.onPushPopState = function(event)
{   
    alert("testing");
    if(event.state){
        var stateObj = event.state;
        FullAjaxJS.callPopPushFunction(stateObj);
    }
    else if(event.state == null){
        var stateObj = FullAjaxJS.initState;    
        if(FullAjaxJS.initState.initialLoad == false){
            FullAjaxJS.callPopPushFunction(stateObj);
        }
        else{
            FullAjaxJS.initState.initialLoad = false;
        }
    }
};

FullAjaxJS.callPopPushFunction = function(stateObj)
{    
    $.ajax({type: "GET",dataType: 'html', url: FullAjaxJS.rootPath + stateObj.aHref
        })
        .done(function(data) {
            FullAjaxJS.updateContent(data, stateObj.updateContainerId, stateObj.aHref, false);
        })
        .fail(function(error) { 
            throw error;
        });
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

          
