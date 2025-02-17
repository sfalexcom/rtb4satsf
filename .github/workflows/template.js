/**
 * Embed the following code snippet in web pages at the places where the banner should appear:
 * <script src="{{ BASE_URL }}{{ SITE_ID }}-{{ SIZE_ID }}.js"></script>
 */

(function () {
  var BANNERS = {{ BANNERS }};
  var SITE_ID = "{{ SITE_ID }}";
  var SIZE_ID = "{{ SIZE_ID }}";
  var TIMEOUT = 30 * 1000;

  var BANNER_SIZE = SIZE_ID.split('x');
  var BANNER_WIDTH = +BANNER_SIZE[0];
  var BANNER_HEIGHT = +BANNER_SIZE[1];

  var banner = document.createElement("div");
  var script = document.currentScript;
  var BANNER_SIZE = SIZE_ID.split('x');

  script.parentElement.insertBefore(banner, script);
  banner.style.width = banner.style.maxWidth = BANNER_WIDTH + 'px';
  banner.style.height = banner.style.maxHeight = BANNER_HEIGHT + 'px';

  function render(data) {
    banner.removeChild(banner.firstChild);
    var link = banner.appendChild(document.createElement("a"));
    link.href = data[1];
    link.target = "_blank";
    var img = link.appendChild(document.createElement("img"));
    img.src = data[0];
    img.loading = "lazy";
    img.width = BANNER_WIDTH;
    img.height = BANNER_HEIGHT;
  }

  function rotate() {
    var randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    var randomIndex = randomBuffer[0] % BANNERS.length;
    render(BANNERS[randomIndex]);
  }

  setInterval(rotate, TIMEOUT);
})();
