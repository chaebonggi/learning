
$(document).ready(function() {
    let linkDepth1 = $(".header_gnb .gnb_item");
    let gnbList = $(".header_gnb");

    linkDepth1.on("mouseenter", function() {
        gnbList.addClass("on");
    });

    gnbList.on("mouseleave", function() {
        setTimeout(function() {
            gnbList.removeClass("on");
        }, 100);
    });

    $('#header .m_menu .search_btn').click(function () {
        $(this).toggleClass('active');
        $(this).next().toggle();
    });

    let mainSwiper = new Swiper(".main_banner", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints: {
            640: {
                spaceBetween: 0,
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".main_banner .swiper-button-next",
            prevEl: ".main_banner .swiper-button-prev"
        },

        pagination: {
            clickable : true,
            el: '.main_banner .control .swiper-pagination',
            type: 'bullets',
        },
    });
    $('.main_banner .control .swiper-button-pause').click(function () {
        $(this).hide();
        mainSwiper.autoplay.stop();
        $('.main_banner .control .swiper-button-play').show()

    });

    $('.main_banner .control .swiper-button-play').click(function () {
        $(this).hide();
        mainSwiper.autoplay.start();
        $('.main_banner .control .swiper-button-pause').show();
    });

    // // tab contents
    function tabSlide() {
        function initializeSwiper(tabId) {
            swiper = new Swiper(`.gpmu_pick ${tabId} .con_list`, {
                spaceBetween: 26,
                slidesPerView: 4,
                autoplay: false,
                loop: false,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: `.gpmu_pick ${tabId} .swiper-button-next`,
                    prevEl: `.gpmu_pick ${tabId} .swiper-button-prev`,
                },
                pagination: {
                    clickable : true,
                    el: `.gpmu_pick ${tabId} .swiper-pagination`,
                    type: 'bullets',
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                    },
                    860: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 1.3,
                        spaceBetween: 10,
                    },
                },
            });
        }
        initializeSwiper('#tab01');   
        
        $(".gpmu_pick .tab_container > .tab_content").hide();

        $(".gpmu_pick .tab_container").each(function () {
            $(this).children(".tab_content").first().show();
        });
        $(".gpmu_pick .tabs li a").click(function (e) {
            e.preventDefault();
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
            $(this).parents('.tab_container').find(".tab_content").hide();
            let tabId = $(this).attr("href");
            initializeSwiper(tabId, true);
            $(tabId).fadeIn();        
        });
    }
    tabSlide();       

    var swiper = new Swiper(".gpmu_best .con_list", {
        spaceBetween: 20,
        slidesPerView: 4,
        autoplay: false,
        loop: false,
        navigation: {
            nextEl: ".gpmu_best .swiper-button-next",
            prevEl: ".gpmu_best .swiper-button-prev",
        },
        pagination: {
            clickable : true,
            el: '.gpmu_best .swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            860: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
        }
    });

    var swiper = new Swiper(".gpmu_new .con_list", {
        spaceBetween: 20,
        slidesPerView: 4,
        autoplay: false,
        loop: false,
        pagination: {
            clickable : true,
            el: '.gpmu_new .swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            860: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
        }
    });

    var swiper = new Swiper(".gpmu_notice .con_list", {
        spaceBetween: 30,
        slidesPerView: 3,
        autoplay: false,
        loop: false,
        navigation: {
            nextEl: ".gpmu_notice .swiper-button-next",
            prevEl: ".gpmu_notice .swiper-button-prev"
        },
        breakpoints: {
            1024: {
                slidesPerView: 2
            },
            640: {
                slidesPerView: 1,
            }
        }
    });

    var swiper = new Swiper(".gpmu_letter .con_list", {
        spaceBetween: 30,
        slidesPerView: 3,
        autoplay: false,
        loop: false,
        pagination: {
            clickable : true,
            el: '.gpmu_letter .swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    }); 
    
    var swiper = new Swiper(".gpmu_etc .con_list", {
        spaceBetween: 20,
        slidesPerView: 4,
        autoplay: false,
        loop: false,
        pagination: {
            clickable : true,
            el: '.gpmu_etc .swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            860: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
        }
    });
});