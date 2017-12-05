importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "css/addGame.css",
    "revision": "cfb3e38e31bb158c05c406c51510c0c7"
  },
  {
    "url": "css/addPlayer.css",
    "revision": "2a8c2b8602e807776849a5ef44d4f983"
  },
  {
    "url": "css/createRole.css",
    "revision": "5524c2953120d5094f5b8c1ede9923bd"
  },
  {
    "url": "css/eventFeed.css",
    "revision": "148380de339cac151dd53235e1586ca6"
  },
  {
    "url": "css/global.css",
    "revision": "5b1302ded43e369c5070c37f8b01689e"
  },
  {
    "url": "css/homePage.css",
    "revision": "d4e6c3f4eae6a1d072e1389816e6de3f"
  },
  {
    "url": "css/liveGame.css",
    "revision": "a358b31b80b08724ef03124c6e259c6d"
  },
  {
    "url": "css/login.css",
    "revision": "7577ecf58c9169e09c04f6bc459f4cb3"
  },
  {
    "url": "css/playerProfile.css",
    "revision": "78f59f25f43828e456ca9fd545d0c160"
  },
  {
    "url": "css/roster.css",
    "revision": "8f6fa98f0379382d1de8a3d5546909e8"
  },
  {
    "url": "css/schedule.css",
    "revision": "3853f3b239ee3ec5a97bc2fcbdab9d24"
  },
  {
    "url": "css/selectAcc.css",
    "revision": "fd75020da724f737293c1c30e756954a"
  },
  {
    "url": "html/addGame.html",
    "revision": "2d9e56505e6be1e5bea3ef664a0b8569"
  },
  {
    "url": "html/addPlayer.html",
    "revision": "f921cf96299fe2161721e826485c54dc"
  },
  {
    "url": "html/createAcc.html",
    "revision": "079387ccf1829ffc6791dbfa1ecf8bc2"
  },
  {
    "url": "html/createFan.html",
    "revision": "e081b075f9aa7dbb2c00c6da415a0bc0"
  },
  {
    "url": "html/createPlayer.html",
    "revision": "a1b896824b50588d503d5cc9b69feac3"
  },
  {
    "url": "html/createTeam.html",
    "revision": "5aa835b32d1326895484b75185105303"
  },
  {
    "url": "html/eventFeed.html",
    "revision": "69bf707437c2b9af36e8493535fe1f88"
  },
  {
    "url": "html/homepage.html",
    "revision": "dd17464590127e55e89654bd864d2346"
  },
  {
    "url": "html/roster.html",
    "revision": "b4c3749905fddfe477b4e097b104c225"
  },
  {
    "url": "html/schedule.html",
    "revision": "44a2f31cca8416a434e63d9c4392d92f"
  },
  {
    "url": "images/ajaygiri.jpg",
    "revision": "c26b3cf6db3fcaf96dfc2c3f449a7825"
  },
  {
    "url": "images/erictseng.jpg",
    "revision": "e706f0024cc5f4978e6dcd51844f164c"
  },
  {
    "url": "images/hansgamboa.jpg",
    "revision": "6cbf24243cf2389234c60092ebbd703d"
  },
  {
    "url": "images/plus.png",
    "revision": "d298ec2e9edb2cd3901e123a48d677ce"
  },
  {
    "url": "images/settings.png",
    "revision": "b0a317a7f2146920be7046bdda1c7fe4"
  },
  {
    "url": "images/soccerball.jpg",
    "revision": "3dda712041b477ad309fe24d203ec2f8"
  },
  {
    "url": "images/soccerFav.jpeg",
    "revision": "7be5942150675081d9f5b7be7bc81fa7"
  },
  {
    "url": "images/soccerplayer.png",
    "revision": "6326a4d1e343dab5a69a6b6a808778d4"
  },
  {
    "url": "images/triton.jpg",
    "revision": "492ddd476640536a24cb9b7e63101dde"
  },
  {
    "url": "images/turtles.jpg",
    "revision": "0d65460aea3a306ceac1ebc479249848"
  },
  {
    "url": "index.css",
    "revision": "ed0aecd0315f86608ffaab5c74b1401c"
  },
  {
    "url": "index.html",
    "revision": "d5d2e37921bdd5e17b46ec22815ab2f4"
  },
  {
    "url": "js/addGame.js",
    "revision": "fe50af09ab88eedf3d71b587ddae18a9"
  },
  {
    "url": "js/addPlayer.js",
    "revision": "c7a1adf5f85499eac0a00b51607fd9f8"
  },
  {
    "url": "js/createFan.js",
    "revision": "b4b4e2e575a787e88d72c1875200a741"
  },
  {
    "url": "js/createPlayer.js",
    "revision": "090d5e35280dda602aedce76912f372f"
  },
  {
    "url": "js/createTeam.js",
    "revision": "9f1f57d928ade69d6fd0a682cd3c51f2"
  },
  {
    "url": "js/firebase.js",
    "revision": "8d981f1c01376e91db4f1215f542bf24"
  },
  {
    "url": "js/homepage.js",
    "revision": "271c00a0e828571e9f0125d72b2e129e"
  },
  {
    "url": "js/index.js",
    "revision": "4754da935db8667f428feb86a1c8ebfa"
  },
  {
    "url": "js/roster.js",
    "revision": "cb9970037ecbf70e64637a5057f6b72f"
  },
  {
    "url": "js/schedule.js",
    "revision": "be714b3280944e6aa334f36543c9e7e2"
  },
  {
    "url": "json/teams.json",
    "revision": "73cc97b6b8fda71aed294c0c45e16711"
  },
  {
    "url": "json/test.json",
    "revision": "c3896385ca60bad85c0a6466dfbc4d8a"
  },
  {
    "url": "manifest.json",
    "revision": "aecf9c45fe87f01225eb977ff2b8c3e7"
  },
  {
    "url": "non-minified-js/addGame.js",
    "revision": "a0844bf4a2ae0b49d3f8a2e4e60276d1"
  },
  {
    "url": "non-minified-js/addPlayer.js",
    "revision": "a9789f27cc8cc8b37f638d5da61a27b7"
  },
  {
    "url": "non-minified-js/createFan.js",
    "revision": "0abbf91e4681c132df352f1fcb84ad27"
  },
  {
    "url": "non-minified-js/createPlayer.js",
    "revision": "79f2d75b05bd5046fc17e2d1fc2861de"
  },
  {
    "url": "non-minified-js/createTeam.js",
    "revision": "92d974c72bf032f974a12b9eecc5f19b"
  },
  {
    "url": "non-minified-js/firebase.js",
    "revision": "f33b90347d84a0e2751fcc2eb14f9f4f"
  },
  {
    "url": "non-minified-js/homepage.js",
    "revision": "54367a641ed0c291b7be661e7509f9d1"
  },
  {
    "url": "non-minified-js/index.js",
    "revision": "1aae369ef5c8f636876414d3caef1432"
  },
  {
    "url": "non-minified-js/roster.js",
    "revision": "4df72513dea2ccaa82d301b0cc827032"
  },
  {
    "url": "non-minified-js/schedule.js",
    "revision": "e585f1bc971c345f7f8efa944251f7a5"
  },
  {
    "url": "readme.me",
    "revision": "870ca5bfa43eda9946e0930d8a4333b6"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js.map",
    "revision": "8e170beaf8b748367396e6039c808c74"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
