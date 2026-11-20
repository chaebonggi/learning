$(function () {
    /* 1. 유튜브 쇼츠 자동 ID 추출 및 IFrame API 재생 */
    function getYoutubeId(url) {
        if (!url) return null;
        url = url.trim();
        var match = url.match(/youtube\.com\/shorts\/([^?&#/]+)/i);
        if (!match) match = url.match(/[?&]v=([^?&#]+)/i);
        if (!match) match = url.match(/youtu\.be\/([^?&#/]+)/i);
        return match ? match[1] : null;
    }

    var shortTargets = [];

    $('.og_shorts_auto_wrap .og_short_card').each(function (idx) {
        var $card = $(this);
        var rawUrl = $card.attr('data-url') || '';
        var videoId = getYoutubeId(rawUrl);
        if (!videoId) return;

        $card.attr('href', rawUrl);

        var thumbMax = 'https://img.youtube.com/vi/' + encodeURIComponent(videoId) + '/maxresdefault.jpg';
        var thumbHq = 'https://img.youtube.com/vi/' + encodeURIComponent(videoId) + '/hqdefault.jpg';
        $card.find('.og_short_cover').html(
            '<img src="' + thumbMax + '" onerror="this.onerror=null;this.src=\'' + thumbHq + '\';" alt="">'
        );

        var playerElId = 'ogYtPlayer_' + idx;
        $card.find('.og_short_media').html('<div id="' + playerElId + '"></div>');
        shortTargets.push({ elId: playerElId, videoId: videoId, $card: $card });
    });

    function initYoutubePlayers() {
        $.each(shortTargets, function (_, item) {
            new YT.Player(item.elId, {
                videoId: item.videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    playsinline: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    disablekb: 1,
                    fs: 0,
                    cc_load_policy: 0,
                    origin: window.location.origin
                },
                events: {
                    onReady: function (e) {
                        e.target.mute();
                        e.target.playVideo();
                    },
                    onStateChange: function (e) {
                        if (e.data === YT.PlayerState.PLAYING) {
                            setTimeout(function () {
                                item.$card.find('.og_short_cover').addClass('is_hidden');
                            }, 3200);
                        } else if (e.data === YT.PlayerState.ENDED) {
                            e.target.seekTo(0);
                            e.target.playVideo();
                        }
                    }
                }
            });
        });
    }

    if (shortTargets.length > 0) {
        window.onYouTubeIframeAPIReady = function () {
            initYoutubePlayers();
        };
        if (window.YT && window.YT.Player) {
            initYoutubePlayers();
        } else {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    }

    /* 2. Best Shorts / 스타트업 Shorts 스와이퍼 (PC 3개 고정 / 1024px 이하 5개 슬라이드) */
    var shortsSwiper = null;
    if ($('.og_shorts_swiper').length) {
        shortsSwiper = new Swiper('.og_shorts_swiper', {
            slidesPerView: 3,
            spaceBetween: 16,
            watchOverflow: true,
            freeMode: false,
            allowTouchMove: false,
            observer: true,
            observeParents: true,
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 14,
                    freeMode: true,
                    allowTouchMove: true
                },
                640: {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    freeMode: true,
                    allowTouchMove: true
                }
            }
        });

        $(window).on('resize', function () {
            if (!shortsSwiper) return;
            shortsSwiper.update();
            if (window.innerWidth > 1024) {
                shortsSwiper.slideTo(0, 0);
            }
        });
    }

    /* 3. Open Contents / NEW 스타트업 ZONE: 640px 이하 가로 슬라이드 (1.25개 노출) */
    var courseSwiper = null;
    var mobileQuery = window.matchMedia('(max-width: 640px)');

    function toggleCourseSwiper() {
        if (!$('.og_course_swiper').length) return;
        if (mobileQuery.matches) {
            if (!courseSwiper) {
                courseSwiper = new Swiper('.og_course_swiper', {
                    slidesPerView: 1.25,
                    spaceBetween: 14,
                    freeMode: true,
                    simulateTouch: true,
                    grabCursor: true,
                    observer: true,
                    observeParents: true
                });
            }
        } else {
            if (courseSwiper) {
                courseSwiper.destroy(true, true);
                courseSwiper = null;
            }
        }
    }

    toggleCourseSwiper();
    $(window).on('resize', toggleCourseSwiper);

    /* 4. 강의 시청 모달 열기/닫기 및 목차 아코디언 */
    $(document).on('click', '.og_course_card', function () {
        $('#ogLectureModal .og_lmodal_scroll').scrollTop(0);
        $('#ogLectureModal').addClass('is_open');
        $('body').css('overflow', 'hidden');
    });

    $(document).on('click', '#ogLectureModal .og_lmodal_dim, #ogLectureModal .og_lmodal_close, #ogLectureModal .og_lm_foot_close', function () {
        $('#ogLectureModal').removeClass('is_open');
        $('body').css('overflow', '');
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $('#ogLectureModal').hasClass('is_open')) {
            $('#ogLectureModal').removeClass('is_open');
            $('body').css('overflow', '');
        }
    });

    $(document).on('click', '#ogLmEpList .og_ep_item', function () {
        $('#ogLmEpList .og_ep_item').removeClass('is_active').find('.og_ep_btn').text('▶ 시청하기');
        $(this).addClass('is_active').find('.og_ep_btn').text('▶ 재생중');
    });

    $(document).on('click', '#ogLmMoreBtn', function () {
        var $btn = $(this);
        var isExpanded = $btn.hasClass('is_expanded');
        if (isExpanded) {
            $('#ogLmEpList .og_ep_item').each(function (i) {
                if (i >= 2) $(this).addClass('is_folded');
            });
            $btn.removeClass('is_expanded').find('span').text('강의 목차 더보기');
        } else {
            $('#ogLmEpList .og_ep_item').removeClass('is_folded');
            $btn.addClass('is_expanded').find('span').text('강의 목차 접기');
        }
    });
});