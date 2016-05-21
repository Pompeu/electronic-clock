const gulp     = require('gulp');
const gulpIf   = require('gulp-if');
const eslint   = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const mocha    = require('gulp-mocha');

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

gulp.task('pre-test', () => {
  return gulp.src(sourceFiles)
  // Covering files
    .pipe(istanbul())
  // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha())
  // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
  // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('watch', () => {
  gulp.watch(sourceFiles, ['test', 'eslint']);
});

gulp.task('default', ['watch']);
