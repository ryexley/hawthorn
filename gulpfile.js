var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");

gulp.task("sass", function () {
    var sassOptions = {
        outputStyle: "compressed"
    };

    // delete normalize...wanna start fresh of there's a new version...
    // and delete any CSS files currently in the destination
    del([
        "./src/ui/scss/_normalize.scss",
        "./src/server/public/style/sourcemaps",
        "./src/server/public/style/**/*.css"
    ]);
    // copy normalize.css to the SCSS folder as an importable Sass file
    gulp.src("./node_modules/normalize-css/normalize.css")
        .pipe(rename("_normalize.scss"))
        .pipe(gulp.dest("./src/ui/scss"));

    // now process our Sass
    gulp.src("./src/ui/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(sourcemaps.write("./sourcemaps"))
        .pipe(gulp.dest("./src/server/public/style"));
});

gulp.task("watch", function () {
    gulp.watch(["./src/ui/scss/**/*.scss"], ["sass"]);
});
