$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://172.27.3.156:5001/api/v1/status/',
    dataType: 'json',
    success: function (response, status) {
      if (status === 'success' && response.status === 'OK') {
        $('div#api_status').attr('class', 'available');
      } else {
        $('div#api_status').removeAttr('class');
      }
    }
  });
});
