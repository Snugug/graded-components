(function (Modernizr) {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var listings = document.querySelectorAll('.listing'),
        latency = window.performance.timing.responseStart - window.performance.timing.requestStart,
        back,
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

        // Map will only load if very fast connection
        if (latency < 100) {
          // If 3D Transforms are available, let flipping happen
          if (Modernizr.csstransforms3d) {
            listing.querySelector('.listing--view').addEventListener('click', function (e) {
              e.preventDefault();
              listing.setAttribute('data-open', true);
            });
          }
          // If not, hide the listing view button
          else {
            listing.querySelector('.listing--view').style.display = 'none';
          }
        }
      }

      // Load Google Maps link on load
      window.addEventListener('load', function () {
        if (latency < 100) {
          for (i = 0; i < listings.length; i++) {
            listing = listings[i];
            address = encodeURIComponent(listing.querySelector('.listing--address').innerText);

            // <button class="listing--go-back">Details</button>

            wrapper = document.createElement('div');
            map = document.createElement('iframe');
            back = document.createElement('a');

            wrapper.setAttribute('class', 'listing--map');
            map.setAttribute('frameborder', 0);
            back.setAttribute('class', 'listing--go-back');
            back.innerText = 'Details';
            back.addEventListener('click', function () {
              listing.removeAttribute('data-open');
            });

            map.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?q=' + address + '&key=AIzaSyD6ATXLbrPCgBoeLzcWD1AphoYxKxwbNjE');

            wrapper.appendChild(map);

            listing.querySelector('.listing--back').appendChild(wrapper);

            if (Modernizr.csstransforms3d) {
              listing.querySelector('.listing--back').appendChild(back);
            }
          }
        }
      });
    }
  });
}(window.Modernizr));
