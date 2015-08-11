/* global module:false */

require('es5-shim');
require('es6-shim');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    webpack: {
      dist: require('./config/webpack/dist'),
      test: require('./config/webpack/test'),
      uncompressed: require('./config/webpack/uncompressed')
    },

    "webpack-dev-server": {
      start: {
        webpack: require('./config/webpack/dev'),
        keepalive: true,
        hot: true,
        contentBase: "./",
        inline: true,
        host: '127.0.0.1'
      }
    },

    karma: {
      test: {
        configFile: './config/karma.conf.js'
      }
    },

    jshint: require('./config/jshint.conf'),

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '127.0.0.1',
        }
      }
    },

    jasmine_nodejs: {
      options: {
        specNameSuffix: "spec.js",
        useHelpers: false,
        stopOnFailure: false,
        reporters: {
          console: {
            colors: true,
            cleanStack: 1,
            verbosity: 1,
            listStyle: "flat",
            activity: true
          }
        },
      },
      test: {
        specs: [
          "spec/e2e/basic.spec.js"
        ]
      }
    }
  });

  grunt.registerTask('default', ['test', 'webpack:uncompressed', 'webpack:dist']);
  grunt.registerTask('test', ['jshint', 'karma', 'webpack:test', 'connect', 'jasmine_nodejs']);
  grunt.registerTask('dev', ['webpack-dev-server:start']);
};
