(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var mapLinks = document.querySelectorAll('.listing--address'),
        wrapper,
        map,
        listing,
        i;

    for (i = 0; i < mapLinks.length; i++) {
      parent = mapLinks[i].parentNode.parentNode;
      listing = mapLinks[i].getAttribute('data-address');

      wrapper = document.createElement('div');
      map = document.createElement('iframe');
      wrapper.setAttribute('class', 'listing--map');
      map.setAttribute('frameborder', 0);

      map.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?q=' + listing + '&key=AIzaSyD6ATXLbrPCgBoeLzcWD1AphoYxKxwbNjE');

      wrapper.appendChild(map);

      parent.appendChild(wrapper);

      parent.children[0].children[2].style.display = 'none';
    }
  });
}());
