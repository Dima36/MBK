$(document).ready(function () {

    var languageRus = true,
        Pagelanguage = $('body').attr('data-langRu');

    if (Pagelanguage === 'eng') {
        languageRus = !languageRus;
    }

    var resetFloors = function () {
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
        }
    });

    $('.BDK-tab').live("click", function () {
        $('header .nav .item').removeClass("active").eq(2).addClass("active");
        $(".content-tab").hide().eq(2).show();
    });

    // hide/show floors tab
    $(".platforms .floor").hide().eq(0).show();
    $('.floors-nav .item').live("click", function () {
        $('.floor .right').removeClass('select');
        $('.right .wrapper .item').removeClass('show').removeClass('default').find('.popup').removeClass('show');
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
        $(".platforms").find(".floor").hide().eq(1).show().siblings('.floors-nav .item').removeClass("active").eq(1).addClass("active");
        $('.left .block').addClass('default').find('.item').addClass('default');
        $('.floor .right').addClass('select').find('.item').addClass('default');
        $('.floors-nav .item').removeClass('active').eq(1).addClass("active");
        $('#list11_active').removeClass('default').parent().parent().removeClass('default');
        $('#wrapper11_active').find('.item').removeClass('default').addClass('show').find('.popup').addClass('show');
        $('header .nav .item').removeClass("active").eq(1).addClass("active");
        $(".content-tab").hide().eq(1).show();
    });

    // floors mapswitcher
    $('.block .nav .item').live("click", function () {
        resetFloors();
        $('.drop-down .ul li').removeClass('selected');
        $('.wrapper .item').addClass('default');
        $(this).removeClass('default').addClass('selected').parent().parent().removeClass('default');
        $(this).siblings('.drop-down').show().find('ul li:first').addClass('selected');

        var blockId = $(this).attr('data-popup');
        var mapBlock = $("#" + blockId + "_active");
        mapBlock.find('.item').removeClass('default').addClass('show').find('.popup').addClass('show');
    });

    $('.drop-down .subsidiary-item').live("click", function () {
        $('.drop-down .subsidiary-item').removeClass('selected');
        $(this).addClass('selected').parent().parent().addClass('selected');
        $('.right .wrapper .item').removeClass('show').find('.popup').removeClass('show');
        $('.wrapper .item .floor-icon').addClass('default');

        var blockId = $(this).attr('data-popup');
        var mapBlock = $("#" + blockId + "_active");
        mapBlock.find('.item').removeClass('default').addClass('show').find('.popup').addClass('show');
    });

    $('.wrapper .item .floor-icon').live("click", function () {
        resetFloors();
        $('.wrapper .item').addClass('default').find('.popup').removeClass('show');
        $(this).parent().removeClass('default').addClass('show').find('.popup').addClass('show');

        var blockId = $(this).attr('data-list');
        var listBlock = $("#" + blockId + "_active");
        listBlock.removeClass('default').addClass('selected').parent().parent().removeClass('default').addClass('selected');
        listBlock.parent().parent().show().siblings('li').removeClass('default');
    });

    $('.wrapper .close-icon').live("click", function () {
        $(this).parent().removeClass('show');
    });


    // MAP
    L.Map = L.Map.extend({
        openPopup: function (popup) {
            if (!this.doublePopup) {
                this.closePopup();
            } else {
                this._popup2 = this._popup;
            }
            this._popup = popup;
            return this.addLayer(popup).fire('popupopen', {
                popup: this._popup
            });
        },
        closePopup: function (popup) {
            if (!popup || popup === this._popup) {
                popup = this._popup;
                this._popup = null;
            }
            if (popup) {
                this.removeLayer(popup);
                popup._isOpen = false;
            }
            this._popup2 && this.removeLayer(this._popup2);
            return this;
        }
    });

    var map = L.map('map').setView([59.932040, 30.356126], 16);

    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // map nav
    $('.map-nav li').live("click", function () {
        $('.cultural-event .item').removeClass('default').find('span').removeClass('active');
        $('.map-nav li').removeClass('selected').addClass('default');
        $(this).removeClass('default').addClass('selected');
    });

    $('.cultural-event .item').live("click", function () {
        $('.map-nav li').removeClass('default');
        $('.cultural-event .item').addClass('default');
        $(this).removeClass('default');
    });

    // icons
    var metroIcon = L.divIcon({
            className: 'transport-icon-map on-foot',
            iconSize: [39, 39]
        }),
        MoscowStationIcon = L.divIcon({
            className: 'transport-icon-map train',
            iconSize: [39, 39]
        }),
        FinlandStationIcon = L.divIcon({
            className: 'transport-icon-map train',
            iconSize: [39, 39]
        }),
        PulkovoAirportIcon = L.divIcon({
            className: 'transport-icon-map plane',
            iconSize: [39, 39]
        }),
        SeaPortIcon = L.divIcon({
            className: 'transport-icon-map ship',
            iconSize: [39, 39]
        }),
        MapBig = L.divIcon({
            className: 'map-big',
            iconSize: [43, 63]
        }),
        MariinskyTheatreIcon = L.divIcon({
            className: 'cultural-icon theater',
            iconSize: [39, 39]
        }),
        MuseumReserveIcon = L.divIcon({
            className: 'cultural-icon museum',
            iconSize: [39, 39]
        }),
        DostoevskyHotelIcon = L.divIcon({
            className: 'cultural-icon green-circle',
            iconSize: [14, 14]
        });

    var mainMarker = L.marker([59.932050, 30.350842], {
        icon: MapBig
    }).addTo(map);

    // markers
    var metroMarker = L.marker([59.931776, 30.354581], {
            icon: metroIcon
        }).bindPopup(languageRus ? "ст. метро<br>«Маяковская»" : "Mayakovskaya<br>Metro Station").addTo(map),
        MoscowStationMarker = L.marker([59.930103, 30.361997], {
            icon: MoscowStationIcon
        }).bindPopup(languageRus ? "Московский<br>ж/д вокзал": "Moskovsky<br>Rail Terminal").addTo(map),
        FinlandStationMarker = L.marker([59.955539, 30.356345], {
            icon: FinlandStationIcon
        }).bindPopup(languageRus ? "Финляндский<br>ж/д вокзал": "Finlyandsky<br>Rail Terminal").addTo(map),
        PulkovoAirportMarker = L.marker([59.797388, 30.273487], {
            icon: PulkovoAirportIcon
        }).bindPopup(languageRus ? "Аэропорт<br>«Пулково»" : "Pulkovo Airport").addTo(map),
        SeaPortMarker = L.marker([59.948942, 30.194941], {
            icon: SeaPortIcon
        }).bindPopup(languageRus ? "Пассажирский<br>морской терминал" : "Marine Terminal").addTo(map),
        MariinskyTheatreMarker = L.marker([59.925646, 30.295996], {
            icon: MariinskyTheatreIcon
        }).bindPopup(languageRus ? "Отправление шаттлов от Мариинского театра<br>к гостиницам «Коринтия Санкт-Петербург»<br>и «Достоевский»: <span class='light-bolder'>22:00 — 22:40</span><br>Интервал отправления: <span class='light-bolder'>10 минут</span>" : "Shuttle departure<br>from Mariinsky Theatre<br>to Corinthia Hotel St. Petersburg<br>and Hotel Dostoevsky: <span class='light-bolder'>22:00 — 22:40</span><br>Every <span class='light-bolder'>10 minutes</span>").addTo(map),
        MuseumReserveMarker = L.marker([59.886298, 29.908587], {
            icon: MuseumReserveIcon
        }).bindPopup(languageRus ? "Отправление шаттлов<br>от Летнего дворца: <span class='light-bolder'>23:30 — 00:00</span><br>Интервал отправления: <span class='light-bolder'>20 минут</span>" : "Shuttle departure from the Summer<br>Palace: <span class='light-bolder'>23:30 — 00:00</span><br>Every <span class='light-bolder'>20 minutes</span>").addTo(map),
        DostoevskyHotelMarker = L.marker([59.928468, 30.346480], {
            icon: DostoevskyHotelIcon
        }).bindPopup(languageRus ? "Отправление шаттлов<br>до Мариинского театра: <span class='light-bolder'>18:15</span>" : "Shuttle departure<br>to Mariinsky Theatre: <span class='light-bolder'>18:15</span>").addTo(map);


    // Icons resize
    map.on('zoomend', changeIconSize);

    function changeIconSize(e) {

        // this is the default size (of the default icon); it should be known beforehand;
        var defaultIconSize = new L.Point(39, 39),
            defaultBigIconSize = new L.Point(43, 63);

        // use leaflet's internal methods to scale the size (a bit overkill for this case...)
        var transformation = new L.Transformation(1, 0, 1, 0);

        var currentZoom = map.getZoom();
        var newIconSize = transformation.transform(defaultIconSize, sizeFactor(currentZoom));
        var newBigIconSize = transformation.transform(defaultBigIconSize, sizeFactor(currentZoom));

        // finally, declare a new icon and update the marker
        var newMetroIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'transport-icon-map on-foot'
        });

        var newMoscowStationIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'transport-icon-map train'
        });

        var newFinlandStationIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'transport-icon-map train'
        });

        var newPulkovoAirportIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'transport-icon-map plane'
        });

        var newSeaPortIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'transport-icon-map ship'
        });

        var newMariinskyTheatreIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'cultural-icon theater'
        });

        var newMuseumReserveIcon = new L.divIcon({
            iconSize: newIconSize,
            className: 'cultural-icon museum'
        });

        var newMapBig = new L.divIcon({
            iconSize: newBigIconSize,
            className: 'map-big'
        });

        metroMarker.setIcon(newMetroIcon);
        MoscowStationMarker.setIcon(newMoscowStationIcon);
        FinlandStationMarker.setIcon(newFinlandStationIcon);
        PulkovoAirportMarker.setIcon(newPulkovoAirportIcon);
        SeaPortMarker.setIcon(newSeaPortIcon);
        MariinskyTheatreMarker.setIcon(newMariinskyTheatreIcon);
        MuseumReserveMarker.setIcon(newMuseumReserveIcon);
        mainMarker.setIcon(newMapBig);
    }

    function sizeFactor(zoom) {
        if (zoom >= 16) return 1.0;
        else if (zoom == 15) return 0.95;
        else if (zoom == 14) return 0.85;
        else if (zoom == 13) return 0.75;
        else if (zoom == 12) return 0.65;
        else if (zoom == 11) return 0.55;
        else // zoom >= 17
            return 0.50;
    }

    // Rouds
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

        pointCA = new L.LatLng(59.932256, 30.350835),
        pointCB = new L.LatLng(59.936354, 30.317606),
        pointCC = new L.LatLng(59.935214, 30.316424),
        pointCD = new L.LatLng(59.932774, 30.309660),
        pointCE = new L.LatLng(59.930344, 30.298903),
        pointCF = new L.LatLng(59.928380, 30.294788),
        pointCG = new L.LatLng(59.925896, 30.297025),

        pointEA = new L.LatLng(59.928359, 30.347197),
        pointEB = new L.LatLng(59.929356, 30.347699),
        pointEC = new L.LatLng(59.932612, 30.347897),

        pointFA = new L.LatLng(59.932255, 30.350835),
        pointFB = new L.LatLng(59.930962, 30.360836),
        pointFC = new L.LatLng(59.914991, 30.350235),
        pointFD = new L.LatLng(59.915740, 30.345177),
        pointFE = new L.LatLng(59.915707, 30.341385),
        pointFF = new L.LatLng(59.915375, 30.339878),
        pointFG = new L.LatLng(59.908761, 30.321486),
        pointFH = new L.LatLng(59.908443, 30.319803),
        pointFI = new L.LatLng(59.908640, 30.300596),
        pointFJ = new L.LatLng(59.898639, 30.299569),
        pointFK = new L.LatLng(59.897050, 30.299966),
        pointFL = new L.LatLng(59.896930, 30.299923),
        pointFM = new L.LatLng(59.895175, 30.300512),
        pointFN = new L.LatLng(59.895061, 30.300613),
        pointFO = new L.LatLng(59.890223, 30.302223),
        pointFP = new L.LatLng(59.890135, 30.302180),
        pointFQ = new L.LatLng(59.889142, 30.302372),
        pointFR = new L.LatLng(59.887277, 30.302242),
        pointFS = new L.LatLng(59.883939, 30.300759),
        pointFT = new L.LatLng(59.875577, 30.298411),
        pointFU = new L.LatLng(59.875463, 30.294876),
        pointFV = new L.LatLng(59.874993, 30.293860),
        pointFW = new L.LatLng(59.873340, 30.293266),
        pointFX = new L.LatLng(59.872962, 30.293506),
        pointFY = new L.LatLng(59.872540, 30.294261),
        pointFZ = new L.LatLng(59.867817, 30.293350),
        pointFZA = new L.LatLng(59.866717, 30.293235),
        pointFZB = new L.LatLng(59.859798, 30.291454),
        pointFZC = new L.LatLng(59.853311, 30.290510),
        pointFZD = new L.LatLng(59.848741, 30.288321),
        pointFZE = new L.LatLng(59.842447, 30.283085),
        pointFZF = new L.LatLng(59.839191, 30.281197),
        pointFZG = new L.LatLng(59.835719, 30.279695),
        pointFZH = new L.LatLng(59.834835, 30.277163),
        pointFZI = new L.LatLng(59.834921, 30.274717),
        pointFZJ = new L.LatLng(59.833821, 30.265318),
        pointFZK = new L.LatLng(59.824275, 30.225770),
        pointFZL = new L.LatLng(59.818083, 30.212080),
        pointFZM = new L.LatLng(59.813876, 30.203025),
        pointFZN = new L.LatLng(59.811955, 30.195300),
        pointFZO = new L.LatLng(59.809495, 30.182468),
        pointFZP = new L.LatLng(59.805934, 30.176417),
        pointFZQ = new L.LatLng(59.801336, 30.169379),
        pointFZR = new L.LatLng(59.799760, 30.160538),
        pointFZS = new L.LatLng(59.800559, 30.152342),
        pointFZT = new L.LatLng(59.843391, 30.031079),
        pointFZU = new L.LatLng(59.843531, 30.031014),
        pointFZV = new L.LatLng(59.844646, 30.031765),
        pointFZW = new L.LatLng(59.848411, 30.035639),
        pointFZX = new L.LatLng(59.852718, 30.037289),
        pointFZY = new L.LatLng(59.860403, 29.994170),
        pointFZZ = new L.LatLng(59.871399, 29.968411),
        pointFZZA = new L.LatLng(59.880402, 29.906396),

        PointsListA = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH],
        PointsListB = [pointAA, pointAB, pointAC, pointAD, pointAE, pointG, pointH],
        PointsListC = [pointBA, pointBB, pointBC, pointBD, pointBE, pointBF, pointBG, pointBH, pointBI, pointBJ, pointBK, pointBL, pointBM, pointBN, pointBO, pointBP, pointBQ, pointBR, pointBS, pointBT, pointH],
        PointsListD = [pointCA, pointCB, pointCC, pointCD, pointCE, pointCF, pointCG],
        PointsListE = [pointEA, pointEB, pointEC, pointCB, pointCC, pointCD, pointCE, pointCF, pointCG],
        PointsListF = [pointFA, pointFB, pointFC, pointFD, pointFE, pointFF, pointFG, pointFH, pointFI, pointFJ, pointFK, pointFL, pointFM, pointFN, pointFO, pointFP, pointFQ, pointFR, pointFS, pointFT, pointFU, pointFV, pointFW, pointFX, pointFY, pointFZ, pointFZA, pointFZB, pointFZC, pointFZD, pointFZE, pointFZF, pointFZG, pointFZH, pointFZI, pointFZJ, pointFZK, pointFZL, pointFZM, pointFZN, pointFZO, pointFZP, pointFZQ, pointFZR, pointFZS, pointFZT, pointFZU, pointFZV, pointFZW, pointFZX, pointFZY, pointFZZ, pointFZZA];

    var FinlandStationRoud = new L.Polyline(PointsListA),
        AirportRoud = new L.Polyline(PointsListB),
        PortRoud = new L.Polyline(PointsListC),
        CorinthiaToMariinskyRoud = new L.Polyline(PointsListD),
        DostoevskyToMariinskyRoud = new L.Polyline(PointsListE),
        CorinthiaToMuseumReserveRoud = new L.Polyline(PointsListF);

    var deleteLines = function () {
        map.removeLayer(FinlandStationRoud);
        map.removeLayer(AirportRoud);
        map.removeLayer(PortRoud);
        map.removeLayer(CorinthiaToMariinskyRoud);
        map.removeLayer(DostoevskyToMariinskyRoud);
        map.removeLayer(CorinthiaToMuseumReserveRoud);
    }


    // events
    $('#mayakovskaya').live("click", function () {
        map.closePopup();
        $(".leaflet-popup-close-button").click();
        metroMarker.openPopup().addTo(map);
        map.setView([59.932040, 30.356126], 16);
        deleteLines();
    });

    $('#moscow-station').live("click", function () {
        map.closePopup();
        MoscowStationMarker.openPopup().addTo(map);
        map.setView([59.930103, 30.361997], 16);
        deleteLines();
    });

    $('#finland-station').live("click", function () {
        map.closePopup();
        FinlandStationMarker.openPopup().addTo(map);
        map.setView([59.955539, 30.356345], 16);
        deleteLines();
        FinlandStationRoud.addTo(map);
    });

    $('#pulkovo-airport').live("click", function () {
        map.closePopup();
        PulkovoAirportMarker.openPopup().addTo(map);
        map.setView([59.797388, 30.273487], 16);
        deleteLines();
        AirportRoud.addTo(map);
    });

    $('#sea-port').live("click", function () {
        map.closePopup();
        SeaPortMarker.openPopup().addTo(map);
        map.setView([59.948942, 30.194941], 16);
        deleteLines();
        PortRoud.addTo(map);
    });

    var CorinthiaTheater = function () {
            map.closePopup();
            deleteLines();
            map.setView([59.932980, 30.322057], 13);
            $('#corinthia-museum').removeClass('active');
            $('#dostoevsky').removeClass('active');
            map.doublePopup = true;
            mainMarker.bindPopup(languageRus ? "Отправление шаттлов<br>до Мариинского театра: <span class='light-bolder'>18:00 — 18:30</span><br>Интервал отправления: <span class='light-bolder'>10 минут</span>" : "Shuttle departure<br>to Mariinsky Theatre:<br><span class='light-bolder'>18:00 — 18:30</span><br>Every <span class='light-bolder'>10 минут</span>").openPopup().addTo(map);
            MariinskyTheatreMarker.bindPopup(languageRus ? "Отправление шаттлов от Мариинского театра<br>к гостиницам «Коринтия Санкт-Петербург» <br>и «Достоевский»: <span class='light-bolder'>22:00 — 22:40</span><br>Интервал отправления: <span class='light-bolder'>10 минут</span>" : "Shuttle departure<br>from Mariinsky Theatre<br>to Corinthia Hotel St. Petersburg<br>and Hotel Dostoevsky: <span class='light-bolder'>22:00 — 22:40</span><br>Every <span class='light-bolder'>10 minutes</span>").openPopup().addTo(map);
            CorinthiaToMariinskyRoud.addTo(map);
        },
        CorinthiaMuseum = function () {
            map.closePopup();
            deleteLines();
            map.setView([59.931092, 30.127679], 10);
            $('#corinthia-theater').removeClass('active');
            $('#dostoevsky').removeClass('active');
            map.doublePopup = true;
            mainMarker.bindPopup(languageRus ? "Отправление шаттлов<br>до Летнего дворца: <span class='light-bolder'>18:00 — 18:30</span><br>Интервал отправления: <span class='light-bolder'>10 минут</span>" : "Shuttle departure to the Summer<br>Palace: <span class='light-bolder'>18:00 — 18:30</span><br>Every <span class='light-bolder'>10 minutes</span>").openPopup().addTo(map);
            MuseumReserveMarker.openPopup().addTo(map);
            CorinthiaToMuseumReserveRoud.addTo(map);
        }


    $('#to-theater').live("click", function () {
        $('#corinthia-theater').addClass('active');
        CorinthiaTheater();
    });

    $('#corinthia-theater').live("click", function () {
        $(this).addClass('active');
        CorinthiaTheater();
    });

    $('#dostoevsky').live("click", function () {
        map.closePopup();
        deleteLines();
        $('#corinthia-museum').removeClass('active');
        $('#corinthia-theater').removeClass('active');
        $(this).addClass('active');
        map.setView([59.932980, 30.322057], 13);
        map.doublePopup = true;
        DostoevskyHotelMarker.openPopup().addTo(map);
        MariinskyTheatreMarker.bindPopup(languageRus ? "Отправление шаттлов от Мариинского театра<br>к гостиницам «Коринтия Санкт-Петербург»<br>и «Достоевский»: <span class='light-bolder'>22:00 — 22:40</span><br>Интервал отправления: <span class='light-bolder'>10 минут</span>" : "Shuttle departure<br>from Mariinsky Theatre<br>to Corinthia Hotel St. Petersburg<br>and Hotel Dostoevsky: <span class='light-bolder'>22:00 — 22:40</span><br>Every <span class='light-bolder'>10 minutes</span>").openPopup().addTo(map);
        DostoevskyToMariinskyRoud.addTo(map);
    });

    $('#to-museum').live("click", function () {
        $('#corinthia-museum').addClass('active');
        CorinthiaMuseum();
    });

    $('#corinthia-museum').live("click", function () {
        $(this).addClass('active');
        CorinthiaMuseum();
    });
});
