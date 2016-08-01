# HUGE CHALLENGE CODE - FRONT END

This code challenge was create to build a responsive site navigation driven by an AJAX request.
The code cahllengue was development using:

  - HTML 5
  - CSS3 pure
  - Javascript without frameworks
  - Run into a node.js server
  - Management task and dependencies with gulp

The site is responsive for different devices, for this the site has two kinds of view, mobile(For width devices <768px) and desktop (For width devices >=768px).

### Version
0.1.0

### Tech

For running the application you need:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [Morgan] - HTTP request logger middleware for node.js
* [Gulp]  - the streaming build system

This challenge code is open source with a [public repository][challenge]
 on GitHub. Also for upgrade performance the front-end resources are minified throught gulp's plugins.

### Installation

Code challenge requires [Node.js](https://nodejs.org/) v4+ to run.

You need Gulp installed globally:

```sh
$ npm install -g gulp
```

```sh
$ git clone [git-repo-url] ChallengeFrontEnd
$ cd ChallengeFrontEnd
$ npm install 
```
### Development
After instalation, you can run the aplication with the next command:

```sh
$ gulp deployApp
```
or just execute:
```sh
$ gulp
```
The gulp task allows modify the code while is running, after you safe the code the gulp task minimize the resources and publish it on distribution folder(dist).

License
----

ISC


**Free Software, Hell Yeah!**

   [challenge]: <https://github.com/kamiNaranjo/ChallengeFrontEnd>
   [git-repo-url]: <https://github.com/kamiNaranjo/ChallengeFrontEnd.git>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [Gulp]: <http://gulpjs.com>
   [Morgan]:<https://github.com/expressjs/morgan>
