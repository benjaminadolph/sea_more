# Sea More - Interactive 2D Map 
## DESCRIPTION
An interactive 2D map to raise awareness about the problems in our ocean. The user can navigate through the ocean in the form of a turtle via smartphone and is made aware of various problems. He can also collect coins and download cool screensavers upon successful completion of the mini-game.

Made with PixiJS, EJS, GSAP, JQuery, Node.js, Express.js, Socket.IO

---
## RUNNING APP ON HEROKU
You can have a look at our running project on: https://seamore.herokuapp.com/. For the best experience use the latest version of chrome.

---

## REQUIREMENTS

For development, you will need Node.js and npm installed in your environement. 
Just go to the [Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git on the [git website](https://git-scm.com/)).

If the installation was successful, you should be able to run the following commands. The project was developed using node version 14.16.0 and npm version 7.6.0. 

    $ node --version
    v14.16.0

    $ npm --version
    7.6.0
----
## SET UP THE PROJECT
To successfully start the project you have to 
1. install all dependencies with:

```
$ npm install
```

2. build all files with webpack 
```
$ npm run build
```
3. run the project
```
$ npm run serve
```

----
# IMPORTANT COMMANDS
### Install the project dependencies

    $ npm install

### Run the project with node

    $ npm run start

### Run the project with nodemon for hot reloads

    $ npm run serve

---
## LINTER

### Lint all files

    $ npm run lint

### Lint all files and fix 

    $ npm run lint:fix

### Lint specific file

    $ npx eslint ./specificFile.js

### Lint and fix specific file

    $ npx eslint ./specificFile.js --fix


---
## WEBPACK
### Build JavaScript and SCSS-Files

    $ npm run build
### Watch JavaScript and SCSS-Files for development with hot-reload

    $ npm run watch

---
## HEROKU

### Push master branch to heroku master

    $ git push heroku master

### Push other branch to heroku master

    $ git push heroku localbranch:master
