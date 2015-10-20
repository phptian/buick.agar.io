//包含gulp
var gulp = require('gulp');

//包含我们的插件
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['p-configs'].directories;

var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var react = require('gulp-react');

var revAll = require("gulp-rev-all");
var revOptions = new revAll({
        dontRenameFile: [".html"],
        dontGlobal: [/^\/favicon.ico$/, ".bat", ".txt"],
        //dontUpdateReference: [".html", /sea\-(debug-){0,1}[\d\.]+/, /lib\/.+/]
    });

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

var amdOptimize = require("amd-optimize");

var minifyHTML = require('gulp-minify-html');

var core ={
    html:[
        dirs.folder + '/*.html'
    ],
    js : [
        'gulpfile.js',
        dirs.folder + '/js/*.js'
    ],
    img :[
        dirs.folder + '/img/**/*'
    ],
    mainjs : [
        dirs.folder + '/js/main.js'
    ],
    modules : [
        dirs.folder + '/js/allmodules/**/*.js'
    ],
    reactjs : [
        dirs.folder + '/js/react/*.js'
    ],
    bulidDom : [
        dirs.folder + '/js/bulid/*.js'
    ],
    lib : [
        dirs.folder + '/js/lib/*.js'
    ],
    less : [
        dirs.folder + '/less/*.less'
    ]
};

/*清空dist文件夹*/
gulp.task('clean', function (done) {
    require('del')([
        dirs.folder +'/'+dirs.build,
        dirs.folder +'/'+dirs.dist
    ], done);
});


//lint task
gulp.task('lint:js',function(){
    gulp.src(core.js)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});


gulp.task('copy', [
    'copy:lib',
    'copy:img'
]);

gulp.task('copy:lib', function () {
    return gulp.src(core.lib)
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/js/lib'));
});

gulp.task('compress:less', function(){
    return gulp.src(dirs.folder +'/less/**/all.less')
    .pipe(plugins.less())
    .on('error', function(e){console.log(e);} )
    .pipe(plugins.rename(function(path){
        path.basename =  path.dirname.length>1 ?  path.dirname+"_base" : 'base';
        path.dirname = "";
    }))
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/css'));
});


gulp.task('compress:less_min', function(){
    return gulp.src(dirs.folder +'/less/**/all.less')
    .pipe(plugins.less({plugins: [cleancss]}))
    .on('error', function(e){console.log(e);} )
    .pipe(plugins.rename(function(path){
        path.basename = path.dirname.length>1 ?  path.dirname+'_base.min' : 'base.min' ;
        path.dirname = "";
    }))
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/css'));
});

gulp.task('compress:mainjs', function(){
    return gulp.src(core.mainjs)
    .pipe(plugins.react())
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/js'));
});

// gulp.task('Imagemin', function () {
//     gulp.src(dirs.folder+ '/img/**/*.{png,jpg,gif,ico}')
//         .pipe(cache(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         })))
//         .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/img'))
// });


gulp.task('rjs', function () {
  return gulp.src(dirs.folder + '/js/allmodules/**/*.js')
    .pipe(plugins.react())
    .pipe(amdOptimize('main', {
      configFile: dirs.folder + '/js/config.js',
      findNestedDependencies: true,
      include: false
    }))
    .pipe(plugins.concat('modules.js'))
    // .pipe(uglifyJS('test.js'))
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+ '/js'))
});



gulp.task('copy:html', function () {
    return gulp.src(dirs.folder +'/*.html')
    //.pipe(minifyHTML(opts))
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build));
});
gulp.task('copy:img', function () {
    return gulp.src(core.img)
    //.pipe(minifyHTML(opts))
    .pipe(gulp.dest(dirs.folder +'/'+ dirs.build+'/img'));
});

gulp.task("revAll", ['compress:mainjs','compress:less_min' ,'rjs'], function() {
    return gulp.src(dirs.folder +'/'+ dirs.build+'/{js,css,img}/**')
        .pipe(revOptions.revision())
        .pipe(gulp.dest(dirs.folder +'/'+ dirs.dist))
        // .pipe(revOptions.manifestFile())
        // .pipe(gulp.dest(dirs.folder +'/'+ dirs.dist));
});

// * `empty` - do not remove empty attributes
// * `cdata` - do not strip CDATA from scripts
// * `comments` - do not remove comments
// * `conditionals` - do not remove conditional internet explorer comments
// * `spare` - do not remove redundant attributes
// * `quotes` - do not remove arbitrary quotes
// * `loose` - preserve one whitespace

// gulp.task('minify-html', function() {
//   var opts = {
//     conditionals: false,
//     spare:false
//   };

//   return gulp.src(dirs.folder +'/share.html')
//     .pipe(minifyHTML(opts))
//     .pipe(plugins.uglify())
//     .pipe(gulp.dest(dirs.folder +'/'+ dirs.build));
// });


gulp.task("revHtml", ['copy:html'], function() {
    return gulp.src(dirs.folder +'/'+ dirs.build+'/*.html')
        .pipe(revOptions.revision())
        // .pipe(minifyHTML({
        //     conditionals: true,
        //     spare:true,
        //     quotes:true,
        //     empty:false,
        //     loose:true
        // }))
        .pipe(gulp.dest(dirs.folder +'/'+ dirs.dist))
});


gulp.task('cleanRev', function (done) {
    require('del')([
        dirs.folder +'/'+dirs.build
    ], done);
});


gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'copy',
        'revAll',
        'revHtml',
        'cleanRev',
    done);
});

gulp.task('default', ['build'], function(){
    gulp.watch([core.less,core.mainjs,core.reactjs,core.modules,core.bulidDom],function(){
        gulp.run('build');
    });
});