$(document).ready(function() {
    //구
	$(".top_btn").unbind('click').on('click', function() {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
    });
    $('.all_menu').click(function () {
        $('.mega_menu').show();
        $('.sitemapbg').show();
        $('body').addClass('not_scroll');
    });
    
    $('.mega_menu .close_btn').click(function () {
        $('.mega_menu').hide();
        $('.sitemapbg').hide();
        $('body').removeClass('not_scroll');
    });

    $('#header .m_menu .m_search .search_btn').click(function () {
        $(this).toggleClass('active');
        $(this).next().toggle();
    });

    $('#header .m_menu_btn').click(function () {
        $('.m_all_menu').show();
    });

    $('.m_all_menu .m_gnb > li > a').click(function () {
        $(this).next().toggle();
        $(this).addClass('active')
    });

    $('.m_all_menu .m_gnb > li > ul > li > a').click(function () {
        $(this).next().toggle();
        $(this).addClass('active')
    });

    $('.m_all_menu .close_btn').click(function () {
        $('.m_all_menu').hide();
    });
	
	//신
	$(".header_gnb .all_gnb_menu").click(function(event) {
        event.stopPropagation();
        $('.header_gnb').toggleClass("open");
    });
    $('.header .m_all_btn .m_menu_btn').click(function () {
        $('.header .m_menu_wrap').addClass('show');
        $('body').addClass('not_scroll');
    });
    $('.header .m_menu_wrap .m_menu_bottom .m_menu_list > li > a').click(function () {
        $(this).parent().toggleClass('active');
    });   
    $('.header_gnb .gnb_menu').hover(
        function() {
            $(this).addClass('open');
            $('select').blur();
        }
    );
    $('.header_gnb .new_gnb').mouseleave(function() {
        $('.header_gnb .gnb_menu').removeClass('open');
    });   
    
    $('.header .m_menu_wrap .m_close_btn').click(function () {
        $('.header .m_menu_wrap').removeClass('show');
        $('body').removeClass('not_scroll');
    });
    $(".content_wrap .all_search_wrap .check_list .moreBtn").click(function(event) {
        event.stopPropagation();
        $('.check_list').toggleClass("open");
    });
//    $(".content_wrap .all_search_wrap .check_list .moreBtn").hover(function() {
//        $('.check_list').addClass("open");
//        $(this).off("mouseenter mouseleave");
//    });
    $('.q_a .q').click(function (e) {
    	e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle();
        $(this).parent().siblings().find('.a').slideUp()
        $(this).parent().siblings().removeClass('active')
    });
    
    //탭메뉴 클릭 이벤트
    $(".tabs li a").click(function () {

        $(this).parent().siblings("li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).closest('.tab_container').find(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
    });
    
    /*var swiper = new Swiper(".recommend_cont .con_list", {
        spaceBetween: 20,
        slidesPerView: 3,
        autoplay: false,
        loop: false,
        navigation: {
            nextEl: ".recommend_cont .swiper-button-next",
            prevEl: ".recommend_cont .swiper-button-prev",
        },
        // pagination: {
        //     clickable : true,
        //     el: '.recommend_cont .swiper-pagination',
        //     type: 'bullets',
        // },
        breakpoints: { 
            1024: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
        }
    });*/
    var swiper = new Swiper(".banner_wrap .con_list", {
        spaceBetween: 20,
        slidesPerView: 1,
        autoplay: false,
        loop: true,
        navigation: {
            nextEl: ".banner_wrap .swiper-button-next",
            prevEl: ".banner_wrap .swiper-button-prev",
        },
    });
    var swiper = new Swiper(".micro_cont .con_list", {
        slidesPerView: 5,
        spaceBetween: 16,
        slidesPerColumn: 2,
        slidesPerGroup: 10,
        slidesPerColumnFill: "row",
        // direction:'vertical',
        autoplay: {
            delay: 3000,
        },
        loop: false,
        // observer: true,
        // watchOverflow: true,
        // observeParents: true,
        navigation: {
            nextEl: ".micro_cont .swiper-button-next",
            prevEl: ".micro_cont .swiper-button-prev",
        },
        // pagination: {
        //     clickable : true,
        //     el: '.curation_cont .swiper-pagination',
        //     type: 'bullets',
        // },
        breakpoints: { 
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            860: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
        }
    });
    var swiper = new Swiper(".curation_cont .con_list", {
        spaceBetween: 20,
        slidesPerView: 3,
        autoplay: false,
        loop: false,
        navigation: {
            nextEl: ".curation_cont .swiper-button-next",
            prevEl: ".curation_cont .swiper-button-prev",
        },
        // pagination: {
        //     clickable : true,
        //     el: '.curation_cont .swiper-pagination',
        //     type: 'bullets',
        // },
        breakpoints: { 
            1024: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
        }
    });
    var swiper = new Swiper(".etc_cont .con_list", {
        spaceBetween: 20,
        slidesPerView: 4,
        loop: false,
        pagination: {
            clickable : true,
            el: '.etc_cont .swiper-pagination',
            type: 'bullets',
        },
        breakpoints: { 
            768: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
        }
    });
    // 메인 슬라이더
    const swiperEl = document.querySelector('.main_visual_swiper');
    const mainSwiper = new Swiper(swiperEl,{
        speed: 700,
        loop: true,
        effect: 'creative',
        centeredSlides: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.main_visual_swiper .swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.main_visual_swiper .swiper-button-next',
            prevEl: '.main_visual_swiper .swiper-button-prev',
        },
    });
    const pauseEl = document.querySelector('.swiper-button-pause');
    const resumeEl = document.querySelector('.swiper-button-resume');
    if (pauseEl && resumeEl) {
        const pauseFunc = () => {
            mainSwiper.autoplay.stop();
            swiperEl.classList.add('swiper-paused');
        };

        const resumeFunc = () => {
            mainSwiper.autoplay.start();
            swiperEl.classList.remove('swiper-paused');
        };

        pauseEl.addEventListener('click', pauseFunc);
        resumeEl.addEventListener('click', resumeFunc);
    }

    // 과정상세 리뷰 더보기 버튼
    $(".list_detail .review .item").slice(0, 3).css("display", "flex");
    $(".list_detail .moreBtn").click(function (e) {
        $(".list_detail .review .item:hidden").slice(0, 3).fadeIn(200).css('display', 'flex');
        if ($(".list_detail .review .item:hidden").length == 0) {
            $('.list_detail .moreBtn').fadeOut(100);
        }
    });
     // 상세 view list 더보기 버튼
     $(".view_list_wrap .view_list .item").slice(0, 8).css("display", "block");
     /*$(".view_list_wrap .moreBtn").click(function (e) {
         $(".view_list_wrap .view_list .item:hidden").slice(0, 8).fadeIn(200).css('display', 'block');
         if ($(".view_list_wrap .view_list .item:hidden").length == 0) {
             $('.view_list_wrap .moreBtn').fadeOut(100);
         }
     });*/
    
    //인기과정 미리보기
    const $slider = $('.popular_cont');
    let popSwiper = undefined;
    let slideNum = $slider.find('.swiper-slide').length;
    let slideInx = 0;
    let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
            if (newWChk != oldWChk) {
                oldWChk = newWChk;
                sliderAct();
            }
        }, 300);
    });

    function sliderAct() {
        if (popSwiper != undefined) {
            popSwiper.destroy();
            popSwiper = undefined;
        }
        let viewNum = oldWChk == 'pc' ? 2 : 1;
        let loopChk = slideNum > viewNum;
        popSwiper = new Swiper($slider.find('.con_list'), {
            slidesPerView: "auto",
            autoplay: {
                delay: 3000,
            },
            initialSlide: slideInx,
            loop: loopChk,
            centeredSlides: true,
            navigation: {
                prevEl: $slider.find('.swiper-button-prev')[0],
                nextEl: $slider.find('.swiper-button-next')[0],
            },
            on: {
                slideChangeTransitionStart: function() {
                    updateClass();
                },
                init: function() {
                    updateClass();
                },
            },
        });
        function updateClass() {
            $slider.find('.swiper-slide-prev').prev().addClass('first').siblings().removeClass('first');
            $slider.find('.swiper-slide-next').next().addClass('last').siblings().removeClass('last');
        }
    }
    sliderAct();

    // keyword 선택조건 검색
    //학습유형
    $('input:checkbox[name="ckAreaCrsDivCd"]').change(function() {
        fn_chkSrchArea($(this));
    });
    //학습시간
    $('input:checkbox[name="ckAreaEduDayT"]').change(function() {
    	if($("#"+$(this).attr('id')).val() == "5"){
    		fn_DelCdArray("searchEduDayT_10");
    		fn_DelCdArray("searchEduDayT_30");
    		fn_DelCdArray("searchEduDayT_90");
    	}else if($("#"+$(this).attr('id')).val() == "10"){
    		fn_DelCdArray("searchEduDayT_5");
    		fn_DelCdArray("searchEduDayT_30");
    		fn_DelCdArray("searchEduDayT_90");
    	}else if($("#"+$(this).attr('id')).val() == "30"){
    		fn_DelCdArray("searchEduDayT_5");
    		fn_DelCdArray("searchEduDayT_10");
    		fn_DelCdArray("searchEduDayT_90");
    	}else if($("#"+$(this).attr('id')).val() == "90"){
    		fn_DelCdArray("searchEduDayT_5");
    		fn_DelCdArray("searchEduDayT_10");
    		fn_DelCdArray("searchEduDayT_30");
    	}
        fn_chkSrchArea($(this));
    });
    //교재 필요과정
    $('input:checkbox[name="ckAreaTcmtXn"]').change(function() {
        fn_chkSrchArea($(this));
    });
    //모바일학습과정
    $('input:checkbox[name="ckAreaCrsAcceCd"]').change(function() {
        fn_chkSrchArea($(this));
    });
    //고용보험환급과정
    $('input:checkbox[name="ckAreaInsuAppYn"]').change(function() {
        fn_chkSrchArea($(this));
    });
    //과정분류 변경시 키워드 추가삭제 및 체크박스
    $(document).on('change', '[name^=ckAreaCrsClNo]', function(e) {
        const $this = $(this);
        const name = $this.attr('name');
        const isChecked = $this.prop('checked');

        if (name === 'ckAreaCrsClNo1' && isChecked) {
            $("input[name='ckAreaCrsClNo1']").not($this).each(function() {
                $(this).prop('checked', false);
                fn_DelCdArray($(this).attr('id'));
            });

            $("input[name='ckAreaCrsClNo2'], input[name='ckAreaCrsClNo3']").each(function() {
                $(this).prop('checked', false);
                fn_DelCdArray($(this).attr('id'));
            });
        }

        if (name === 'ckAreaCrsClNo2' && isChecked) {
            $("input[name='ckAreaCrsClNo2']").not($this).each(function() {
                $(this).prop('checked', false);
                fn_DelCdArray($(this).attr('id'));
            });

            $("input[name='ckAreaCrsClNo3']").each(function() {
                $(this).prop('checked', false);
                fn_DelCdArray($(this).attr('id'));
            });
        }

        // 조건 추가/삭제는 기존 함수
        fn_chkSrchArea($this);
    });

    
    // select custom menu
    $(".select-menu .select-btn").click(function(){
        $(this).parents().toggleClass("active");
    });
    $(".select-menu .options li").click(function(){
        var defaultOption = $(this).html();
        $(".select-menu .select-btn li").html(defaultOption);
        $(this).parents(".select-menu").removeClass("active");
    });
});
$(window).on('load', function() {
    if ($.fn.scrollbar) {
        $('.popUp .scrollbar-outer').scrollbar();
    }
});
$(function() {
	var $window = $(window);
    var $header = $('header.header_gnb');
    var $quickMenu = $('.header_gnb .quickMenu');
    var $quickTop = $(".header_gnb .quickMenu .quickTop");
    var $quickClose = $(".header_gnb .quickMenu .quickClose");    
	var isMainPage = window.location.pathname.endsWith('index.do');
    var scrollThreshold = isMainPage ? 500 : 350;
    $window.scroll(function() {
        var scrollTop = $window.scrollTop();
        if (scrollTop > 0) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
        if (scrollTop > scrollThreshold) {
            $quickMenu.fadeIn();
        } else {
            $quickMenu.fadeOut();
        }
    });
    $quickTop.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 400);
        return false;
    });
    $quickClose.click(function() {
        $quickMenu.toggleClass('active');
        return false;
    });
});
//circle progress
document.addEventListener('DOMContentLoaded', function () {
    const circles = document.querySelectorAll('.circleArea .circleBar span');
    const svgNamespace = "http://www.w3.org/2000/svg";
    const pathD = "M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831";

    circles.forEach(span => {
        const progress = span.getAttribute('data-progress');
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", "0 0 36 36");

        const createCircle = (className, dasharray, dashoffset) => {
            const circle = document.createElementNS(svgNamespace, "path");
            circle.setAttribute("class", className);
            circle.setAttribute("d", pathD);
            if (dasharray) circle.setAttribute("stroke-dasharray", dasharray);
            if (dashoffset !== undefined) circle.setAttribute("stroke-dashoffset", dashoffset);
            return circle;
        };

        const circumference = 2 * Math.PI * 15.9155;
        const offset = circumference - (progress / 100) * circumference;

        svg.appendChild(createCircle("circleBg"));
        svg.appendChild(createCircle("circle", `${circumference}`, offset));
        
        span.parentElement.insertBefore(svg, span);
    });
});

//쪽지함 checkbox all 
function checkSelectAll(checkAll)  {
    const checkboxes = document.getElementsByName('checkbox');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkAll.checked;
    });
}

function fn_chkSrchArea(obj) {
    fn_AddOrDelCdArray(obj.attr('id'), obj.prop('checked'), obj.next().text());
}
function fn_AddOrDelCdArray(id, checked, idTxt) {
    if (checked) {
        fn_AddCdArray(id, idTxt);
    } else {
        fn_DelCdArray(id);
    }
}
function fn_AddCdArray(id, idTxt) {
	// id가 빈 값인 경우 방어 처리
    if (!id || !idTxt) return;

    $('#' + id).prop("checked", true);
    var appendHtml = "<span class=\"selected_keyword\" id=\"txt_" + id + "\">";
    appendHtml += idTxt;
    appendHtml += "<button type=\"button\" class=\"btn_del\" onclick=\"fn_DelCdArray('" + id + "');\">";
    appendHtml += "<span class=\"txt\">X</span>";
    appendHtml += "</button>";
    appendHtml += "</span>";
    $(".keywords_wrap .keywords .btn_area").before(appendHtml);
}

function fn_DelCdArray(id) {
    // 정확히 일치하는 ID만 처리
    $('#' + id).prop("checked", false);
    $('#txt_' + id).remove();
}

function chgAlwStdTypeTab(alwstdCode){
    $(".cont_tabs > li").removeClass("active");
    $("#alwStdType_"+alwstdCode).addClass("active");
    $(".tab_content").hide();
    $("#tabCont_" + alwstdCode).show();
}
function chgCourseTab(courseTabCode){
    $(".content_wrap .course_wrap .tab_course_menu > li").removeClass("active");
    $(".content_wrap .course_wrap #courseMenu_"+courseTabCode).addClass("active");
    $(".content_wrap .course_wrap .tab_course_cont").hide();
    $(".content_wrap .course_wrap #tabCourse_" + courseTabCode).show();
}
function fn_srchInit() {
    // 'txt_'로 시작하는 span 제거 (기존 선택된 조건 표시 제거)
    $('.keywords_wrap .keywords span[id^="txt_"]').remove();

    // 'ckArea'로 시작하는 라디오 버튼 선택 초기화
    $("input[name^='ckArea']").prop("checked", false);
    
    // 추가적으로 초기화할 다른 조건들 (예: 드롭다운, 텍스트박스 등)
    $("select[name^='search']").val(""); // 예: select 요소 초기화 (기존 선택값 초기화)
    $("input[type='text']").val("");    // 예: 텍스트박스 초기화
}


function openModal(modalname) {
    $("." + modalname).show();
    $('body').addClass('not_scroll');
    $('.shadow').show();
}
function close_pop() {
    $('.popUp').hide();
    $('body').removeClass('not_scroll');
    $('.shadow').hide();
}

function openModal2(modalname) {
    $("." + modalname).show();
    $('.shadow').show();
    $('body').addClass('not_scroll');
}

function onLoading() {
    $('.loading').show();
}


function offLoading() {
    $('.loading').hide();
}

//쿠키 생성
function setCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/'; // 한글 깨짐을 막기위해 escape(cValue)를 합니다. Chrome80 크로스사이트간 쿠키이슈로 SameSite설정을 None으로 합니다. 
	if(typeof cDay != 'undefined') cookies += '; expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}

//쿠키 삭제
function deleteCookie(cookieName){
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	cookies = cookieName + "= " + "; expires=" + expireDate.toGMTString() + '; path=/';
	document.cookie = cookies;
}

function bindDefaultImage($scope) {
    $scope.find("img").each(function () {
    	var $img = $(this);

	    $img.on("error", function () {
	        var src = $img.attr("src");

	        if (src.includes("crs_default_img.png")) {
	            return;
	        }

	        if (src.includes("pathKey=EDUCATION.COURSE") || src.includes("pathKey=EDUCATION.COURSE.MICRO")) {
	            var newSrc = "/images/crs_default_img.png";
	            $img.attr("src", newSrc);

	            var $wrap;
	            if ($img.closest(".micro_cont .con_list").length > 0) {
	                // 마이크로러닝이라면: 이미지 바로 부모 a 태그 찾아서 none_img 클래스 추가
	                $wrap = $img.closest("a");
	                $wrap.addClass("none_img");
	            } else {
	                $wrap = $img.closest(".img_wrap");
	            }
	            //상세페이지 아닐 경우만
				if($img.closest(".detail_wrap").length == 0){
					if ($wrap.length > 0 && $wrap.find(".none_tit").length === 0) {
		                var crsName = $img.attr("alt") || "No Title";
		                $wrap.append('<p class="none_tit">' + crsName + '</p>');
		            }

				}
	            
	        }
	    });
    });
}