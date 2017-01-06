# TimeTracker
An electron app for tracking time

## Usage

### Installing
`$ git clone git@github.com:jpfeiffer16/TimeTracker.git`

`$ cd TimeTracker`

Install bower and electron globally if you don't have them:

`$ sudo npm install -g bower electron`

`$ npm install`

Now install front-end deps with bower.

`$ bower install`

Now run `electron .` to launch the app.

To install the app globally and add a desktop file on Linux:

`$ sudo npm install -g --unsafe-perm .`

Now you should see a launcher icon for the app in your 
Free Desktop Org compliant desktop.

### Notes:
Currently only macOS and Linux are supported. Windows support is currently being
worked on.

Destop launcher only works on linux currently.

### Technical Details

Time, Notes and stats are stored in a SQLite DB the path to which is specified in
Settings > DB Path

