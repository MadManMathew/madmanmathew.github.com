var recentWorkJSon = { 
    "recentWork": 
        [  
            { "img":"assets/recentWork1.png",
             "title":"Graphic River",
             "details":"Print Design"},
            { "img":"assets/recentWork2.png",
             "title":"Dietary Couseling",
             "details":"Website / Interface Design"},
            { "img":"assets/recentWork3.png",
             "title":"Rockable Press",
             "details":"Branding"}
        ] 
};

initialNavigation("#navigationDiv",".specialNavDiv","assets/cloudsBackground.jpg","#leftButton","#rightButton","navRad1");
initNavigation2("#recentWorkColumnsDiv","recentWork columnThird droidFont greyFont",recentWorkJSon,null);
function on_doc_ready()
{   
    $.getJSON('js/testimonials.json',
        function(json) {
            $(json.testimonials).each(function (i,testimonial)
                 {
                     var testimonialDiv = $(".testimonialDiv:first");
                     if(i>0){
                        testimonialDiv.clone().appendTo(testimonialDiv.parent());   
                     }
                     testimonialDiv.find(".testimonialQuote").html(testimonial.quote);
                     testimonialDiv.find(".testimonialAuthor").html(testimonial.author);
                     testimonialDiv.find(".testimonialTitle").html(testimonial.title);
                 });
            if(json.testimonials.length == 0)
                $(".testimonialDiv:first").remove();
        });
    
/*$.get("https://api.twitter.com/1/statuses/user_timeline.rss?screen_name=MadManMathew", function(data)
      {
          alert(data);
      }
);*/

}
$(document).ready(on_doc_ready);

