// external js: isotope.pkgd.js
$( document ).ready(function() {
  // init Isotope
  $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
  });

  // filter functions

  // bind filter button click
  $('.game-cards-filters').on( 'click', 'a', function(event) {
    event.preventDefault();
    var filterValue = $( this ).attr('data-filter');
    console.log(filterValue);
    // use filterFn if matches value
    $('.grid').isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.game-cards-filters').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'a', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
  $('a.sorprendeme').click(function(event) {
    event.preventDefault();
    var contador = 0;
    var iso_shuffle = function() {
      $('.grid').isotope('shuffle');
      contador++;
      if (contador > 5) {
        window.location.href = "/resultado.html";
      }
      console.log(contador);
    };
    setInterval(iso_shuffle, 500);
    
  });
});
