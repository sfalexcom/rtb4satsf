(function () {
  // var SITE_ID = "sfalex_com";
  var BANNER_URL = "https://example.com/banner1.jpg";
  var TARGET_URL = "https://example.com/landing-page";
  // var BANNER_TYPE = "Leaderboard_728_90";
  // var STATUS = "on";
  // var PRIORITY = "999";

  var banner = document.createElement("div");
  var script = document.currentScript;
  script.parentElement.insertBefore(banner, script);

  var link = banner.appendChild(document.createElement("a"));
  link.href = TARGET_URL;
  var img = link.appendChild(document.createElement("img"));
  img.src = BANNER_URL;
})();
