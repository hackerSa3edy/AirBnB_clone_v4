$(document).ready(function () {
  const filtersCollector = {
    amenity: [],
    city: [],
    state: []
  };

  $('.filters input[type="checkbox"]').change(function () {
    const filterId = $(this).attr('data-id');
    const filterName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      const filterSpan = $('<span>', { 'filter-id': filterId }).text(filterName)[0];
      filtersCollector[`${$(this).attr('filter-type')}`].push(filterSpan);
    } else {
      filtersCollector[`${$(this).attr('filter-type')}`] = filtersCollector[`${$(this).attr('filter-type')}`].filter(asset => $(asset).attr('filter-id') !== filterId);
    }
    const joinedAmenities = filtersCollector.amenity.map(span => span.outerHTML).join(', ');
    const joinedCities = filtersCollector.city.map(span => span.outerHTML).join(', ');
    const joinedStates = filtersCollector.state.map(span => span.outerHTML).join(', ');

    if ($(this).attr('filter-type') === 'amenity') {
      $('section.filters div.amenities h4').html(`&nbsp;${joinedAmenities}`);
    } else {
      $('section.filters div.locations h4').html(`&nbsp;${joinedStates}`).append(`&nbsp;${joinedCities}`);
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (response, status) => {
    if (status === 'success' && response.status === 'OK') {
      $('div#api_status').attr('class', 'available');
    } else {
      $('div#api_status').removeAttr('class');
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
      <div class=reviews>
      </div>
  </article>
  `);

  function createArticle (index, element) {
    // console.log(element);
    $(article).find('div.title_box h2').text(element.name);
    $(article).find('div.title_box div.price_by_night').text(`$${element.price_by_night}`);
    $(article).find('div.information div.max_guest').text(`${element.max_guest} ${element.max_guest > 1 ? 'Guests' : 'Guest'}`);
    $(article).find('div.information div.number_rooms').text(`${element.number_rooms} ${element.number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}`);
    $(article).find('div.information div.number_bathrooms').text(`${element.number_bathrooms} ${element.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}`);
    $(article).find('div.description').html(element.description);
    $(article).find('div.reviews').html(`<h2 class="toggle-reviews">Reviews</h2><span place-id="${element.id}" class="toggle-reviews">show</span>`);
    $('div.container section.places').append(article);

    $(article).find('span.toggle-reviews').click(function () {
      const placeId = $(this).attr('place-id'); // get the placeId from the span's attribute

      if ($(this).text() === 'show') {
        const reviewsList = $('<ul></ul>');
        $.ajax({
          url: `http://0.0.0.0:5001/api/v1/places/${placeId}/reviews/`,
          type: 'GET',
          success: function (reviews) {
            // Parse and display the reviews
            reviews.forEach(review => {
              const reviewLi = $('<li></li>').appendTo(reviewsList);
              $.get(`http://0.0.0.0:5001/api/v1/users/${review.user_id}`, (user) => {
                $('<h3></h3>').text(`From ${user.first_name} ${user.last_name} the ${formatDate(review.created_at)}`).appendTo(reviewLi);
                $('<p></p>').text(review.text).appendTo(reviewLi);
              });
            });

            $(article).find('div.reviews').append(reviewsList);
          },
          error: function (error) {
            console.log(error);
          }
        });
        $(this).text('hide');
      } else {
        $(article).find('div.reviews ul').remove();
        $(this).text('show');
      }
    });
  }

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (response, status) {
      if (status === 'success') {
        $(response).each(createArticle);
      }
    }
  });

  $('button[type="button"]').on('click', function () {
    const amenitiesId = filtersCollector.amenity.map(span => `"${$(span).attr('filter-id')}"`).join(', ');
    const citiesId = filtersCollector.city.map(span => `"${$(span).attr('filter-id')}"`).join(', ');
    const statesId = filtersCollector.state.map(span => `"${$(span).attr('filter-id')}"`).join(', ');

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: `{"amenities": [${amenitiesId}], "cities": [${citiesId}], "states": [${statesId}]}`,
      success: function (response, status) {
        if (status === 'success') {
          $('div.container section.places').empty();
          $(response).each(createArticle);
        }
      }
    });
  });

  function formatDate (dateStr) {
    const date = new Date(dateStr);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }
});
