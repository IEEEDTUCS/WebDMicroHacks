$(".page-link").on("click",function(event){
    var t=$(this).attr('href');
    var target=$(t);
    var s=$(".show");    

    s.removeClass('show');
    s.addClass('disable');
    target.removeClass('disable');
    target.addClass('show');
});