$(document).ready(function () {


    // hide/show content tabs
    $(".content-tab").hide().eq(0).show();
    $('header .nav .item').live("click", function () {
        var chack = $(this).hasClass('active');
        if (chack) {
            return false;
        } else {
            $('header .nav .item').removeClass("active");
            var tabCount = $(this).addClass("active").index('header .nav .item');
            $(".content-tab").hide().eq(tabCount).show();
            if (tabCount > 0) {
                $('.logo-min').show();
            } else {
                $('.logo-min').hide();
            }
        }
    });


    // participants slider
    var itemWidth = parseFloat($('.items-list. .item').css('width')),
        itemLeftMargin = parseFloat($('.items-list. .item').css('margin-right')),
        slidesNum = 1;

    $('.slide-title .text').live("click", function (itemsCount) {
        slidesNum = 1;
        $('.participants .line-wrap').removeClass('open');
        var seleced = $(this).parent().parent().addClass('open').find('.items-list'),
            itemsCount = seleced.find('.item').length,
            wrapWidth = itemsCount * (itemWidth + itemLeftMargin) - itemLeftMargin;;

        if (itemsCount < 5) {
            seleced.css({
                "width": wrapWidth + 'px',
                "margin-left": -(wrapWidth / 2) + 'px',
                "left": "50%"
            }).siblings(".prev-slide, .next-slide").hide();
        } else {
            seleced.css({
                "width": wrapWidth + 'px',
                "left": 64
            });
            seleced.siblings(".next-slide").show();
        }

        if (slidesNum === 1) {
            seleced.siblings(".prev-slide").hide();
        }
    });

    $('.next-slide, .prev-slide').live("click", function (itemsCount) {
        var selecedArrow = $(this).siblings('.items-list'),
            itemsCount = selecedArrow.find('.item').length;

        if (slidesNum == 1) {
            selecedArrow.css('left', 64);
        } else if (slidesNum == 2) {
            selecedArrow.css('left', -(itemWidth + itemLeftMargin - 64) * (slidesNum - 1));
        } else if (slidesNum > 2) {
            selecedArrow.css('left', -((itemWidth + itemLeftMargin) * (slidesNum - 1) - 64));
        }

        var test = itemsCount - 3;

        if (slidesNum === 1) {
            $('.prev-slide').hide();
        } else {
            $('.prev-slide').show();
        }

        if (slidesNum === test) {
            $('.next-slide').hide();
        } else {
            $('.next-slide').show();
        }

    });

    $(".next-slide").click(function () {
        slidesNum++;
    })
    $(".prev-slide").click(function () {
        slidesNum--;
    })


    // hide/show floors tab
    $(".platforms .floor").hide().eq(0).show();
    $('.floors-nav .item').live("click", function () {
        var chack = $(this).hasClass('active');
        if (chack) {
            return false;
        } else {
            $('.floors-nav .item').removeClass("active");
            var tabCount = $(this).addClass("active").index('.floors-nav .item');
            $(".platforms .floor").hide().eq(tabCount).show();
        }
    });

    // floors mapswitcher
    $('.block .nav .item').live("click", function () {
        $('.left .block').addClass('default');
        $('.left .block .item').addClass('default');
        $('.block .nav li').removeClass('selected');
        $('.block .drop-down').hide();
        $('.floor.first .right').addClass('select');

        $(this).removeClass('default').addClass('selected').parent().parent().removeClass("default");

        var chack = $(this).hasClass('default');
        if (chack) {
            return false;
        } else {
            $(this).parent().parent().find('.drop-down').show();
        }
    });


    $('.drop-down li').live("click", function () {
        $('.drop-down li').removeClass('selected');
        $(this).addClass('selected');
    });


    $('.block .nav .item, .drop-down li').live("click", function () {
        $(".right .wrapper").removeClass('show');

        var popupid = $(this).attr('id');
        var popup = $("#" + popupid + "_active");
        popup.addClass('show');
    });


    $('.wrapper .close-icon').live("click", function () {
        $(this).parent().parent().removeClass('show');
        /*
        $('.block .nav .item').removeClass('selected').removeClass('default');
        $('.left .block').removeClass('default');
        $('.floor.first .right').removeClass('select');*/
    });


    $('.nutrition-list .item').live("click", function () {
        $('#wrapper5_active').addClass('show');
        $('#wrapper4_active').addClass('show');
    });









    // map
    var map = L.map('map').setView(
        [59.932040, 30.356126],
        16
    );

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);





});
