/** 
 * Importing all packages for task automation.
 * Gulp is used for automating tasks every time server is run.
 * Here gulp-live-server is used as the server which undertakes task automation.
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var LiveServer = require('gulp-live-server');
var open = require('gulp-open');
var lint = require('gulp-eslint');

var config = {
     paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css:[
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            './src/css/*.css'
        ],
        fonts: 'node_modules/bootstrap/fonts/*',
        dist: './dist',
        mainJS: "./src/main.js"
    }
}
/**
 * Browserify is a package which helps to bundle multiple interdependent modules into a single module.
 * Reactify is used to transform JSX into corresponding JS.
 */

var browserify = require('browserify');
var reactify = require('reactify');

/** 
 * Vinyl-source-stream is a package used for creating gulp pipelines.
*/
var source =  require('vinyl-source-stream');

/**
 * Gulp task to create and start a server whose defintions are in server/main.js.
 */

gulp.task('live-server',function(){
    var server = new LiveServer('server/server.js');
    server.start();

    gulp.watch(config.paths.html, ['html'], server.start.bind(server));
    gulp.watch(config.paths.js, ['js', 'lint'], server.start.bind(server));
    gulp.watch(config.paths.css,['css'], server.start.bind(server));
});

/**
 * Gulp task named bundle uses browserify to first set entry point of bundling as main.jsx.
 * The task is piped consecutively with multiple tasks in the following order.
 *  1) Set bundle entry point as main.jsx
 *  2) Transform JSX into JS
 *  3) Bundle all the transformed file together.
 *  4) Store the above bundle into a separate file called app.js
 *  5) Store app.js in a temporary folder caled .tmp
 */
gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist));
        
});

gulp.task('js', function() {
    browserify(config.paths.mainJS)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
        
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));
        

});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});

gulp.task('fonts',function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'));
        
});



/**
 * Gulp Task which creates a alias of the server to run at specified port
 */
gulp.task('begin', ['html', 'js', 'css','fonts','images', 'lint', 'live-server']);