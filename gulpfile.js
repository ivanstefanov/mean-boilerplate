var gulp = require('gulp');
var nodemon = require('nodemon');
var childProcess = require('child_process');


//inects js and css files into index.html
//for doing that, you must put code similar to
//<!-- bower:js -->
//<!-- endbower-->
//into the html source to indicate where the js(or css) files should be injected and to run the task
//wiredep looks for the bower.json file into the included packages and adds their dependencies too
//that's why, when inserting bootstrap.js(from our bower.json), it injects and jquery.js(from bootstrap's bower.json)
//if not all files are included, we must add "overrides" property into the wiredep options (or in bower.json file) and to add the files we need implicity
//despite the files we need, we have to add and the files from "main" property from the packet's local bower.json file
gulp.task('inject', function() {
  console.log('injecting wiredup');

  var wiredup = require('wiredep').stream; //injecting the bower packets
  var inject = require('gulp-inject'); //injecting our own files(not these from bower)

  var injectSrc = gulp.src([
    './public/css/*.css',
    './public/*.js',
    './public/components/**/*.js'], {
    read: false
  });

  var injectOptions = {
    ignorePath: '/public'
  };

  var wiredupOptions = {
    bowerJson: require('./bower.json'), //show where is the bower.json to get the dependencies
    directory: './public/lib', //where is the directory to looking for the installed bower packets
    ignorePath: '../../public', //this path goes away from the injected code (it's not necessary)
    //bootstrap have removed its css-file from the main-attribute in its bower.json file.
    //Therefore the files won't be injected by wiredep, so it needs to be overrided
    overrides: {
      "bootstrap": {
        "main": [
        "dist/js/bootstrap.js",
        "dist/css/bootstrap.css",
        "less/bootstrap.less"
        ]
      },
      "font-awesome": {
        "main": [
          "css/font-awesome.min.css",
          "less/font-awesome.less",
          "scss/font-awesome.scss"
          ]
      }
    }
  };

  return gulp.src('./public/*.html') //pull the files to be injected
    .pipe(wiredup(wiredupOptions)) //inject the bower css and js files using wiredup
    .pipe(inject(injectSrc, injectOptions)) //inject our css and js files using gulp-inject
    .pipe(gulp.dest('./public')); //pipe them into the views
});

//starting redis server
gulp.task('redis', function() {
  console.log('starting redis...');
  childProcess.exec('redis-server', function(err, stdout, stderr) {
    console.log(stdout);
    if (err !== null) {
      console.log('redis-server error: ' + err);
    };
  });
});

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('serve', ['redis', 'inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsFiles
  };

  return nodemon(options).on('restart', function(ev) {
    console.log("restarting...");
  });

});