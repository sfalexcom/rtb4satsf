(function () {
  // var SITE_ID = "123456";
  var BANNER_URL = "https://bilarika.com/assets/featured.png";
  var TARGET_URL = "https://bilarika.com/";
  // var BANNER_TYPE = "Large_Rectangle_336_280";
  // var STATUS = "on";
  // var PRIORITY = "1";

  var banner = document.createElement("div");
  var script = document.currentScript;
  script.parentElement.insertBefore(banner, script);

  var link = banner.appendChild(document.createElement("a"));
  link.href = TARGET_URL;
  var img = link.appendChild(document.createElement("img"));
  img.src = BANNER_URL;
})();
