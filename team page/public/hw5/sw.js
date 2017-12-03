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
    "revision": "a8dc7b2d3c87e0cf5244d3525243cb09"
  },
  {
    "url": "html/addPlayer.html",
    "revision": "270ac015b6f9dc856ed521e64c29f5b0"
  },
  {
    "url": "html/createAcc.html",
    "revision": "f8268b5bf1fe40fff98a2d2c361aa479"
  },
  {
    "url": "html/createFan.html",
    "revision": "ea708625dc2bd85ea296cec369609a47"
  },
  {
    "url": "html/createPlayer.html",
    "revision": "b96fcfc5c40ff9b46055774a619a3093"
  },
  {
    "url": "html/createTeam.html",
    "revision": "d3de85085d2bd95e62559329d9e56fe9"
  },
  {
    "url": "html/eventFeed.html",
    "revision": "36386f115919b0a49a820f2a531c815d"
  },
  {
    "url": "html/homepage.html",
    "revision": "3536ebba744f43e6587f3e0c580ab337"
  },
  {
    "url": "html/roster.html",
    "revision": "8b1e06054d4590b1329d725d7f799ea0"
  },
  {
    "url": "html/schedule.html",
    "revision": "f9363dfa62b4f37d98eea6971182bf11"
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
    "revision": "e423aec8d7024a7c0cfffc358bb024ed"
  },
  {
    "url": "index.html",
    "revision": "0e5a9ffd4dc13e83077ef49fe10c8cf7"
  },
  {
    "url": "js/addGame.js",
    "revision": "dd94d930850b1e68bffd9f9d899222ba"
  },
  {
    "url": "js/addPlayer.js",
    "revision": "633f0ef312a05932d3dd25081c13e960"
  },
  {
    "url": "js/createFan.js",
    "revision": "f56b9190c31210edd8f7cb9253f795c4"
  },
  {
    "url": "js/createPlayer.js",
    "revision": "513aff5c13e94843bee6ecf037cf6c36"
  },
  {
    "url": "js/createTeam.js",
    "revision": "d16d4748e435ad65982d7b4aea8900be"
  },
  {
    "url": "js/firebase.js",
    "revision": "f33b90347d84a0e2751fcc2eb14f9f4f"
  },
  {
    "url": "js/homepage.js",
    "revision": "57cb032c968121aeb3b5ecfb9b079e3e"
  },
  {
    "url": "js/index.js",
    "revision": "1aae369ef5c8f636876414d3caef1432"
  },
  {
    "url": "js/roster.js",
    "revision": "116c3c507473097ed0e5e2cb6cfe3a54"
  },
  {
    "url": "js/schedule.js",
    "revision": "f89121950e056cabed5fa06a71367790"
  },
  {
    "url": "json/teams.json",
    "revision": "db51f837b7b67c994c3e0bbcd37ba8d8"
  },
  {
    "url": "json/test.json",
    "revision": "c3896385ca60bad85c0a6466dfbc4d8a"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js.map",
    "revision": "8e170beaf8b748367396e6039c808c74"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
