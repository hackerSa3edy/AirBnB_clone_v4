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
});
