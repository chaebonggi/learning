$(document).ready(function () {

    $('.h_mobile_close').click(function () {
        $('.h_mobile').removeClass('show');
        $('.h_menu').removeClass('active');
    });

    $('#edu .h_search').on('click', function () {
        $('.modal_search_wrapper').show();
        $('.search_menu').show();
        $('.search_menu input[type="text"]').focus();
    });



    $('btn_search_close').click(function () {
        $('.modal_search_wrapper').hide();
        $('.search_menu').hide();
    });
    $("[class$='wrong_message']").hide();

    $('.all_menu').click(function () {
        $(this).toggleClass('active');
        $('.mega_menu').slideToggle(200);
    });


    //Header
    if (window.innerWidth < 1024) {
        $('#header .header-nav .all_menu a').click(function () {
            $('body').toggleClass('lock');
        });
        $('#header .mega_menu #mega_gnb li .tit').click(function () {
            $(this).parent().toggleClass('active')
        });
        $('#newHeader .h_mobile_mid .mobile_menu > li > a').click(function () {
            $(this).parent().toggleClass('active');
        })
    } else {

    }

    $(window).resize(function () {
        if (window.innerWidth < 1024) {
            $('#header .mega_menu #mega_gnb li .tit').click(function () {
                $(this).parent().toggleClass('active')
            });
        }
    });

    function snb() {

        if (window.innerWidth < 768) {
            //snb
            $('.list_wrap .snb .tit').click(function () {
                $(this).toggleClass('active');
                $(this).next().toggleClass('active');
            });

            $(".snb > ul > li > a").click(function () {
                if ($(this).next().is(":hidden")) {
                    $(".snb ul li ul").hide();
                    $(this).next().show();
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active')
                } else {
                    $(".snb ul li ul").hide();
                    $(this).parent().removeClass('active');
                }
            });
        } else {
            /* 좌측메뉴 */
            $(".snb > ul > li > a").click(function () {
                if ($(this).next().is(":hidden")) {
                    $(".snb ul li ul").hide();
                    $(this).next().show();
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active')
                } else {
                    $(".snb ul li ul").hide();
                    $(this).parent().removeClass('active');
                }
            });

            $(".snb > ul > li > ul a").click(function () {
                $(this).parent().addClass('active');
                $(this).parent().removeClass('active');
            });
        }

    }

    snb();
    $(window).resize(snb);

    /*메인 비쥬얼*/
    function updSwiperNumericPagination() {
        this.el.querySelector(".swiper-counter").innerHTML = '<span class="count">0' + (this.realIndex + 1) + '</span><span class="total">0' + this.el.slidesQuantity + "</span>";
    }

    $(".visual").each(function () {
        this.slidesQuantity = this.querySelectorAll(".swiper-slide").length;

        var mySwiper = new Swiper('.visual', {
            speed: 800,
            spaceBetween: 30,
            loop: false,
            autoHeight: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            loop: true,
            on: {
                init: updSwiperNumericPagination,
                slideChange: updSwiperNumericPagination
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        $('.wrap-autoplay-control > .swiper-button-pause').click(function () {
            $(this).hide();
            mySwiper.autoplay.stop();
            $('.wrap-autoplay-control > .swiper-button-play').show()

        });

        $('.wrap-autoplay-control > .swiper-button-play').click(function () {
            $(this).hide();
            mySwiper.autoplay.start();
            $('.wrap-autoplay-control > .swiper-button-pause').show();
        });

    });

    /* 인기 강좌 슬라이드*/
    var swiper = new Swiper('.lecture_list02.slide01 .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.slide01 .lt_swiper-button-next',
            prevEl: '.slide01 .lt_swiper-button-prev',
        },
        breakpoints: {
            1024:{
                slidesPerView: 4,
            },
            769: {
                slidesPerView: 'auto',
            }
        }
    });


    var swiper = new Swiper('.slide03 .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.slide03 .lt_swiper-button-next',
            prevEl: '.slide03 .lt_swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            501: {
                slidesPerView: 1,
            },
            280: {
                slidesPerView: 1,
            },
        }
    });

    var swiper = new Swiper('.review_area .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.review_area .lt_swiper-button-next',
            prevEl: '.review_area .lt_swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            481: {
                slidesPerView: 1,
            },
            280: {
                slidesPerView: 1,
            },
        }
    });

    /*찜하기 버튼*/
    /*$('.like').click(function () {
        $(this).toggleClass('active')
    });*/

    /* 탭메뉴 */
    // 탭 컨텐츠 숨기기
    $(".tab_content").hide();

    // 첫번째 탭콘텐츠 보이기
    $(".tab_container").each(function () {
        $(this).children(".tabs li:first").addClass("active"); //Activate first tab
        $(this).children(".tab_content").first().show();
    });
    //탭메뉴 클릭 이벤트
    $(".tabs li a").click(function () {

        $(this).parent().siblings("li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().parent().parent().find(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
    });

    /* 메뉴 더보기 */
    $('.more_area .more_btn').click(function () {
        $(this).next().show();
    });

    // 외부영역 클릭 시 팝업 닫기
    $(document).mouseup(function (e) {
        var more_area = $(".more_cont");
        if (more_area.has(e.target).length === 0) {
            more_area.fadeOut(200);
        }
    });
    /* 첨부파일 */
    $('.fileInput').change(function () {
        var numfiles = $(this)[0].files.length;
        var parent = $(this).closest('.input-file');
        parent.find('ins').remove();
        for (i = 0; i < numfiles; i++) {
            parent.append('<ins>' + $(this)[0].files[i].name + '</ins>')
        }
    });

    /* faq */
    $('.faq_wrap .tit a').click(function () {
        $(this).parent().parent().next().find('div').slideToggle("200");
        $(this).parent().parent().next().toggleClass('active')
    });




    //스크롤 이동
    $('.go_review a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    /* 공유하기 */
    $('.share > a').click(function () {
        $('.share_layer').fadeToggle(100);
    });


    /*툴팁*/
    $('.qa_wrap a').mouseenter(function () {
        $(this).next().fadeIn(100);
    });
    $('.qa_wrap a').mouseleave(function () {
        $(this).next().fadeOut(100);
    });

    /*$('.like_btn').click(function(){
       $(this).toggleClass('active') 
    });*/

    /* 수강후기 더보기 btn */
    $(".lv_review_list .item").slice(0, 5).css("display", "flex"); // 초기갯수
    $("#load").click(function (e) { // 클릭시 more
        $(".pageCnt").text(parseInt($(".pageCnt").text()) + 5);
        e.preventDefault();
        $(".lv_review_list .item:hidden").slice(0, 5).fadeIn(200).css('display', 'flex'); // 클릭시 more 갯수 지저정
        if ($(".lv_review_list .item:hidden").length == 0) { // 컨텐츠 남아있는지 확인
            $('#load').fadeOut(100);
        }
    });


    var swiper = new Swiper('.lv_slide .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.lv_slide .lt_swiper-button-next',
            prevEl: '.lv_slide .lt_swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 1,
            },
            280: {
                slidesPerView: 1,
            },
        }
    });

    // a href='#' 클릭 무시 스크립트
    $('a[href="#"]').click(function (ignore) {
        ignore.preventDefault();
    });


    /* 강의실 슬라이드 */
    var swiper = new Swiper('.lvr_slide .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.lvr_slide .lt_swiper-button-next',
            prevEl: '.lvr_slide .lt_swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 1,
            },
            280: {
                slidesPerView: 1,
            },
        }
    });

    $('.fileInput02').on('change', function () {
        var $fileTable = $('.file_up .table_style02 table tbody');

        // Clear existing rows
        $fileTable.empty();

        for (var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            var totalBytes = file.size / 1024;

            var filename = file.name;
            var fileNameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
            var fileExtension = filename.substring(filename.lastIndexOf('.') + 1);

            $fileTable.append('<tr><td class="name">' + '<div class="name_wrap">' + '<p class="name_area">' + '<span>' + fileNameWithoutExtension + '</span>' + '.' + fileExtension + '</p>' + '<a href="javascript:void();" class="del_btn">삭제</a>' + '</div>' + '</td><td class="size">' + (totalBytes).toLocaleString() + ' KB' + '</td></tr>');
        }

        $('.file_up .table_style02 table').addClass('active');
    });

    $('.file_up .table_style02 table').on('click', '.del_btn', function () {
        $(this).closest('tr').remove();

        if ($('.file_up .table_style02 table tbody tr').length === 0) {
            $('.file_up .table_style02 table tbody').append('<tr><td></td><td></td></tr>');
        }
    });



    // input file
    const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file

    $("#attachment").on('change', function (e) {
        for (var i = 0; i < this.files.length; i++) {
            let fileBloc = $('<span/>', {
                    class: 'file-block'
                }),
                fileName = $('<span/>', {
                    class: 'name',
                    text: this.files.item(i).name
                });
            fileBloc.prepend('<span class="file-delete"><span class="del">삭제</span></span>')
                .prepend(fileName);
            $("#filesList > #files-names").append(fileBloc);
        };
        for (let file of this.files) {
            dt.items.add(file);
        }
        this.files = dt.files;

        $('span.file-delete').click(function () {
            let name = $(this).next('span.name').text();
            $(this).parent().remove();
            for (let i = 0; i < dt.items.length; i++) {
                if (name === dt.items[i].getAsFile().name) {
                    dt.items.remove(i);
                    continue;
                }
            }
            document.getElementById('attachment').files = dt.files;
        });
    });
    var videoElements = document.querySelectorAll('.customVideo');
    var progressBarElements = document.querySelectorAll('.progressBar');
    var playButtons = document.querySelectorAll('.playButton');
    var videoContainers = document.querySelectorAll('.video_area');
    var youtubeFrames = $(".youtubeVideo");

    $('.video_area  iframe').each(function () {
        // 현재의 src 속성 가져오기
        var currentSrc = $(this).attr("src");

        // URL에 'https://www.youtube.com'이 포함되어 있는지 확인
        if (currentSrc.indexOf('https://www.youtube.com') !== -1) {
            var currentSrc = $(this).attr("src");
            // URL에 매개 변수 추가
            var newSrc = currentSrc + "?enablejsapi=1&version=3&playerapiid=ytplayer";

            // 새로운 src 속성 설정
            $(this).attr("src", newSrc);

        } else {
            $(this).addClass("ny");
            $('.ny').parent().addClass("ny_wrap");
        }
    });
    var items = $(".hot_lecture .item");
    if (items.length >= 5) {
        $('.hot_lecture').slick({
            arrows: true,
            dots: false,
            slidesToShow: 3,
            centerMode: true,
            speed: 200,
            centerPadding: '30px',
            loop: true,
            responsive: [ // 반응형 웹 구현 옵션
                {
                    breakpoint: 1024,
                    settings: {
                        //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                        slidesToShow: 3,
                        centerPadding: '0',
                    }
					},
                {
                    breakpoint: 768,
                    settings: {
                        variableWidth: true,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 5000
                    }
					 },
				]
        });

        // .slick-current 클래스를 가진 요소를 선택합니다.
        var currentSlide = $(".hot_lecture .slick-current");

        // 현재 슬라이드의 인덱스를 가져옵니다.
        var currentIndex = currentSlide.index();

        // 3개 이전의 슬라이드를 찾기 위해 인덱스를 계산합니다.
        var targetIndex = currentIndex - 2;

        // targetIndex가 0 이상인 경우 해당 슬라이드에 "hide" 클래스를 추가합니다.
        if (targetIndex >= 0) {
            var targetSlide = currentSlide.prevAll(".slick-slide").eq(targetIndex);
            targetSlide.addClass("hide_div");
        }


        // 페이지 로드 시 활성 슬라이드의 비디오를 재생
        var initialSlide = $('.hot_lecture .slick-current .video_area');
        var initialVideo = $('.youtubeVideo')[0];
        var video = $('.youtubeVideo');
        var url = $('.youtubeVideo').attr('src');


        // 슬라이더를 초기화합니다. (이 코드는 슬라이더가 최초로 로드될 때 초기화합니다.)
        $('.hot_lecture').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            // 모든 슬라이드의 video_area에서 active 클래스를 제거합니다.

            // 현재 활성 슬라이드의 video_area에 active 클래스를 추가합니다.
            var currentVideoArea = $('.slick-current .video_area');

            // 모든 비디오를 일시 중지합니다.
            $('.customVideo').each(function () {
                $(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                $('.ny').each(function () {
                    var iframe2 = $(this);

                    var src = iframe2.attr('src');
                    // Modify the src value as needed
                    // For example, you can set a new source for each iframe here
                    // src = 'new_source_url';
                    iframe2.attr('src', src);
                });

            });
            // .slick-current 클래스를 가진 요소를 선택합니다.
            var currentSlide = $(".hot_lecture .slick-current");

            // 현재 슬라이드의 인덱스를 가져옵니다.
            var currentIndex = currentSlide.index();

            // 3개 이전의 슬라이드를 찾기 위해 인덱스를 계산합니다.
            var targetIndex = currentIndex - 3;


            $('.hot_lecture').find('.slick-slide').removeClass('hide_div');
            // targetIndex가 0 이상인 경우 해당 슬라이드에 "hide_div" 클래스를 추가합니다.
            if (targetIndex >= 0) {
                var targetSlide = $('.hot_lecture').find('.slick-slide').eq(targetIndex);
                targetSlide.addClass('hide_div');
            }


        });



    } else {
        $('.hot_lecture').addClass('small_item');
        $('.hot_lecture').slick({
            slidesToShow: 2,
            arrows: true,
            dots: false,
        });
        var initialSlide = $('.hot_lecture .video_area');
        $('.hot_lecture').on('beforeChange', function (event, slick, currentSlide) {
            // 모든 슬라이드의 video_area에서 active 클래스를 제거합니다.

            // 현재 활성 슬라이드의 video_area에 active 클래스를 추가합니다.
            var currentVideoArea = $('.slick-current .video_area');

            // 모든 비디오를 일시 중지합니다.
            $('.youtubeVideo').each(function () {
                $(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                $(this).pause()
            });


        });
    }




    // var heightArray = $(".empower_wrap>div .box").map(function () {

    //     return $(this).height();

    // }).get();

    // var maxHeight = Math.max.apply(Math, heightArray);

    // $(".empower_wrap>div .box").height(maxHeight + 50);


    var gnbOffset = $('#gnb-wrap').offset();
    var dw = $(document).width();




    $('.footer_btn').click(function () {
        $(this).toggleClass('active');
        var footerWrap = $('.footer_wrap');

        footerWrap.slideToggle(300, function () {
            if (footerWrap.is(':visible')) {
                // Scroll to the bottom of the screen
                $('html, body').animate({
                    scrollTop: $(document).height()
                }, 300);
            }
        });
    });
    var mySwiper = new Swiper('.lecture_list02.slide02 .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.slide02 .lt_swiper-button-next',
            prevEl: '.slide02 .lt_swiper-button-prev',
        },
        breakpoints: {
            1024:{
                slidesPerView: 4,
            },
            769: {
                slidesPerView: 'auto',
            }
        }
    });
    var empowerSwiper = new Swiper('.empower_slide', {
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            1024:{
                slidesPerView: 2,
            },
            768:{
                slidesPerView: 1,
            },
        }
    });
    // $('.empower_wrap').slick({
    //     arrows: false,
    //     dots: false,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //           breakpoint: 1024,
    //           settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1,
    //             infinite: true,
    //             dots: true
    //           }
    //         },
    //       ]
    // });

    if (window.innerWidth < 1024) {
        // $('.empower_wrap').slick({
        //     arrows: false,
        //     dots: true,
        //     slidesToShow: 1,
        // });
        
     // 초기 상태에서 .item 전체 개수 확인
        // var totalItems = $(".lecture_list02.slide02 .item").length;

        // 초기 상태에서 .item 전체 개수가 4개 이하일 때 버튼 숨기기
        // if (totalItems <= 4) {
        //     $('.m_more').hide();
        // }

        // $('.lecture_list02.slide02 .item').hide();
        // $(".lecture_list02.slide02 .item").slice(0, 4).css("display", "block");

           // 숨겨진 항목이 없을 때
// if ($(".lecture_list02.slide02 .item:hidden").length === 0) {
//     $('.lecture_list02.slide02 .item').hide();
//     $(".lecture_list02.slide02 .item").slice(0, 4).css("display", "block");
//     $('.m_more').text('강좌 접기').addClass('active');
// }

// $(".m_more").click(function (e) {
//     e.preventDefault();
    
//      if ($(".lecture_list02.slide02 .item:hidden").length === 0) {
//         $('.lecture_list02.slide02 .item').fadeOut(200);
//         $(".lecture_list02.slide02 .item").slice(0, 4).fadeIn(200).css('display', 'block');
//          $('.m_more').text('더 많은 강좌 보기').removeClass('active');
//     } else if ($(".lecture_list02.slide02 .item:hidden").length < 5) {
        
//         $(".lecture_list02.slide02 .item:hidden").slice(0, 4).fadeIn(200).css('display', 'block');
//         $('.m_more').text('강좌 접기').addClass('active');
//     } else {
//         $(".lecture_list02.slide02 .item:hidden").slice(0, 4).fadeIn(200).css('display', 'block');
//     }
// });
   
    } else {


        

    }




});

$(window).resize(function () {
    /*$('.hot_lecture').slick('refresh');*/




    if (window.innerWidth < 1024) {
        // $('.empower_wrap').slick({
        //     arrows: false,
        //     dots: true,
        //     slidesToShow: 1,
        // });


        // $(".empower_wrap>div .box").css('height', 'auto');

        // $('.lecture_list02.slide02 .item').hide();
        // $(".lecture_list02.slide02 .item").slice(0, 4).css("display", "block");
        // $(".m_more").click(function (e) {
        //     e.preventDefault();
        //     $(".lecture_list02.slide02 .item:hidden").slice(0, 5).fadeIn(200).css('display', 'block'); // 클릭시 more 갯수 지저정
        //     if ($(".lecture_list02.slide02 .item:hidden").length == 0) { // 컨텐츠 남아있는지 확인
        //         $('.m_more').fadeOut(100); // 컨텐츠 없을 시 버튼 사라짐
        //     }
        // });

    } else {

        //$('.empower_wrap').slick('refresh');

        //$('.empower_wrap').slick('unslick');



        // var ww = $(window).width();
        // var mySwiper = undefined;

        // var mySwiper = new Swiper('.lecture_list02.slide02 .swiper-container', {
        //     slidesPerView: 4,
        //     spaceBetween: 20,
        //     observeParents: true,
        //     observer: true,
        //     navigation: {
        //         nextEl: '.slide02 .lt_swiper-button-next',
        //         prevEl: '.slide02 .lt_swiper-button-prev',
        //     },
        //     breakpoints: {
        //         1200: {
        //             slidesPerView: 4,
        //         },
        //         1024: {
        //             slidesPerView: 3,
        //         },
        //         768: {
        //             slidesPerView: 2,
        //         },
        //         501: {
        //             slidesPerView: 1,
        //         },
        //         280: {
        //             slidesPerView: 1,
        //         },
        //     }
        // });

        // mySwiper.reInit()
        // mySwiper.update();
    }
    $(window).trigger("resize")

    // var heightArray = $(".empower_wrap>div .box").map(function () {

    //     return $(this).height();

    // }).get();

    // var maxHeight = Math.max.apply(Math, heightArray)

    // $(".empower_wrap>div .box").height(maxHeight + 50);

    //파일
    $(document).on('click', '.file_close', function () {
        $(this).parents('.file').remove();
        $('#uploadFile').val("");
        if ($('#upload_prev  .file').length) {} else {
            $('.file_wrap label').removeClass('active')
        }

    });





});



/* 팝업 */
var scrollPosition; // scrollPosition을 함수 외부에서 정의

function openModal(modalname) {
    // scrollPosition 설정
    scrollPosition = $('body').scrollTop();

    // 모달 열기
    $("." + modalname).show();
    $('body').addClass('not_scroll');
    $('.shadow').show();
}

function close_pop(flag) {
    // 모달 닫기
    $('.popup').hide();
    $('body').removeClass('not_scroll');
    $('.shadow').hide();

    // 이전 스크롤 위치로 이동
    $('body').scrollTop(scrollPosition);
}


/*윈도우창 닫기*/
function closeWindow() {
    window.close();
}

// gnb menu
function allMenu() {
    if (window.innerWidth < 860) {
        $('.h_mobile').toggleClass('show');
    } else {
        $('.h_gnb_bg').stop().slideToggle(300);
        $('.h_menu').toggleClass('active');
    }
}
$(document).mouseup(function (e) {
    var navMenu = $(".h_gnb_bg");
    var navBg = $('.h_ui');
    var navBtn = $('.h_menu');
    if (navMenu.has(e.target).length === 0 && navBg.has(e.target).length === 0) {
        navMenu.stop().slideUp(300);
        navBtn.removeClass('active');
    }
});



//자동완성 스크립트
function onSearch(type, keycode) {
    //1입력 방지 20200610
    var srchTxt = $("#srchTxt").val();
    if (srchTxt == "1") {
        return false;
    }

    var code = keycode.keyCode; // 키보드 이벤트 키 값
    var nLenth = $("#srchTxt").val().trim().length;
    if (nLenth != '') {
        var index = 0; // index 설정값
        var originTag = jQuery('input[name=srchTxt]').val(); // 최초 입력한 검색어
        var len = jQuery('#autoComplete > ul > li').length; // 검색된 리스트 수
        if (len > 0) { // 검색된 리스트가 하나라도 있는 경우

            if (code == 40) { // ↓ 키 눌렀을 때

            } else if (code == 38) { // ↑ 키 눌렀을 때

            } else {
                if ($("#autoWordFlag").val() == 'Y') {
                    onAutoSearch();
                }
            }
        } else {
            if ($("#autoWordFlag").val() == 'Y') {
                onAutoSearch();
            }
        }
        /* if ($("#autoWordFlag").val() == 'Y') {
        	onAutoSearch();
        } */
    } else {
        $("#autoComplete").hide();
        $("#wordList li").remove();
    }
}

$('body').on('click', function (e) {
    var clickTarget = e.target;
    if ($(clickTarget).closest('.search-input-wrap').length == 0) {
        $("#autoComplete").hide();
    }
});

//자동완성 단어 조회
function onAutoSearch() {
    //onAutoSearchDelete();
    $.ajax({
        url: "/search.jsp",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        data: {
            "srchType": "05",
            "srchTxt": $("#srchTxt").val(),
            "currentPageNo": "1",
            "limit": "10"
        },
        success: (
            function (obj) {
                onAutoSearchCallBack(obj);
            }
        ),
        error: (
            function (errMsg) {
                //alert("처리 중 문제가 발생하였습니다.");
            }
        )
    });
}

function onAutoSearchCallBack(obj) {
    if (obj.totalCount > 0) {
        $("#autoComplete").show();

        var list = obj.list;
        var li = "";
        var srchTxt = $("#srchTxt").val();
        for (var i = 0, nCnt = list.length; i < nCnt; i++) {
            var data = list[i][0];
            li += "<li><a href=\"#none\"  onclick=\"setSearchText('" + data + "')\" onmouseover=\"onAutoPreview('" + data + "')\" title=\"" + data + " 이동\">" + replaceAll(data, srchTxt, "<strong>" + srchTxt + "</strong>") + "</a></li>\n";
        }

        if (li != "")
            $("#wordList").html(li);
    } else {
        $("#autoComplete").hide();
        onAutoSearchDelete()
    }
}

function onAutoSearchDelete() {
    $("#wordList li").remove();
}

function onAutoSearchClose(e) {
    $("#autoComplete").hide();
}

function onAutoSearchNone() {
    var autoWordFlag = $("#autoWordFlag").val();
    if (autoWordFlag == "Y") {
        onAutoSearchDelete();
        onAutoPreviewDelete();
        $("#autoWordFlag").val("N");
        $("#autoSearchBtn").html("자동완성 켜기");
    } else {
        $("#autoWordFlag").val("Y");
        onAutoSearch();
        $("#autoSearchBtn").html("자동완성 끄기");
    }
}

function onAutoPreview(srchTxt) {
    onAutoPreviewDelete();
    if ($("#autoPreviewFlag").val() == "Y") {
        $("#subSrchTxt").val(srchTxt);
        $.ajax({
            url: "/search.jsp",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            data: {
                "srchType": "06",
                "srchTxt": srchTxt,
                "currentPageNo": "1",
                "limit": "2"
            },
            success: (
                function (obj) {
                    onAutoPreviewCallBack(obj);
                }
            ),
            error: (
                function (errMsg) {
                    //alert("처리 중 문제가 발생하였습니다.");
                }
            )
        });
    }
}

function onAutoPreviewCallBack(obj) {
    if (obj.totalCount > 0) {

        var list = obj.list;
        var li = "";
        var srchSubTxt = $("#subSrchTxt").val();
        for (var i = 0, nCnt = list.length; i < nCnt; i++) {
            var data = list[i];
            var seq = data.seq;
            var mainTitle = data.main_title;
            var encptFileNm = data.encpt_file_nm;
            var imgSrc = "<span></span>";
            if (encptFileNm != "") {
                imgSrc = "<img src=\"/file/image.do?filePath=" + encptFileNm + "\" alt=\"썸네일 이미지\" style=\"height:50px; width:50px;\"/>";
            }
            li += "<li><a href=\"#none\" onclick=\"onSearchView('" + data.seq + "')\" title=\"" + mainTitle + " 이동\">" + imgSrc + replaceAll(mainTitle, srchSubTxt, "<strong>" + srchSubTxt + "</strong>") + "</a></li>\n";
        }

        if (li != "")
            $("#previewList").html(li);
    } else {
        onAutoPreviewDelete()
    }
    $("#subSrchTxt").val("");
}

function onAutoPreviewDelete() {
    $("#previewList li").remove();
}

function onAutoPreviewNone() {
    var autoPreviewFlag = $("#autoPreviewFlag").val();
    if (autoPreviewFlag == "Y") {
        onAutoPreviewDelete();
        $("#autoPreviewFlag").val("N");
        $("#autoPreviewBtn").html("미리보기 켜기");
    } else {
        $("#autoPreviewFlag").val("Y");
        $("#autoPreviewBtn").html("미리보기 끄기");
    }
}


    function close_pop03(flag) {
        $('.sch_pop').hide();
        $('body').removeClass('not_scroll');
        $('.shadow').hide();
    };