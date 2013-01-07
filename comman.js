

/**
 * jQuery form serialize
 */

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

/**
 * Get base url of the api
 *
 * @return {String}
 * @api public
 */

function getBaseUrl () {
  var apiUrl = 'http://192.168.2.128:3000';
  return apiUrl;
}


/**
 * Generic POST method
 *
 * @param {String} api - endpoint url
 * @param {Object} data - data to be posted
 * @param {Function} cb - callback
 * @api public
 */

function POST (api, data, cb) {
  $.ajax({
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    url: getBaseUrl() + api,
    data: JSON.stringify(data),
    success: function (response) {
      cb(null, data);
    },
    error: function (response) {
      cb(response.responseText);
    }
  });
};


/**
 * Generic GET method
 *
 * @param {String} api - endpoint url
 * @param {String} cb - callback
 * @api public
 */

function GET (api, cb) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    url: getBaseUrl() + api,
    success: function (data) {
      cb(null, data);
    },
    error: function (data) {
      cb(data.responseText);
    }
  });
}























