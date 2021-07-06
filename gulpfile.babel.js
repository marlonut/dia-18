//Constantes para el automatizador de tareas
const gulp = require("gulp");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");

const browserSync = require("browser-sync");

const server = browserSync.create();

gulp.task("pug", () => {
    return gulp
        .src("./src/views/pages/index.pug")
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest("./doc/"));
});

gulp.task("default", () => {
    server.init({
        server: "./doc/*",
    });

    //PUG
    gulp.watch("./src/views/pages/index.pug", gulp.series("pug")).on("change", server.reload);
});