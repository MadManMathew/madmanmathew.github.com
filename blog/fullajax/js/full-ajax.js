/**
 *
 * @source: http://madmanmathew.github.io/blog/fullajax/js/full-ajax.js
 
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2013  Mathew Sam
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

window.FullAjaxJS = window.FullAjaxJS==null ? {} : FullAjaxJS; 
window.FullAjaxJS.testMode = false;
window.FullAjaxJS.executeOnceScript = ["jquery-1.10.1.min.js","full-ajax.js"];
window.FullAjaxJS.hasHistory = window.history && history.pushState;

FullAjaxJS.initFullAjax = function(){
    if(FullAjaxJS.hasHistory){
        FullAjaxJS.initAnchors();
        if(window.onpopstate == null){
            window.onpopstate = FullAjaxJS.onPushPopState;
            FullAjaxJS.initState =  {"aHref": "/" + document.location.pathname.substr(1) , "updateContainerId":"mid", "initialLoad":true};
        }
        FullAjaxJS.loaderDiv = $("#loader-div");
        $("#loader-div").remove();
    }
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
    var containerToAdd = null;
    var scripts = [];
    $(parseData).each(function(i,o){        
        if(o.toString().indexOf("HTMLDivElement") > -1){     
            $.merge(scripts , $(o).find('script'));
            var foundDiv = $(o).find("#" + updateContainerId);
            if(containerToAdd == null && foundDiv.length > 0)
                containerToAdd = foundDiv;         
        }
        else if(o.toString().indexOf("Script") > -1){
            scripts.push(o);
        }
    });
    
    containerToUpdate.empty();
    containerToAdd.find('script').remove();    
    containerToUpdate.append(containerToAdd.contents());
    
    $(scripts).each(function(i,o){        
        if(o.toString().indexOf("Script") > -1){
            var jsSrc = o.src;
            var jsName = jsSrc.substring(jsSrc.lastIndexOf("/") + 1);
            if(jsSrc.length > 0 && $.inArray(jsName, FullAjaxJS.executeOnceScript) == -1)
                    $.ajax({ url: jsSrc, dataType: "script", async: false});
            else if(o.textContent && o.textContent.length > 0)
                eval(o.textContent);
        }
    });
    //init Anchors
    FullAjaxJS.initAnchors();
    //execute custom on ready
    FullAjaxJS.executeOnReady();
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