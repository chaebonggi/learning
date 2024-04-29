$(document).ready(function() {
    $(".header_gnb .all_gnb_menu").click(function(event) {
        event.stopPropagation();
        $('.header_gnb').toggleClass("open");
    });
    // var swiper = new Swiper(".popular_cont .con_list", {
    //     // spaceBetween: 10,
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     roundLengths: true,
    //     loop: true,
    //     // loopAdditionalSlides: 30,
    //     navigation: {
    //         nextEl: ".popular_cont .swiper-button-next",
    //         prevEl: ".popular_cont .swiper-button-prev",
    //     },
    // });
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
        // breakpoints: { 
        //     1024: {
        //         slidesPerView: 'auto',
        //         spaceBetween: 10,
        //     },
        // }
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
        // breakpoints: { 
        //     1024: {
        //         slidesPerView: 'auto',
        //         spaceBetween: 10,
        //     },
        // }
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
        // breakpoints: { 
        //     1024: {
        //         slidesPerView: 'auto',
        //         spaceBetween: 10,
        //     },
        // }
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
        // breakpoints: { 
        //     1024: {
        //         slidesPerView: 'auto',
        //         spaceBetween: 10,
        //     },
        // }
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
    // const pauseFunc = ()=>{
    //     mainSwiper.autoplay.stop()
    //     swiperEl.classList.add('swiper-paused');
    // }
    // const resumeFunc = ()=>{
    //     mainSwiper.autoplay.start();
    //     swiperEl.classList.remove('swiper-paused');
    // }
    // pauseEl.addEventListener('click', pauseFunc);
    // resumeEl.addEventListener('click', resumeFunc);

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
    //  breakpoints: {
    //      1024: {
    //          slidesPerView: 'auto',
    //          spaceBetween: 10,
    //      },
    //  },
    });

    // 더보기 버튼
    $(".list_detail .review .item").slice(0, 3).css("display", "flex");
    $(".list_detail .moreBtn").click(function (e) {
        $(".list_detail .review .item:hidden").slice(0, 3).fadeIn(200).css('display', 'flex');
        if ($(".list_detail .review .item:hidden").length == 0) {
            $('.list_detail .moreBtn').fadeOut(100);
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
}); 

function chgAlwStdTypeTab(alwstdCode){
    $(".cont_tabs > li").removeClass("active");
    $("#alwStdType_"+alwstdCode).addClass("active");
    $(".tab_content").hide();
    $("#tabCont_" + alwstdCode).show();
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