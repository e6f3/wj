const script = document.createElement('script');
script.id = 'aclib';
script.type = 'text/javascript';
script.src = getBase() + '/aclib.js';

// when ad lib loads we run our zones
script.onload = () => {
  // 2 banners per ref, remove for now (make no money, annoyying)
    /*["acLeft", "acRight"].forEach(id => aclib.runBanner({
        zoneId: "12196570",
        renderIn: "#" + id
    }))*/
  // gated popunder, like only open when on opium page not game or proxy yk
    aclib.runPop({
        zoneId: "12196614",
        popGate: () => isOpiumMenu(),
    });
};

document.head.appendChild(script);
