$( document ).ready(function() {
  console.log($('#select_x').val());
  console.log($('#select_y').val());
  var _defaults = {
    x : 12, // tiles in x axis
    y : 12, // tiles in y axis
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
  $('div.crear_laberinto').splitInTiles();
  
  // MATRIX X, Y.
  $('#matrix select').change(function() {
    xv = $('#select_x').val();
    yv = $('#select_y').val();
    console.log(xv);
    console.log(yv);
    
    var _defaults = {
      x : xv, // tiles in x axis
      y : yv, // tiles in y axis
      gap: 2
    };
    $('div.tile').remove();
    $('div.crear_laberinto').splitInTiles(_defaults);
  });
  
  // RADIO BUTTONS.
  $("input[name=radio_avanzar]:radio").change(function () {
    if ($("#radio-donde-avanzar").is(":checked")) {
      $('div.tile').addClass('tile-donde-avanzar');
      if ($('div.tile').hasClass('tile-correcto-avanzar')) {
        $('div.tile').removeClass('tile-correcto-avanzar');
      }
      console.log('Por donde avanzar');
    }
    if ($("#radio-correcto-avanzar").is(":checked")) {
      $('div.tile').addClass('tile-correcto-avanzar');
      if ($('div.tile').hasClass('tile-donde-avanzar')) {
        $('div.tile').removeClass('tile-donde-avanzar');
      }
      console.log('Correcto avanzar');
    }
  });
  
  // When clicking a DIV tile.
  $('div.tile').click(function(event) {
    if ($("#radio-donde-avanzar").is(":checked")) {
      // If tile-go exists and it is EMPTY.
      if ($(this).hasClass('tile-go')) {
        if ($(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/) == null) {
          $(this).addClass('tile-direction-1');
        }
        else if ($(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/) != null) {
          direction_string = $(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/)[0];
          direction_number = 1 + parseInt(direction_string.match(/[0-9]+/)[0], 10);
          // Compare for the last direction number if so then remove class to begin again.
          if (direction_number == 15) {
            $(this).removeClass('tile-direction-14');
          }
          else {
            $(this).removeClass(direction_string);
            $(this).addClass('tile-direction-' + direction_number);
          }
        }
      }
      else {
        $(this).addClass('tile-go');
      }
      if ($(this).hasClass('tile-win')) {
        $(this).removeClass('tile-win');
      }
    }
    
    if ($("#radio-correcto-avanzar").is(":checked")) {
      // If tile-go exists and it is EMPTY.
      if ($(this).hasClass('tile-win')) {
        if ($(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/) == null) {
          $(this).addClass('tile-direction-1');
        }
        else if ($(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/) != null) {
          direction_string = $(this).attr("class").match(/(tile-direction-.*?)(?:\s+|$)/)[0];
          direction_number = 1 + parseInt(direction_string.match(/[0-9]+/)[0], 10);
          // Compare for the last direction number if so then remove class to begin again.
          if (direction_number == 15) {
            $(this).removeClass('tile-direction-14');
          }
          else {
            $(this).removeClass(direction_string);
            $(this).addClass('tile-direction-' + direction_number);
          }
        }
      }
      else {
        $(this).addClass('tile-win');
      }
      if ($(this).hasClass('tile-go')) {
        $(this).removeClass('tile-go');
      }
    }
  });

});