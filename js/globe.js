const otApi = {}; 

otApi.addJSFiles = function (files, callback) {
    console.log("addJSFiles");
    const head = document.head;
    files.forEach((file) => {
        const script = document.createElement("script");
        script.src = file;
        script.onload = callback;
        head.appendChild(script);
    });
};

otApi.GlobeGL = {
  // Settings
  $trigger: $(".js-globe-gl"),
  jsFiles: [
    "https://d3js.org/d3.v7.min.js",
    "https://unpkg.com/globe.gl@2.26.5/dist/globe.gl.min.js",
  ],

  // Initialize
  init: function () {
    console.log("GlobeGL init");
    if (this.$trigger.length) {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (!isReduced || isReduced.matches) {
        const globeVisual = document.getElementById("globe-visual");
        globeVisual.classList.remove("d-none");
      } else {
        otApi.addJSFiles(this.jsFiles, this.applyGlobeGL);
      }
    }
  },

  // Apply globe.gl
  applyGlobeGL: function () {
    console.log("GlobeGL applyGlobeGL");
    const $globe = document.getElementById("globe-gl"),
      globeWidth = $globe.parentNode.getBoundingClientRect().width,
      primaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary"),
      neutralColor = "#007d88",
      map =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD5Ip3+AAAAC0lEQVQIHWP4DwQACfsD/Qy7W+cAAAAASUVORK5CYII=",
      landCheckUrl = "https://assets.ot.digital/img/map.png",
      landCheckImg = new Image(),
      DEG2RAD = Math.PI / 180,
      random_sample = (obj, n) => d3.shuffle(obj.slice()).slice(0, n),
      N = 10,
      world = Globe()
        .globeImageUrl(map)
        .backgroundColor("rgba(0, 0, 0, 0)")
        .showGlobe(true)
        .showAtmosphere(true)
        .atmosphereColor(neutralColor)
        .atmosphereAltitude(0.3)
        .width(globeWidth)
        .height(globeWidth)($globe),
      globeMat = world.globeMaterial();

    globeMat.opacity = 0;
    globeMat.shininess = 0;

    landCheckImg.src = landCheckUrl;
    landCheckImg.crossOrigin = "Anonymous";
    landCheckImg.onload = () => {
      landDots(25, 200, landCheckImg);
    };

    //const dlight = world.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
    //dlight && dlight.position.set(-1, 1, 1);

    world.pointOfView({ altitude: 2 });
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.4;
    world.controls().enabled = true;
    world.controls().enableZoom = false;

    // Resize globe on window resize
    window.addEventListener("resize", (event) => {
      const globeWidth = $globe.parentNode.getBoundingClientRect().width;
      world.width([globeWidth]);
      world.height([globeWidth]);
    });


    function landDots(globeRad, rows, image) {
      const d = getImageData(image);
      d.backgroundColor = "white";
      d.color = "white";

      const dots = [];

      for (let lat = -90; lat <= 90; lat += 180 / rows) {
        const radius = Math.cos(Math.abs(lat) * DEG2RAD) * globeRad;
        const circum = radius * Math.PI * 2 * 2;
        for (let r = 0; r < circum; r++) {
          const lng = (360 * r) / circum - 180;
          if (!visibilityForCoordinate(lng, lat, d)) {
            continue;
          }
          dots.push({ lat: lat, lng: lng });
        }
      }

      world
        .pointsData(dots)
        .pointColor(() => neutralColor)
        .pointRadius(0.25)
        .pointResolution(5)
        .pointAltitude(0)
        .pointsMerge(true)
        // arcs
        .arcColor(() => primaryColor)
        .arcStroke(0.25)
        .arcDashInitialGap(1)
        .arcDashLength(2)
        .arcDashGap(2)
        .arcDashAnimateTime(2000)
        // labels
        .labelText((d) => "")
        .labelColor(() => (t) => primaryColor)
        .labelDotRadius(0.3)
        .labelAltitude(0.002)
        .labelsTransitionDuration(250)
        // rings
        .ringColor(() => (t) => "rgba(51,5,141,${1-t})")
        .ringMaxRadius(2)
        .ringPropagationSpeed(0.1)
        .ringRepeatPeriod(0);
      let c10 = random_sample(dots, N * 2),
        c = [...Array(N).keys()].map((d, i) => ({
          startLat: c10[i].lat,
          startLng: c10[i].lng,
          endLat: c10[i + N].lat,
          endLng: c10[i + N].lng,
        })),
        l = [...Array(N * 2).keys()].map((d, i) => ({
          lat: c10[i].lat,
          lng: c10[i].lng,
        })),
        r = [...Array(N).keys()].map((d, i) => ({
          lat: c10[i + N].lat,
          lng: c10[i + N].lng,
        }));

      world.arcsData(c).labelsData(l);

      setTimeout(() => {
        world.ringsData(r);
      }, 4000);

      setInterval(() => {
        let c10 = random_sample(dots, N * 2),
          c = [...Array(N).keys()].map((d, i) => ({
            startLat: c10[i].lat,
            startLng: c10[i].lng,
            endLat: c10[i + N].lat,
            endLng: c10[i + N].lng,
          })),
          l = [...Array(N * 2).keys()].map((d, i) => ({
            lat: c10[i].lat,
            lng: c10[i].lng,
          })),
          r = [...Array(N).keys()].map((d, i) => ({
            lat: c10[i + N].lat,
            lng: c10[i + N].lng,
          }));

        world.arcsData(c).labelsData(l);

        setTimeout(() => {
          world.ringsData(r);
        }, 4000);
      }, 6000);
    }

    function visibilityForCoordinate(lng, lat, data) {
      const i = 4 * data.width,
        r = parseInt(((lng + 180) / 360) * data.width + 0.5),
        a = data.height - parseInt(((lat + 90) / 180) * data.height - 0.5),
        s = parseInt(i * (a - 1) + 4 * r) + 3;
      return data.data[s] > 90;
    }

    function getImageData(img) {
      const el = document.createElement("canvas").getContext("2d");
      return (
        (el.canvas.width = img.width),
        (el.canvas.height = img.height),
        (el.canvas.backgroundColor = "white"),
        (el.canvas.color = "white"),
        el.drawImage(img, 0, 0, img.width, img.height),
        el.getImageData(0, 0, img.width, img.height)
      );
    }
  },
};

// Initialize
otApi.GlobeGL.init();