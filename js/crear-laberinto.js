;(function( $, window ) {

  var _defaults = {
    x : 3, // tiles in x axis
    y : 3, // tiles in y axis
    gap: 2
  };

  $.fn.splitInTiles = function( options ) {

    var o = $.extend( {}, _defaults, options );

    return this.each(function() {

      var $container = $(this),
          width = $container.width(),
          height = $container.height(),
          $img = $container.find('img'),
          n_tiles = o.x * o.y,
          wraps = [], $wraps;

      for ( var i = 0; i < n_tiles; i++ ) {
        wraps.push('<div class="tile"/>');
      }

      $wraps = $( wraps.join('') );

      // Hide original image and insert tiles in DOM
      $img.hide().after( $wraps );

      // Set background
      $wraps.css({
        width: (width / o.x) - o.gap,
        height: (height / o.y) - o.gap,
        marginBottom: o.gap +'px',
        marginRight: o.gap +'px',
        backgroundImage: 'url('+ $img.attr('src') +')'
      });
      
      // Adjust position
      $wraps.each(function() {
        var pos = $(this).position();
        $(this).css( 'backgroundPosition', -pos.left +'px '+ -pos.top +'px' );
      });

    });

  };

}( jQuery, window ));

$( document ).ready(function() {
  $('div.crear_laberinto').splitInTiles();

});

