// external js: isotope.pkgd.js
$( document ).ready(function() {

  $.ajax({
    url: "madre.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
        //data downloaded so we call parseJSON function 
        //and pass downloaded data
        var json = $.parseJSON(data);
        //now json variable contains data in json format
        //let's display a few items
        var contador = 0;
        maximum = 2;
        minimum = 1;
        var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        console.log(randomNumber);
        jQuery.each(json, function(key, ganado) {
          contador++;
          if (randomNumber == contador) {
            ganado.tipo = 'vaca';
            ganado.tipo_color = 'red';
            newItem = ('<div class="element-item col-md-4 ' + ganado.tipo +'" style="right: 170px;">'+
                      '<figure class="snip1174 ' + ganado.tipo_color + ' col-md-4">' +
                      '<img src="images/' + ganado.tipo + '.jpg" alt="' + ganado.tipo + '" />' +
                      '  <figcaption>' +
                          '<h2 class="nombre">' + ganado.nombre + '</h2>'+
                          '<br>' +
                          '<span class="genotipo">Genotipo: ' + ganado.genotipo + '</span><br>' +
                          '<span class="calCarne">Cal. Carne:' + ganado.calCarne + '</span><br>' +
                          '<span class="calLeche">Cal. Leche: ' + ganado.calLeche + '</span><br>' +
                          '<a href="/" target="_blank">Simular</a>' +
                        '</figcaption>'+
                      '</figure>'+
                  '</div>');
            $('.grid').append(newItem);
          }        
        });
     }
  });
  
  $.ajax({
    url: "padre.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
        //data downloaded so we call parseJSON function 
        //and pass downloaded data
        var json = $.parseJSON(data);
        //now json variable contains data in json format
        //let's display a few items
        var contador = 0;
        maximum = 2;
        minimum = 1;
        var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        console.log(randomNumber);        
        jQuery.each(json, function(key, ganado) {
          contador++;
          if (randomNumber == contador) {
            ganado.tipo = 'toro';
            ganado.tipo_color = 'navy';
            newItem = ('<div class="element-item col-md-4 ' + ganado.tipo +'" style="right: 150px">'+
                      '<figure class="snip1174 ' + ganado.tipo_color + ' col-md-4">' +
                      '<img src="images/' + ganado.tipo + '.jpg" alt="' + ganado.tipo + '" />' +
                      '  <figcaption>' +
                          '<h2 class="nombre">' + ganado.nombre + '</h2>'+
                          '<br>' +
                          '<span class="genotipo">Genotipo: ' + ganado.genotipo + '</span><br>' +
                          '<span class="calCarne">Cal. Carne:' + ganado.calCarne + '</span><br>' +
                          '<span class="calLeche">Cal. Leche: ' + ganado.calLeche + '</span><br>' +
                          '<a href="/" target="_blank">Simular</a>' +
                        '</figcaption>'+
                      '</figure>'+
                  '</div>');
            $('.grid').append(newItem);
          }        
        });
     }
  });

  // filter functions

  // change is-checked class on buttons
  $('.deep-genetic-filters').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'a', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
});
