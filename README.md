# TimeTracker
An electron app for tracking time

## Usage

### Installing
`$ git clone git@github.com:jpfeiffer16/TimeTracker.git`

`$ cd TimeTracker`

Install bower and electron globally if you don't have them:

`$ sudo npm install -g bower electron`

`$ npm install`

Now you need to use the electron rebuild module to build squlite
for electron.

`$ ./node_modules/.bin/electron-rebuild`

Now install front-end deps with bower.

`$ bower install`

Now run `electron .` to launch the app.