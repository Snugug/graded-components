(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var listings = document.querySelectorAll('.listing'),
        latency = window.performance.timing.responseStart - window.performance.timing.requestStart,
        preview,
        img,
        wrapper,
        map,
        listing,
        address,
        i;

    console.log(latency);

    //////////////////////////////
    // Only enhance if on a low latency connection
    //////////////////////////////
    if (latency < 200) {
      // Load images on DOMContentLoaded
      for (i = 0; i < listings.length; i++) {
        listing = listings[i];
        listing.setAttribute('data-image', true);

        preview = listing.querySelector('.listing--preview');

        if (preview) {
          img = document.createElement('img');
          img.setAttribute('src', preview.getAttribute('data-src'));
          img.setAttribute('alt', preview.getAttribute('data-alt'));
          img.setAttribute('class', 'listing--image');

          preview.appendChild(img);
        }

        // Hide listing view button here as we don't want it to flash on load

        if (latency < 100) {
          listing.querySelector('.listing--view').style.display = 'none';
        }

      }

      // Load Google Maps link on load
      window.addEventListener('load', function () {
        if (latency < 100) {
          for (i = 0; i < listings.length; i++) {
            listing = listings[i];
            address = encodeURIComponent(listing.querySelector('.listing--address').innerText);

            wrapper = document.createElement('div');
            map = document.createElement('iframe');

            wrapper.setAttribute('class', 'listing--map');
            map.setAttribute('frameborder', 0);

            map.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?q=' + address + '&key=AIzaSyD6ATXLbrPCgBoeLzcWD1AphoYxKxwbNjE');

            wrapper.appendChild(map);

            listing.appendChild(wrapper);
          }
        }
      });
    }
  });
}());
