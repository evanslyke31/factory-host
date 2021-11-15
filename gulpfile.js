const gulp = require('gulp');
const del = require('del');

gulp.task('default', () => {
    sources = [
      './node_modules/linear-alg-lib/dist/index.min.js',
    ];
    return gulp.src(sources).pipe(gulp.dest('./static/modules'));
});

gulp.task('clean', () => {
    return del(['./static/modules']);
});