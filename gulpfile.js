const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['ts'], () => {
  gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'assets']);
