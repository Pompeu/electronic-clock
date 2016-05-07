const gulp = require('gulp');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');
const sourceFiles = ['**/*.js', '!node_modules/**', '!coverage/**'];

function isFixed (file) {
  return file.eslint && typeof file.eslint.output === 'string';
}

gulp.task('eslint', () => {
  return gulp.src(sourceFiles)
    .pipe(eslint({
      useEslintrc: true,
      fix:         true
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')))
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(sourceFiles, ['eslint']);
});

gulp.task('default', ['watch']);
