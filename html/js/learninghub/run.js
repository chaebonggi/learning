$(document).ready(function() {
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
    
    $('.header .m_menu_wrap .m_close_btn').click(function () {
        $('.header .m_menu_wrap').removeClass('show');
        $('body').removeClass('not_scroll');
    });


    var swiper = new Swiper(".recommend_cont .con_list", {
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
    });
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
            delay: 5000,
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
    document.addEventListener("DOMContentLoaded", function() {
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
        } else {
            console.error("Pause or resume button element not found!");
        }
    });

    var swiper = new Swiper('.hot_trend .con_list', {
        initialSlide: 0,
        spaceBetween: 24,
        slidesPerView: 4,
        autoplay: false,
        loop: false,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.hot_trend .swiper-button-next',
            prevEl: '.hot_trend .swiper-button-prev',
        },
    //  pagination: {
    //      clickable : true,
    //      el: '.hot_trend .swiper-pagination',
    //      type: 'bullets',
    //  },
     breakpoints: {
         1024: {
             slidesPerView: 3,
             spaceBetween: 10,
         },
         480: {
            slidesPerView: 2,
            spaceBetween: 5,
        },
     },
    });

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
     $(".view_list_wrap .moreBtn").click(function (e) {
         $(".view_list_wrap .view_list .item:hidden").slice(0, 8).fadeIn(200).css('display', 'block');
         if ($(".view_list_wrap .view_list .item:hidden").length == 0) {
             $('.view_list_wrap .moreBtn').fadeOut(100);
         }
     });
    
    
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
    $('input:checkbox[name="ckArea"]').change(function() {
        fn_chkSrchArea($(this));
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

// 쪽지함 checkbox all 
function checkSelectAll(checkAll)  {
    const checkboxes = document.getElementsByName('checkList');
    
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
    $('#' + id).prop("checked", true);
    let appendHtml = "<span class=\"selected_keyword\" id=\"txt_" + id + "\">";
    appendHtml += idTxt;
    appendHtml += "<button type=\"button\" class=\"btn_del\" onclick=\"fn_DelCdArray('" + id + "');\">";
    appendHtml += "<span class=\"txt\">X</span>";
    appendHtml += "</button>";
    appendHtml += "</span>";
    $(".keywords_wrap .keywords").append(appendHtml);
}
function fn_DelCdArray(id) {
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
    $('.keywords_wrap .keywords').children().remove();
    $("input:checkbox[name^='ckArea']").prop("checked", false);
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