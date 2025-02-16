(function () {
  // var SITE_ID = "{{ SITE_ID }}";
  var BANNER_URL = "{{ BANNER_URL }}";
  var TARGET_URL = "{{ TARGET_URL }}";
  // var BANNER_TYPE = "{{ BANNER_TYPE }}";
  // var STATUS = "{{ STATUS }}";
  // var PRIORITY = "{{ PRIORITY }}";

  var banner = document.createElement("div");
  var script = document.currentScript;
  script.parentElement.insertBefore(banner, script);

  var link = banner.appendChild(document.createElement("a"));
  link.href = TARGET_URL;
  var img = link.appendChild(document.createElement("img"));
  img.src = BANNER_URL;
})();
