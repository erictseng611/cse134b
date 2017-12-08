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
    "revision": "209b07cfda5ed2b33e415ad34fd0ca1e"
  },
  {
    "url": "html/createPlayer.html",
    "revision": "6c9f1a3282ff7305816cfe0afd6155dd"
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
    "revision": "b83d03c91271b600f31ce77e138bacde"
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
    "url": "images/hansgamboa_playerphoto.png",
    "revision": "10ce4b3c3d6100ca9a4890d61b44796c"
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
    "url": "images/snipLogo.png",
    "revision": "017e48765b01ff45a8abbab73fb316b4"
  },
  {
    "url": "images/soccerball.jpg",
    "revision": "3dda712041b477ad309fe24d203ec2f8"
  },
  {
    "url": "images/soccerball.png",
    "revision": "89c46d9acbf6847545fcbe9b6a2b39cc"
  },
  {
    "url": "images/soccerFav.jpeg",
    "revision": "7be5942150675081d9f5b7be7bc81fa7"
  },
  {
    "url": "images/soccerplayer.png",
    "revision": "a4388a024fa3fe0c9ebe84adde67e698"
  },
  {
    "url": "images/triton.png",
    "revision": "6b8851cec0f79e0d5ed0dda5fc499cf7"
  },
  {
    "url": "images/turtles.jpg",
    "revision": "0d65460aea3a306ceac1ebc479249848"
  },
  {
    "url": "index.css",
    "revision": "7ae1a022da227b8be9da53326973ecd1"
  },
  {
    "url": "index.html",
    "revision": "d5d2e37921bdd5e17b46ec22815ab2f4"
  },
  {
    "url": "js/addGame.js",
    "revision": "58f9f882a59123019325ca9d6f0b5650"
  },
  {
    "url": "js/addPlayer.js",
    "revision": "24cb4ea0de3fcbf7940e4433ebf9c3aa"
  },
  {
    "url": "js/createFan.js",
    "revision": "00dbaa6cbfdeb0475029e5d08aa1236d"
  },
  {
    "url": "js/createPlayer.js",
    "revision": "eb4d023975ae70bcd6feee217bb61368"
  },
  {
    "url": "js/createTeam.js",
    "revision": "02b0b506d4b824eecae5fa1b43862669"
  },
  {
    "url": "js/firebase.js",
    "revision": "8d981f1c01376e91db4f1215f542bf24"
  },
  {
    "url": "js/homepage.js",
    "revision": "11566998acc9822917c1e90870e0cd01"
  },
  {
    "url": "js/index.js",
    "revision": "5b2e04e186c526d4c6587a99cbe0cf1f"
  },
  {
    "url": "js/roster.js",
    "revision": "ecfbed4c4f4e67ac4ed0d448305fc9cc"
  },
  {
    "url": "js/schedule.js",
    "revision": "ad5216de66c0c5848afb7ffb8eb9a587"
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
    "revision": "99c6d7b9699612f60523d0dcdcd9c9c3"
  },
  {
    "url": "non-minified-js/addGame.js",
    "revision": "2d9719b87717ff3ce65cd1f41c3084f7"
  },
  {
    "url": "non-minified-js/addPlayer.js",
    "revision": "3425e3975149168ddb8c0a74e0ea573c"
  },
  {
    "url": "non-minified-js/createFan.js",
    "revision": "07a9706f82adda284a658c19a260db79"
  },
  {
    "url": "non-minified-js/createPlayer.js",
    "revision": "63e8ee332f68594faefa176da72946fd"
  },
  {
    "url": "non-minified-js/createTeam.js",
    "revision": "547fade1d95d085cd4628dcb704bb0a8"
  },
  {
    "url": "non-minified-js/firebase.js",
    "revision": "f33b90347d84a0e2751fcc2eb14f9f4f"
  },
  {
    "url": "non-minified-js/homepage.js",
    "revision": "0418a273a778d425191c979a691fbe3d"
  },
  {
    "url": "non-minified-js/index.js",
    "revision": "7d9893951e6f3db4ca26fea3e5cc10de"
  },
  {
    "url": "non-minified-js/roster.js",
    "revision": "616b7daed1791d904508da8271fed13f"
  },
  {
    "url": "non-minified-js/schedule.js",
    "revision": "936591277aaaf5ca6a55f917c474cd78"
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
