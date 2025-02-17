(function () {
  var BANNERS = [["https://bilarika.com/assets/mobile.png","https://bilarika.com/","1"]];
  var SITE_ID = "123456";
  var SIZE_ID = "120x600";
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
