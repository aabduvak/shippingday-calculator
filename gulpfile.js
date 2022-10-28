/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gulpfile.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aabduvak <abdulaziz.yosk@gmail.com>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/10/26 14:43:25 by aabduvak          #+#    #+#             */
/*   Updated: 2022/10/26 14:50:43 by aabduvak         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass')(require('sass'));
const cleanCSS      = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('scripts', function () {
    return gulp.src("src/assets/js/*.js")
        .pipe(rename({suffix: '', prefix: ''}))
        .pipe(gulp.dest("dist/assets/js"))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src("src/assets/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/assets/js/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/assets/icons/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/assets/img/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        //.pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('icons', function () {
    return gulp.src("src/assets/img/icons/*")
        .pipe(gulp.dest("dist/assets/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/assets/img/**/*")
        .pipe(gulp.dest("dist/assets/img"))
        .pipe(browserSync.stream());
});

gulp.task('build', gulp.parallel('styles', 'icons', 'html', 'images', 'scripts'));

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'icons', 'html', 'images', 'scripts'));