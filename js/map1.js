
var maps = [], 
    imageActive = 'img/marker1-active.png',
    clusterStyles = [
        {
            url: 'img/cluster.png',
            height: 45,
            width: 45,
            textColor: '#fff',
            textSize: 12,
        }
    ],
    ibOptions = {
        alignBottom: true,
        content: 'text',
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(-175, -60),
        zIndex: null,
        boxStyle: { 
            width: "350px"
        },
        closeBoxMargin: "0px 0px 0px 0px",
        closeBoxURL: 'img/icon-infobox.png',
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        enableEventPropagation: false
    },
    ib = new InfoBox(ibOptions),
    openedMarker = null,
    openedMarkerIcon = null;

function Map(id, mapOptions){
    this.map = new google.maps.Map(document.getElementById(id), mapOptions );
    this.markers = [];
    this.infowindows = [];
    this.clusters = null;
}

function addMarker(mapId,location,index,contentstr,image){
    maps[mapId].markers[index] = new google.maps.Marker({
        position: location,
        map: maps[mapId].map,
        icon: {
            url: image
        }
    });

    var content = '<div class="info-box">'+contentstr+'</div>';

    google.maps.event.addListener(maps[mapId].markers[index], 'click', function() {
        ib.setContent(content);
        ib.setPosition(location);
        ib.open(maps[mapId].map);
        if(openedMarker) {
            openedMarker.setIcon({
                url: openedMarkerIcon
            });
        }
        openedMarker = maps[mapId].markers[index];
        openedMarkerIcon = openedMarker.icon.url;
        this.setIcon({
            url: imageActive
        });
    });
}

google.maps.event.addListener(ib,'closeclick',function(){
    openedMarker.setIcon({
        url: openedMarkerIcon
    });
    openedMarker = openedMarkerIcon = null;
});

function initialize(mapInst) {

    var lat = mapInst.attr("data-lat"),
        lng = mapInst.attr("data-lng"),
        myLatlng = new google.maps.LatLng(lat,lng),
        setZoom = parseInt(mapInst.attr("data-zoom")),
        mapId = mapInst.attr('id');

     var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
     var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

    var mapOptions = {
        zoom: setZoom,
        scrollwheel: false,
        zoomControl: true,
        streetViewControl: true,
        center: myLatlng,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    maps[mapId] = new Map(mapId, mapOptions);
    maps[mapId].map.mapTypes.set('map_style', styledMap);
    maps[mapId].map.setMapTypeId('map_style');

    var marker_iterator = 0;

    $('.marker[data-rel="'+mapId+'"]').each(function(){
        var mark_lat = $(this).attr('data-lat'),
            mark_lng = $(this).attr('data-lng'),
            mark_locat = new google.maps.LatLng(mark_lat, mark_lng),
            mark_str = $(this).attr('data-string'),
            image = $(this).attr('data-image');
        addMarker(mapId,mark_locat,marker_iterator,mark_str,image);
        marker_iterator++;
    });

    maps[mapId].clusters = new MarkerClusterer(maps[mapId].map, maps[mapId].markers, {styles: clusterStyles});

    
}

$(window).on('load', function (e) {

    $('.map-wrapper').each(function(){
        initialize($(this));
    });


});

