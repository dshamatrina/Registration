var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat');
 
gulp.task('build', function() {
  return gulp.src('./dev/less/*.less')
    .pipe(concat('style.less'))
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('pug', function () {
    return gulp.src('./dev/index.pug')
    .pipe(pug({
            doctype: 'html',
            pretty: false
            }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('./dev/**/*.pug', gulp.series(['pug']));
    gulp.watch('./dev/**/*.less', gulp.series(['build']));
});

gulp.task('default', gulp.series(['pug', 'build', 'watch']));
