This piece of software is copyright of Justin Drake, and licensed under the Creative Commons Attribution-NonCommercial 3.0 Unported license, available at http://creativecommons.org/licenses/by-nc/3.0/legalcode. If this license is too restrictive for your needs, please send me a message and I will consider releasing the code under a more permissive license.

# Description

This piece of software is a [Node](nodejs.org)-based web app to facilitate crowd sourced question creation.

# Dependencies

The Node.JS dependencies are specified in the `package.json` file. They are:

* express (version 2.5.2)
* jade (version 0.19.0)
* mongoose (version 2.4.7)
* everyauth (0.2.27)

# Getting started out-of-the-box
## Installation

1. Install the latest version of Node
2. Install the latest version of MongoDB
3. Clone the Git repository to your server

## Configurations

If using the given Heroku remote database, and wish to work under `localhost`, please add the following line to the file `/etc/hosts`:

> 127.0.0.1       pure-fog-1978.herokuapp.com

## Launching the server

1. (optional) If you are using a local database (not enabled by default) then you need to launch a mongo instance. (In the command line, type `mongo`.)
2. From the Git repository base folder, launch the app. (In the command line, type `node app.js`.)
3. If you are working form `localhost` go to `localhost:4000`.