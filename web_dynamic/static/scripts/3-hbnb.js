$(document).ready(function () {
  let checkedElement = [];
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      const amenitySpan = $('<span>', { 'amenity-id': amenityId });
      $(amenitySpan).text(amenityName);
      checkedElement.push(amenitySpan[0]);
    } else {
      checkedElement = checkedElement.filter(amenity => $(amenity).attr('amenity-id') !== amenityId);
    }
    const joinedSpans = checkedElement.map(span => span.outerHTML).join(', ');
    $('section.filters div.amenities h4').html(`&nbsp;${joinedSpans}`);
    // console.log($(this).is(':checked') ? 'appended' : 'removed');
    // console.log(joinedSpans);
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (response, status) {
      if (status === 'success' && response.status === 'OK') {
        $('div#api_status').attr('class', 'available');
      } else {
        $('div#api_status').removeAttr('class');
      }
    }
  });

  const article = $(`
  <article>
      <div class="title_box">
        <h2></h2>
        <div class="price_by_night"></div>
      </div>
      <div class="information">
          <div class="max_guest">
          </div>
          <div class="number_rooms">
          </div>
          <div class="number_bathrooms">
          </div>
      </div>
      <div class="description"></div>
  </article>
  `);

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (response, status) {
      if (status === 'success') {
        $(response).each(function (index, element) {
          // console.log(element);
          $(article).find('div.title_box h2').text(element.name);
          $(article).find('div.title_box div.price_by_night').text(`$${element.price_by_night}`);
          $(article).find('div.information div.max_guest').text(`${element.max_guest} ${element.max_guest > 1 ? 'Guests' : 'Guest'}`);
          $(article).find('div.information div.number_rooms').text(`${element.number_rooms} ${element.number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}`);
          $(article).find('div.information div.number_bathrooms').text(`${element.number_bathrooms} ${element.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}`);
          $(article).find('div.description').html(element.description);
          $('div.container section.places').append(article);
        });
      }
    }
  });
});
