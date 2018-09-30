const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() { // 定義 sass 的任務名稱
    return gulp.src('./src/scss/**/*.scss') // sass 的來源資料夾
        .pipe(sass( // 編譯 sass
            { outputStyle: 'expanded' } // sass 的輸出格式
        ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(gulp.dest('./public/stylesheets')); // sass 編譯完成後的匯出資料夾
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    // 監控資料夾，當有變化時執行 'sass' 任務
});

gulp.task('default', ['sass', 'sass:watch']);