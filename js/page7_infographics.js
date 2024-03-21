$(document).ready(function() {
  $('#infographics-dump').imagesLoaded(function() {
      $('#infographics-dump').masonry({
          itemSelector: '.grid-item',
          columnWidth: 200,
          gutter: 10
      });
  });
});
