node-convert
============

use node.js and imagemagick to implement an image format convert service.

requirement
-----------

A lot of images in word file is in wmf format. libwmf in *nix server has many problems(encode, font, etc.).
For convert wmf image correctly, we must use windows server instead.

1. Install `node.js`.
2. Install `imagemagick`.
3. Install `mathtype` if you want to convert images created by mathtype.
4. Restart server after install.

usage
-----

1. Clone node-convert into server.
2. Enter node-convert dir in server, run `npm install winser` to install `winser`.
3. Run `npm run-script install-windows-service` to install node-convert.
4. If npm gives errno 34, run the following two cmd: `npm update -g`, `npm cache clear`.
5. If windows server install failed, see <http://nssm.cc/usage> to install server manually.
6. Start node-convert server.
