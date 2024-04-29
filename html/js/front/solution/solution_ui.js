$(document).ready(function () {
    //아이디 비밀번호찾기
    $('.login_wrap ul.main_tab li a').click(function () {
        $('.login_wrap .find_enter').hide();
        $('.login_wrap ul.main_tab li').removeClass('on');
        $('.login_wrap .id_find_result').hide();
        $(this).parent('li').addClass('on');
        $($(this).attr("href")).show();
        return false;
    });
    //찾기방식
    $('.id_find_enter ul.find_tab li a').click(function () {
        $('.id_find_enter .find_method').hide();
        $('.id_find_enter ul.find_tab li a').removeClass('on');
        $(this).addClass('on');
        $($(this).attr("href")).show();
        return false;
    });
    $('.pw_find_enter ul.find_tab li a').click(function () {
        $('.pw_find_enter .find_method').hide();
        $('.pw_find_enter ul.find_tab li a').removeClass('on');
        $(this).addClass('on');
        $($(this).attr("href")).show();
        return false;
    });
    //부서장메뉴
    $('ul.user_info li.master').hover(function () {
        $(this).children('.menu_list').stop().slideDown(300);
    }, function () {
        $(this).children('.menu_list').stop().slideUp(300);
    });
    $('li.master').hover(function () {
        $(this).children('.menu_list').stop().slideDown(300);
    }, function () {
        $(this).children('.menu_list').stop().slideUp(300);
    });

    //부서장 메뉴 width 가변
    var totalWidth = 200;
    var partWidth = $('.menu_list .part');

    partWidth.each(function () {
        totalWidth = totalWidth + partWidth.width() + 20;
    });
    $('.menu_list').width(totalWidth - 200);

    //GNB&Slogan
    $('ul.mp_gnb li.one_dep span').click(function () {
        $('ul.mp_gnb li.one_dep ol').slideUp();
        $(this).next('ol').slideToggle();
    });
    //Header
    $(window).scroll(function () {
        if ($(document).scrollTop() > 0) {
            $('.header .gnb').addClass('move');
        }
        else {
            $('.header .gnb').removeClass('move');
        }
    });
    //GNB
    $('.header li.one_dep').hover(function () {
        $(this).children('ol').stop().slideDown(300);
        $(this).children('span').addClass('on');
    }, function () {
        $(this).children('ol').slideUp(300);
        $(this).children('span').removeClass('on');
        });
    //나의강의실
    $('.MyPage a.detail').click(function () {
        $('.MyPage .data_box').slideToggle(500);
        return false;
    });
    //Graph Tab
    $('.g_list1 .graph_tab a').click(function () {
        $('.g_list1 .graph_data').hide();
        $('.g_list1 .graph_tab a').removeClass('on');
        $($(this).attr("href")).fadeIn();
        $(this).addClass('on');
        return false;
    });
    $('.g_list2 .graph_tab a').click(function () {
        $('.g_list2 .graph_data').hide();
        $('.g_list2 .graph_tab a').removeClass('on');
        $($(this).attr("href")).fadeIn();
        $(this).addClass('on');
        return false;
    });
    $('.g_list3 .graph_tab a').click(function () {
        $('.g_list3 .graph_data').hide();
        $('.g_list3 .graph_tab a').removeClass('on');
        $($(this).attr("href")).fadeIn();
        $(this).addClass('on');
        return false;
    });
});