var gulp = require('gulp'),
	cleanCss = require('gulp-clean-css'),
	gulpCopy = require('gulp-copy'),
	include = require("gulp-include"),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	rename = require("gulp-rename"),
	replace = require('gulp-replace'),
	babelify = require('babelify'),
	uglifyjs = require("gulp-uglify");//压缩混淆js ,
	streamify=require('gulp-streamify'),
	sourcemaps = require("gulp-sourcemaps"),
	buffer = require('vinyl-buffer'),
	hash = require('gulp-hash-src'),
	path = require('path'),
	glob = require('glob'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	fs = require('fs'),
	less = require('gulp-less');
	
var args = require('minimist')(process.argv.slice(2));

var entries = function() {
		var jsDir = path.resolve(__dirname, 'src/html');
		var entryFiles = glob.sync(jsDir + '/**/*.html');
		var map = {};
		for (var i = 0; i < entryFiles.length; i++) {
			var filePath = entryFiles[i];
			var filename = filePath.substring(filePath.lastIndexOf('\/html') + 5, filePath.lastIndexOf('.'));
			map[filename] = filePath;
		}
		
		return map;
	};
var entrie = entries();

var publishPath  = args['path']?args['path']+'/':'D:/Working/SCB_Dev20181026/PMC/PMC/iframes/SystemBasic/public/';
var portDev  = args['port']?+args['port']:8087,
	portBeta  = args['port']?+args['port']:9099,
	portProd  = args['port']?+args['port']:4321;

/**dev*/
gulp.task('cleanCss', function(){
	gulp.src('src/css/**/*.css')
		.pipe(cleanCss())
        .pipe(gulp.dest( publishPath +'css/')); 

    gulp.src('src/css/**/*.less')
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(cleanCss())
        .pipe(gulp.dest(publishPath + 'css/'));
});
gulp.task('img', function(){
	gulp.src('src/images/**/*')
        .pipe(gulp.dest( publishPath +'images/')); 
});
gulp.task("include", function() {
  	return gulp.src("src/html/**/*.html")
	.pipe(include())
	.pipe(hash({build_dir: publishPath +"html/", src_path: "src/html", exts: ['.js', '.css']}))
	.pipe(connect.reload())
	.pipe(gulp.dest( publishPath +"html/"));
});
gulp.task('connect', function() {
	connect.server({
		root: publishPath,
		port: portDev,
		livereload: false
	});
});
gulp.task("copy",function(){
	console.log(1)
    gulp.src(['./src/js/common/**/*.js','!./src/js/common/global.*\.js'])
        .pipe(gulp.dest( publishPath +'js/common/'));
	gulp.src('./src/js/common/global.config.js')
		.pipe(rename('global.js'))
		.pipe(replace('$gulpkey$', 'dev'))
        .pipe(gulp.dest( publishPath +'js/common/'));
    gulp.src(['./src/js/common/**/*.js','!./src/js/common/global.*\.js'])
        .pipe(gulp.dest( publishPath +'js/common/'));
    gulp.src('./src/js/lib/**/*')
        .pipe(gulp.dest( publishPath +'js/lib/'));
});
gulp.task('browserify', function() {
	for(var k in entrie){
		try {
			fs.accessSync('src/js/pages'+k+'.js', fs.constants.R_OK | fs.constants.W_OK);
			browserify('src/js/pages'+k+'.js')
			.transform(babelify,{presets: ["es2015"]})
			.bundle()
			.pipe(source('js/pages'+k+'.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init())
			.pipe(streamify(uglifyjs()))
			.pipe(sourcemaps.write('_srcmap'))
			.pipe(gulp.dest( publishPath ))
		} catch (err) {
			//console.error('');
		}
	}
});
gulp.task('watch', function() {
	gulp.watch(
		[
			"src/css/**/*.css",
			"src/css/**/*.less",
			"src/html/**/*.html",
			"src/js/**/*.js",
		], [
			'cleanCss',
			'hash',
			'browserify',
			'copy',
			'img'
		]
	);
});
gulp.task('hash', ['include','cleanCss'], function(){
	gulp.src("html/*.html")
	.pipe(hash({build_dir: publishPath +"html/", src_path: "src"}))
	.pipe(gulp.dest( publishPath +"html/"))
});
/**dev*/

/*test*/
gulp.task('cleanCss_test', function(){
	gulp.src('src/css/**/*.css')
		.pipe(cleanCss())
        .pipe(gulp.dest( publishPath +'css/')); 

    gulp.src('src/css/**/*.less')
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(cleanCss())
        .pipe(gulp.dest(publishPath + 'css/'));
});
gulp.task('img_test', function(){
	gulp.src('src/images/**/*')
        .pipe(gulp.dest( publishPath +'images/')); 
});
gulp.task("include_test", function() {
  	return gulp.src("src/html/**/*.html")
	.pipe(include())
	.pipe(hash({build_dir: publishPath + "html/", src_path: "src/html", exts: ['.js', '.css']}))
	.pipe(gulp.dest( publishPath +"html/"));
});

gulp.task("copy_test",function(){
    gulp.src(['./src/js/common/**/*.js','!./src/js/common/config.*\.js'])
        .pipe(gulp.dest( publishPath +'js/common/'));
	gulp.src('./src/js/common/config.src.js')
		.pipe(rename('config.js'))
		.pipe(replace('$gulpkey$', 'test'))
        .pipe(gulp.dest( publishPath +'js/common/'));
    gulp.src('./src/js/lib/**/*')
        .pipe(gulp.dest( publishPath +'js/lib/'));
});
gulp.task('browserify_test', function() {
	for(var k in entrie){
		try {
			fs.accessSync('src/js/pages'+k+'.js', fs.constants.R_OK | fs.constants.W_OK);
			browserify('src/js/pages'+k+'.js')
			.transform(babelify,{presets: ["es2015"]})
			.bundle()
			.pipe(source('js/pages'+k+'.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init())
			.pipe(streamify(uglifyjs()))
			.pipe(sourcemaps.write('_srcmap'))
			.pipe(gulp.dest( publishPath ))
		} catch (err) {
			//console.error('');
		}
	}
});

gulp.task('hash_test', ['include_test','cleanCss_test'], function(){
	gulp.src("html/*.html")
	.pipe(hash({build_dir:publishPath + "html/", src_path: "src"}))
	.pipe(gulp.dest( publishPath + "html/"))
});



/**
 * beta
 */
gulp.task('cleanCss_beta', function(){
	gulp.src('src/css/**/*.css')
		.pipe(cleanCss())
        .pipe(gulp.dest( publishPath +'css/')); 

    gulp.src('src/css/**/*.less')
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(cleanCss())
        .pipe(gulp.dest(publishPath + 'css/'));
});
gulp.task('img_beta', function(){
	gulp.src('src/images/**/*')
        .pipe(gulp.dest( publishPath +'images/')); 
});
gulp.task("include_beta", function() {
  	return gulp.src("src/html/**/*.html")
	.pipe(include())
	.pipe(hash({build_dir: publishPath + "html/", src_path: "src/html", exts: ['.js', '.css']}))
	.pipe(connect.reload())
	.pipe(gulp.dest( publishPath +"html/"));
});
gulp.task('connect_beta', function() {
	connect.server({
		root: publishPath,
		port: portBeta,
		livereload: true
	});
});
gulp.task("copy_beta",function(){
    gulp.src(['./src/js/common/**/*.js','!./src/js/common/config.*\.js'])
        .pipe(gulp.dest( publishPath +'js/common/'));
	gulp.src('./src/js/common/config.src.js')
		.pipe(rename('config.js'))
		.pipe(replace('$gulpkey$', 'beta'))
        .pipe(gulp.dest( publishPath +'js/common/'));
    gulp.src('./src/js/lib/**/*')
        .pipe(gulp.dest( publishPath +'js/lib/'));
});
gulp.task('browserify_beta', function() {
	for(var k in entrie){
		try {
			fs.accessSync('src/js/pages'+k+'.js', fs.constants.R_OK | fs.constants.W_OK);
			browserify('src/js/pages'+k+'.js')
			.transform(babelify,{presets: ["es2015"]})
			.bundle()
			.pipe(source('js/pages'+k+'.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init())
			.pipe(streamify(uglifyjs()))
			.pipe(sourcemaps.write('_srcmap'))
			.pipe(gulp.dest( publishPath ))
		} catch (err) {
			//console.error('');
		}
	}
});
gulp.task('watch_beta', function() {
	gulp.watch(
		[
			"src/css/**/*.css",
			"src/css/**/*.less",
			"src/html/**/*.html",
			"src/js/**/*.js",
		], [
			'cleanCss_beta',
			'hash_beta',
			'browserify_beta',
			'copy_beta',
			'img_beta'
		]
	);
});
gulp.task('hash_beta', ['include_beta','cleanCss_beta'], function(){
	gulp.src("html/*.html")
	.pipe(hash({build_dir:publishPath + "html/", src_path: "src"}))
	.pipe(gulp.dest( publishPath + "html/"))
});

/**pord*/
gulp.task('cleanCss_prod', function(){
	gulp.src('src/css/**/*.css')
		.pipe(cleanCss())
        .pipe(gulp.dest( publishPath +'css/')); 

    gulp.src('src/css/**/*.less')
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(cleanCss())
        .pipe(gulp.dest(publishPath + 'css/'));
});
gulp.task('img_prod', function(){
	gulp.src('src/images/**/*')
        .pipe(gulp.dest( publishPath +'images/')); 
});
gulp.task("include_prod", function() {
  	return gulp.src("src/html/**/*.html")
	.pipe(include())
	.pipe(hash({build_dir: publishPath + "html/", src_path: "src/html", exts: ['.js', '.css']}))
	.pipe(connect.reload())
	.pipe(gulp.dest( publishPath +"html/"));
});
gulp.task('connect_prod', function() {
	connect.server({
		root: publishPath,
		port: portProd,
		livereload: true
	});
});
gulp.task("copy_prod",function(){
    gulp.src(['./src/js/common/**/*.js','!./src/js/common/config.*\.js'])
        .pipe(gulp.dest( publishPath +'js/common/'));
    /* gulp.src('./src/js/common/config.prod.js')
    	.pipe(rename('config.js'))
		.pipe(gulp.dest( publishPath +'js/common/')); */
	gulp.src('./src/js/common/config.src.js')
		.pipe(rename('config.js'))
		.pipe(replace('$gulpkey$', 'prod'))
        .pipe(gulp.dest( publishPath +'js/common/'));
    gulp.src('./src/js/lib/**/*')
        .pipe(gulp.dest( publishPath +'js/lib/'));
});
gulp.task('browserify_prod', function() {
	for(var k in entrie){
		try {
			fs.accessSync('src/js/pages'+k+'.js', fs.constants.R_OK | fs.constants.W_OK);
			browserify('src/js/pages'+k+'.js')
			.transform(babelify,{presets: ["es2015"]})
			.bundle()
			.pipe(source('js/pages'+k+'.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init())
			.pipe(streamify(uglifyjs()))
			.pipe(sourcemaps.write('_srcmap'))
			.pipe(gulp.dest( publishPath ))
		} catch (err) {
			//console.error('');
		}
	}
});
gulp.task('watch_prod', function() {
	gulp.watch(
		[
			"src/css/**/*.css",
			"src/css/**/*.less",
			"src/html/**/*.html",
			"src/js/**/*.js",
		], [
			'cleanCss_prod',
			'hash_prod',
			'browserify_prod',
			'copy_prod',
			'img_prod'
		]
	);
});
gulp.task('hash_prod', ['include_prod','cleanCss_prod'], function(){
	gulp.src("html/*.html")
	.pipe(hash({build_dir: publishPath + "html/", src_path: "src"}))
	.pipe(gulp.dest( publishPath + "html/"))
});
/**prod*/
gulp.task('cleanDist', function(){
	return del.sync([publishPath+'/**','!'+publishPath], {force:true});
});
gulp.task('dev',['cleanCss','hash', 'browserify','copy','img', 'connect','watch']);

gulp.task('test',['cleanDist','cleanCss_test','hash_test', 'browserify_test','copy_test', 'img_test']);

gulp.task('beta',['cleanDist','cleanCss_beta','hash_beta', 'browserify_beta','copy_beta', 'img_beta']);

gulp.task('prod',['cleanDist','cleanCss_prod','hash_prod', 'browserify_prod','copy_prod', 'img_prod']);


