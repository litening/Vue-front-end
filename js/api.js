const ApiSetup = async () => {
  return axios.get(`${API_BASE}/Setup?userid=${USER_ID}`);
};

const ApiCatalog = async () => {
  return axios.get(`${API_BASE}/itemlistwide?userId=${USER_ID}`);
};

const ApiTrackActivity = (trackcode, trackingid, trackingOption) => {
  return axios.post(
    `${API_BASE}/Track`,
    {
      trackcode,
      trackingid,
      trackingOption,
      userid: USER_ID,
    },
    { withCredentials: true }
  );
};

const goToCheckout = (params) => {
  // Fixes dual-screen position        Most browsers      Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - 400) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 600) / 2 / systemZoom + dualScreenTop;

  return window.open(
    `${CHECKOUT}${generateQueryString(params)}`,
    "",
    `width=400px, height=600px, left=${left},top=${top},resizeable=1`
  );
};

const generateQueryString = (obj) => {
  var s = "?";
  for (var i in obj) {
    if (i == "dropdowns") {
      s += `${i}=${JSON.stringify(obj[i])}`;
      continue;
    }
    s += `${i}=${obj[i]}&`;
  }
  return s.slice(0, -1);
};
