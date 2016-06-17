/// <binding AfterBuild='moveToLibs' />

var gulp = require('gulp');

var paths = {
    npmSrc: "node_modules/",
    libTargetAngular2: "wwwroot/libraries/angular2/"
};

var angularLibsToMove = [
   paths.npmSrc + '/systemjs/dist/system.js',
   paths.npmSrc + '/reflect-metadata/reflect.js',
   paths.npmSrc + '/rxjs/bundles/Rx.js',
   paths.npmSrc + '/angular2/bundles/angular2-polyfills.js',
   paths.npmSrc + '/angular2/bundles/angular2.dev.js',
   paths.npmSrc + '/angular2/bundles/http.dev.js'
];

gulp.task('moveToLibs', function () {
    gulp.src(angularLibsToMove).pipe(gulp.dest(paths.libTargetAngular2));
    return true;
});