# CIDM 4385 Ionic
  These projects will be created using Angular 1

**Github Repo name:** SP17_Angularjs

4/10/2017 - Project Created

[Ionic](https://ionicframework.com/)

[Markdown cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

[Linux cheat sheet](https://files.fosswire.com/2007/08/fwunixref.pdf)

[Github cheat sheet](https://www.git-tower.com/blog/git-cheat-sheet/)

[How to push an existing Cloud9 project to GitHub](http://lepidllama.net/blog/how-to-push-an-existing-cloud9-project-to-github/)

[How to start an Ionic project in c9](https://github.com/ahuimanu/cidm4385-2016sp-ionic-basics)

## readme.md format

### Header
1. Title
2. April 20th, 2017 - Project created
3. Description

### Body
1. Features
```javascript
2. Code snippets
```
3. Explanations of code

### Helpful links
1. Links that help explain the project
2. Links that helped solve problems in the project

### Known issues
#### Learned how to create and push to a Github branch:
**http://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch**
#### Secondary sources:
* https://help.github.com/articles/pushing-to-a-remote/
* https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches
* https://www.atlassian.com/git/tutorials/syncing#git-push
* http://stackoverflow.com/questions/5802426/git-error-src-refspec-master-does-not-match-any
* https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
* http://stackoverflow.com/questions/2745076/what-are-the-differences-between-git-commit-and-git-push
* https://help.github.com/articles/changing-a-remote-s-url/
* http://stackoverflow.com/questions/820178/how-do-you-push-just-a-single-git-branch-and-no-other-branches

You must get from this:
```
david_musician:~/workspace (master) $ git checkout -b newIonic
M       jcidm_4385/ionic-starter-sidemenu
Switched to a new branch 'newIonic'
```
to this: 

```
david_musician:~/workspace (newIonic) $ git push git@github.com:david-musician/SP17_Angularjs.git newIonic
```

### Changelog
1. Features added
2. Bugs fixed
3. 

To start an Ionic app: ionic serve -p $PORT --nolivereload

# This is the header

**_BOLDED_**

```javascript
//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
```