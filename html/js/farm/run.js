$(document).ready(function(){
// 1depth 메뉴 이벤트
	$(".gnb_area > li > a").click(function(e){
        e.preventDefault();
		var is2depth = $(this).parent().children("ul").length;

		if(is2depth > 0){
			$(this).parent().addClass("active");
			$(this).parent().children("a").toggleClass("active");
			$(this).parent().siblings().removeClass('active');
			$(this).next("ul").slideToggle();
		}else{
			location.href = $(this).attr("moveUrl");
		}
	});
	
	// 2depth 메뉴 이벤트
	$(".depthTwoUl > li > a").click(function(){
		location.href = $(this).attr("moveUrl");
	});
	
	// 모바일 메뉴
	$(".menu_btn").click(function(){
		$("#header").toggleClass("active");
		$(this).toggleClass("active");
		$("#gnb").fadeToggle();
	});

	//1depth 메뉴 활성화
	function activeOneMenu()
	{
		$(".gnb_area > li").eq(oneNum).addClass('active');
		if(twoNum != -1) activeTwoMenu();
	}

	//2depth 메뉴 활성화
	function activeTwoMenu()
	{
		$(".gnb_area > li").eq(oneNum).find(".depthTwoUl").show();
		$(".gnb_area > li").eq(oneNum).find(".depthTwoUl").find("a").eq(twoNum).addClass("active");
	}
    
	

	
});

$(window).load(function(){
	/*gnb height*/
	var top_area = $('.top_area').outerHeight();
	  $('#gnb').css('top',top_area);
});
