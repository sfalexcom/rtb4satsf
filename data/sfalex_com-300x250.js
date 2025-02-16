(function () {
  // var SITE_ID = "sfalex_com";
  var BANNER_URL = "https://example.com/banner1.jpg";
  var TARGET_URL = "https://example.com/landing-page";
  // var BANNER_TYPE = "Medium_Rectangle_300_250";
  var STATUS = "on".trim().toLowerCase();
  // var PRIORITY = "1";

  var isActive =
    STATUS !== "" && STATUS !== "off" && STATUS !== "false" && STATUS !== "0";

  if (isActive) {
    var banner = document.createElement("div");
    var script = document.currentScript;
    script.parentElement.insertBefore(banner, script);

    var link = banner.appendChild(document.createElement("a"));
    link.href = TARGET_URL;
    var img = link.appendChild(document.createElement("img"));
    img.src = BANNER_URL;
  }
})();
