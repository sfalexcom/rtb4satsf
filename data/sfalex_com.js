(function () {
  // var SITE_ID = "sfalex_com";
  var BANNER_URL = "https://example.com/banner1.jpg";
  var TARGET_URL = "https://example.com/landing-page";
  // var BANNER_TYPE = "Medium_Rectangle_300_250";
  // var STATUS = "off";
  // var PRIORITY = "1";

  var banner = document.createElement("div");
  var script = document.currentScript;
  script.parentElement.insertBefore(banner, script);

  var link = banner.appendChild(document.createElement("a"));
  link.href = TARGET_URL;
  var img = link.appendChild(document.createElement("img"));
  img.src = BANNER_URL;
})();
