exports.onInitialClientRender = () => {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = '//api.usersnap.com/load/87d7d864-26f2-4653-8d13-13e44c5f0f90.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
  }