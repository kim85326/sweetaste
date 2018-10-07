const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require('gulp-rename');

gulp.task('sass', function() { // 定義 sass 的任務名稱
    return gulp.src('./src/scss/**/*.scss') // sass 的來源資料夾
        .pipe(sass( // 編譯 sass
            { outputStyle: 'expanded' } // sass 的輸出格式
        ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(gulp.dest('./public/css')) // sass 編譯完成後的匯出資料夾
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS({
            keepBreaks: true,
        }))
        .pipe(gulp.dest('./public/css'));
});

var config = {
    jsConcatFiles: [
        './node_modules/jquery/dist/jquery.slim.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    ]
};

gulp.task('js', function() {
    return gulp.src(config.jsConcatFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
    // 監控資料夾，當有變化時執行 'watch' 任務
});

gulp.task('default', ['sass', 'js', 'watch']);