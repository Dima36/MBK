$(document).ready(function () {

    var resetFloors = function() {
        $('.left .block').addClass('default').find('.item').addClass('default');
        $('.right .wrapper .item').removeClass('show').find('.popup').removeClass('show');
        $('.drop-down').hide();
        $('.drop-down .subsidiary-item').removeClass('selected');
        $('.floor .right').addClass('select');
    }


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
        $('.participants .line-wrap').removeClass('open').addClass('default');
        $(this).parent().parent().removeClass('default');

        var seleced = $(this).parent().parent().addClass('open').find('.items-list'),
            itemsCount = seleced.find('.item').length,
            wrapWidth = itemsCount * (itemWidth + itemLeftMargin) - itemLeftMargin;

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

    $('.close-slider').live("click", function (itemsCount) {
        slidesNum = 1;
        $('.participants .line-wrap').removeClass('open').removeClass('default');
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
        $('.floor .right').removeClass('select');
        $('.right .wrapper .item').removeClass('show').find('.popup').removeClass('show');
        $('.left .block').removeClass('default').find('.item').removeClass('default');
        $('.drop-down').hide();
        var chack = $(this).hasClass('active');
        if (chack) {
            return false;
        } else {
            $('.floors-nav .item').removeClass("active");
            var tabCount = $(this).addClass("active").index('.floors-nav .item');
            $(".platforms .floor").hide().eq(tabCount).show();
        }
    });

    $('.second-floor').live("click", function () {
        $(".platforms .floor").hide().eq(1).show();
        $('.floors-nav .item').removeClass('active').eq(1).addClass("active");

        $('#list11_active').removeClass('default').parent().parent().removeClass('default');

    });


    // floors mapswitcher
    $('.block .nav .item').live("click", function () {
        resetFloors();
        $('.drop-down .ul li').removeClass('selected');

        $(this).removeClass('default').addClass('selected').parent().parent().removeClass('default');
        $(this).siblings('.drop-down').show().find('ul li:first').addClass('selected');

        var blockId = $(this).attr('data-popup');
        var mapBlock = $("#" + blockId + "_active");
        mapBlock.find('.item').addClass('show').find('.popup').addClass('show');
    });

    $('.drop-down .subsidiary-item').live("click", function () {
        $('.drop-down .subsidiary-item').removeClass('selected');
        $(this).addClass('selected').parent().parent().addClass('selected');
        $('.right .wrapper .item').removeClass('show').find('.popup').removeClass('show');

        var blockId = $(this).attr('data-popup');
        var mapBlock = $("#" + blockId + "_active");
        mapBlock.find('.item').addClass('show').find('.popup').addClass('show');
    });

    $('.wrapper .item .floor-icon').live("click", function () {
        resetFloors();
        $('.wrapper .item .popup').removeClass('show');
        $(this).parent().addClass('show').find('.popup').addClass('show');

        var blockId = $(this).attr('data-list');
        var listBlock = $("#" + blockId + "_active");
        listBlock.removeClass('default').addClass('selected').parent().parent().removeClass('default').addClass('selected');
        listBlock.parent().parent().show().siblings('li').removeClass('default');
    });

    $('.wrapper .close-icon').live("click", function () {
        $(this).parent().removeClass('show');
    });


    // MAP
    var map = L.map('map').setView([59.932040, 30.356126], 16);

    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    /*L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    }).addTo(map);*/

    // map nav
    $('.map-nav li').live("click", function () {
        var chack = $(this).hasClass('active');
        if (chack) {
            return false;
        } else {
            $('.map-nav li').removeClass('active');
            $(this).addClass('active');
        }
    });


    // icons
    var metroIcon = L.divIcon({
            className: 'transport-icon on-foot',
            iconSize: [39, 39]
        }),
        MoscowStationIcon = L.divIcon({
            className: 'transport-icon train',
            iconSize: [39, 39]
        }),
        FinlandStationIcon = L.divIcon({
            className: 'transport-icon train',
            iconSize: [39, 39]
        }),
        PulkovoAirportIcon = L.divIcon({
            className: 'transport-icon plane',
            iconSize: [39, 39]
        }),
        SeaPortIcon = L.divIcon({
            className: 'transport-icon ship',
            iconSize: [39, 39]
        }),
        MapBig = L.divIcon({
            className: 'map-big',
            iconSize: [43, 63]
        });

    L.marker([59.932050, 30.350842], {
        icon: MapBig
    }).addTo(map);

    // markers
    var metroMarker = L.marker([59.931776, 30.354581], {
            icon: metroIcon
        }).bindPopup("ст. метро<br>«Маяковская»").addTo(map),
        MoscowStationMarker = L.marker([59.930103, 30.361997], {
            icon: MoscowStationIcon
        }).bindPopup("Московский<br>ж/д вокзал").addTo(map),
        FinlandStationMarker = L.marker([59.955539, 30.356345], {
            icon: FinlandStationIcon
        }).bindPopup("Финляндский<br>ж/д вокзал").addTo(map),
        PulkovoAirportMarker = L.marker([59.797388, 30.273487], {
            icon: PulkovoAirportIcon
        }).bindPopup("Аэропорт<br>«Пулково»").addTo(map),
        SeaPortMarker = L.marker([59.948942, 30.194941], {
            icon: SeaPortIcon
        }).bindPopup("Пассажирский<br>морской терминал").addTo(map);


    var pointA = new L.LatLng(59.955272, 30.356104),
        pointB = new L.LatLng(59.955334, 30.355697),
        pointC = new L.LatLng(59.955306, 30.355104),
        pointD = new L.LatLng(59.955792, 30.351217),
        pointE = new L.LatLng(59.953843, 30.349887),
        pointF = new L.LatLng(59.949523, 30.348925),
        pointG = new L.LatLng(59.932620, 30.347884),
        pointH = new L.LatLng(59.932230, 30.351011),

        pointAA = new L.LatLng(59.796799, 30.277353),
        pointAB = new L.LatLng(59.790065, 30.324413),
        pointAC = new L.LatLng(59.916753, 30.318088),
        pointAD = new L.LatLng(59.927925, 30.346832),
        pointAE = new L.LatLng(59.929460, 30.347692),
        pointAF = new L.LatLng(59.932614, 30.347898),

        pointBA = new L.LatLng(59.948864, 30.195885),
        pointBB = new L.LatLng(59.948146, 30.195587),
        pointBC = new L.LatLng(59.947034, 30.203536),
        pointBD = new L.LatLng(59.946924, 30.207108),
        pointBE = new L.LatLng(59.945952, 30.214246),
        pointBF = new L.LatLng(59.944686, 30.214054),
        pointBG = new L.LatLng(59.943949, 30.214373),
        pointBH = new L.LatLng(59.939628, 30.218176),
        pointBI = new L.LatLng(59.941105, 30.224789),
        pointBJ = new L.LatLng(59.939320, 30.228782),
        pointBK = new L.LatLng(59.937489, 30.234193),
        pointBL = new L.LatLng(59.938595, 30.245070),
        pointBM = new L.LatLng(59.946218, 30.271620),
        pointBN = new L.LatLng(59.938479, 30.280616),
        pointBO = new L.LatLng(59.941437, 30.290717),
        pointBP = new L.LatLng(59.938130, 30.294529),
        pointBQ = new L.LatLng(59.941015, 30.304075),
        pointBR = new L.LatLng(59.942262, 30.306425),
        pointBS = new L.LatLng(59.938100, 30.312610),
        pointBT = new L.LatLng(59.937056, 30.312421),

        PointsListA = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH],
        PointsListB = [pointAA, pointAB, pointAC, pointAD, pointAE, pointG, pointH],
        PointsListC = [pointBA, pointBB, pointBC, pointBD, pointBE, pointBF, pointBG, pointBH, pointBI, pointBJ, pointBK, pointBL, pointBM, pointBN, pointBO, pointBP, pointBQ, pointBR, pointBS, pointBT, pointH];

    var FinlandStationRoud = new L.Polyline(PointsListA),
        AirportRoud = new L.Polyline(PointsListB),
        PortRoud = new L.Polyline(PointsListC);

    var deleteLines = function () {
        map.removeLayer(FinlandStationRoud);
        map.removeLayer(AirportRoud);
        map.removeLayer(PortRoud);
    }

    // events
    $('#mayakovskaya').live("click", function () {
        metroMarker.openPopup().addTo(map);
        map.setView([59.932040, 30.356126], 16);
        deleteLines();
    });

    $('#moscow-station').live("click", function () {
        MoscowStationMarker.openPopup().addTo(map);
        map.setView([59.930103, 30.361997], 16);
        deleteLines();
    });

    $('#finland-station').live("click", function () {
        FinlandStationMarker.openPopup().addTo(map);
        map.setView([59.955539, 30.356345], 16);
        deleteLines();
        FinlandStationRoud.addTo(map);
    });

    $('#pulkovo-airport').live("click", function () {
        PulkovoAirportMarker.openPopup().addTo(map);
        map.setView([59.797388, 30.273487], 16);
        deleteLines();
        AirportRoud.addTo(map);
    });

    $('#sea-port').live("click", function () {
        SeaPortMarker.openPopup().addTo(map);
        map.setView([59.948942, 30.194941], 16);
        deleteLines();
        PortRoud.addTo(map);
    });
});
