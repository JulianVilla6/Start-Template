//npm install --save-dev

var gulp = require('gulp');

var install = require("gulp-install");

gulp.src(["./package.json", "./bower.json"])
  .pipe(install());

var sass = require('gulp-sass');
var  php  = require('gulp-connect-php');
var browserSync = require('browser-sync');
var merge  = require ('merge-stream');

var bs = require("browser-sync").create();
var reload = browserSync.reload;

var concat  = require ('gulp-concat');
var browserify  = require ('gulp-browserify');

var autoprefixer = require('gulp-autoprefixer');

var minifyjs = require('gulp-js-minify');
var min = require('gulp-cssmin');
var name = require('gulp-rename');



var fuentesJS = [

'bundles/js/funciones.js',
'bundles/js/script.js'

]
/*
gulp.task('sass', function() {
  gulp.src('bundles/scss/app.scss')
    .pipe(autoprefixer()  )
    .pipe(sass({
      includePaths: ['scss']
    }))
    .pipe(gulp.dest('app/assets/css'));
});*/

gulp.task('sass', function(){

  var sassStream = gulp.src(['bundles/scss/app.scss'])
  .pipe(autoprefixer())
  .pipe(sass({
    includePaths: ['scss']
  }));



   var cssStream = gulp.src(['bundles/css/*.css'])


   var mergedStream = merge(sassStream , cssStream)
      .pipe(concat('app.css'))
      .pipe(min())
      .pipe(name({suffix:'.min'}))
      .pipe(gulp.dest('app/assets/css'))
      .pipe(reload({stream:true}))

 return mergedStream;






});

gulp.task('js', function() {
   gulp.src(fuentesJS)
  .pipe(concat('script.js'))
  .pipe(browserify())
//  .pipe(minifyjs())
  .pipe(gulp.dest('app/assets/js'))
.pipe(reload({stream:true}))

});









  /*browserSync.init(["assets/css/*css",

  "assets/js/*js","assets/app/*php"]*/

/*
  gulp.task('php', function() {
    php.server({ base: 'app', port: 8010, keepalive: true});
});
gulp.task('browser-sync',['php'], function() {



    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });



});
gulp.task('default', ['sass','browser-sync'], function () {
    gulp.watch(['app/*.php',"assets/css/*css", "assets/js/*js" ], [reload]);
});
*/
gulp.task('serve', ['sass'], function() {
  bs.init(["bundles/scss/*.scss","assets/css/*.css","bundles/css/*.scss","bundles/js/*.js",  "assets/app/js/*.js", "app/*.php", "app/*.html"], {
    server: {
      baseDir: 'app',
      directory: true
    }
  });

});


gulp.task('watch', ['serve','js'], function() {
  gulp.watch(["bundles/scss/*.scss"], ['sass']);
  gulp.watch(["bundles/js/*.js"], ['js']);
});



gulp.task('default',['watch']);
