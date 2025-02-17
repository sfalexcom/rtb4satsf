(function () {
  var BANNERS = {{ BANNERS }};
  var SITE_ID = "{{ SITE_ID }}";
  var SIZE_ID = "{{ SIZE_ID }}";
  var TIMEOUT = 30 * 1000;

  var banner = document.createElement("div");
  var script = document.currentScript;
  var format = SIZE_ID.split('x');

  script.parentElement.insertBefore(banner, script);
  banner.style.width = banner.style.maxWidth = format[0] + 'px';
  banner.style.height = banner.style.maxHeight = format[1] + 'px';

  function render(data) {
    banner.removeChild(banner.firstChild);
    var link = banner.appendChild(document.createElement("a"));
    link.href = data[1];
    var img = link.appendChild(document.createElement("img"));
    img.src = data[0];
  }

  function rotate() {
    var randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    var randomIndex = randomBuffer[0] % BANNERS.length;
    render(BANNERS[randomIndex]);
  }

  setInterval(rotate, TIMEOUT);
})();
