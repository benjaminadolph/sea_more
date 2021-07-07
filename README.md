# Sea More - Interactive 2D Map 
## DESCRIPTION
An interactive 2D map to draw attention to the problems in our ocean. The user can navigate the website either by mouse or by smartphone and discover the different problems. If he or she operates the website by smartphone, then he or she can swim through the ocean as a turtle. Clicking on one of the action buttons opens subpages with further information on one of the topics.

There is also a mini-game where the user has to find five hidden coins in the ocean. Upon successful completion of the game, he or she can download cool screensavers.

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


```
$ node --version
v14.16.0
```

```
$ npm --version
7.6.0
```
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

If to use the smartphone controller locally, 
go to js/start.js and change the following lines:

1. comment line 21
2. uncomment line 23
3. comment line 31
4. uncomment line 33 and use your own IP Adress

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
We use the configuration from Airbnb for the linter.
Find more information on the [Airbnb git repository.](https://github.com/airbnb/javascript)

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
Webpack enables us to use npm modules in the frontend. We also use Webpack to merge and minify our JavaScript- and SCSS-Files.
### Build JavaScript and SCSS-Files

    $ npm run build
### Watch JavaScript and SCSS-Files with hot-reload

    $ npm run watch

---
## HEROKU
To be able to deploy the app to heroku via command line you have to install the heroku cli. 
Find more information on the [heroku website](https://devcenter.heroku.com/articles/git)
### Push master branch to heroku master

    $ git push heroku master

### Push other branch to heroku master

    $ git push heroku localbranch:master
