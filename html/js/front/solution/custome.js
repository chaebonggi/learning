$(function () {
    // //서브페이지 퀵메뉴
    // var quickMenu = $("#quickMenu");
    // var quickTop = 20;
    // var right = ($(window).width()/2-800);
    //
    // $(window).resize(function () {
    //     if($(window).width() < 1700){
    //         quickMenu.css({'right': 10});
    //     } else {
    //         quickMenu.css({'right': right});
    //     }
    // });
    //
    // if($(window).width() < 1700){
    //     quickMenu.css({'right': 10});
    // } else {
    //     quickMenu.css({'right': right});
    // }
    //
    // quickMenu.css({'top': $(window).height()});
    // quickMenu.animate({'top': $(window).scrollTop() + 382 + 'px'}, 500);
    //
    // $(window).scroll(function () {
    //     // console.log($(window).scrollTop());
    //     if($(window).scrollTop() < 500){
    //         quickMenu.stop();
    //         quickMenu.animate({ 'top': 382 + 'px'}, 500);
    //     } else {
    //         quickMenu.stop();
    //         quickMenu.animate({ 'top': $(window).scrollTop() + quickTop + 'px'}, 500);
    //     }
    // });
    //
    // $(".quick-top").click(function () {
    //     $("html, body").animate({scrollTop: 0}, 500);
    //     quickMenu.animate({'top': 382}, 500);
    // });

    //서브 퀵메뉴 widht left

    //부서장메뉴_renewal
    $(".dep-menu").hide();
    $('.head-top li.master').hover(function () {
        $(this).children('.dep-menu').stop().slideDown(300);
    }, function () {
        $(this).children('.dep-menu').stop().slideUp(300);
    });
    $('.head-top li.master').hover(function () {
        $(this).children('.dep-menu').stop().slideDown(300);
    }, function () {
        $(this).children('.dep-menu').stop().slideUp(300);
    });

    //부서장메뉴_renewal width 가변
    var totalWidth2 = 200;
    var partWidth2 = $('.master .dep-menu .part');

    partWidth2.each(function () {
        totalWidth2 = totalWidth2 + partWidth2.width() + 20;
    });
    // console.log("부서장 메뉴전체 : "+totalWidth2+", 부서장 메뉴전체-200 : "+(totalWidth2-200));
    //ie인지 아닌지
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("msie") != -1 || agent.indexOf("trident") != -1) {
        $('.master .dep-menu').innerWidth(totalWidth2-240);
        // console.log($('.master .dep-menu').innerWidth());
    } else {
        $('.master .dep-menu').width(totalWidth2-200);
    }

    //tab-menu
    $('.tab_menu').find('a').on('click', function(e) {
        var $this = $(this);
        var $all_tab_nav = $this.parents('.tab_menu').find('li');
        var $tab_contents = $this.parents('.tab-wrap').find('.tab-content > div');
        var id = $this.attr('href');

        e.preventDefault();
        $all_tab_nav.removeClass('on');
        $this.parent().addClass('on');
        $tab_contents.removeClass('on');
        $(id).addClass('on');
    });

});
