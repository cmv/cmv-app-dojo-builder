var fs = require('fs'),
  path = require('path');

function isEmptyDirectory(filepath) {
  var children, x;
  if (!fs.statSync(filepath).isDirectory()) {
    return false;
  }
  children = fs.readdirSync(filepath);
  for (x in children) {
    if (!isEmptyDirectory(path.join(filepath, children[x]))) {
      return false;
    }
  }
  return true;
}

module.exports = function (grunt) {
  // Build customizations would be left up to developer to implement.
  grunt.loadNpmTasks('grunt-dojo');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    clean: {
      build: {
        src: ['dist/']
      },
      uncompressed: {
        src: [
          'dist/**/*.uncompressed.js'
        ]
      },
      afterbuild: {
        src: [

          //lets delete everything!
          'dist/**/*',

          //...except a few things
          '!dist/index.html',

          //dojo built layers and css files
          //include other layers, or they'll be deleted
          '!dist/dojo/dojo.js',
          '!dist/app/css/build.css',


          //the build output in case something goes wrong
          '!dist/build-report.txt',

          //any additional configs
          //'!dist/**/app/config/**/*.js',

          //images, resources, and source maps
          '!dist/**/fonts/**',
          '!dist/**/images/**',
          '!dist/**/resources/**',
          '!dist/**/*.js.map'
        ],
        filter: 'isFile'
      },
      emptydir: {
        src: ['dist/**/*'],
        filter: isEmptyDirectory
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['index.html'],
          dest: './dist/',
          rename: function(dest, src) {
            return dest + 'index.html';
          }
        }]
      }
    },
    dojo: {
      dist: {
        options: {
          releaseDir: '../dist',
        }
      },
      options: {
        profile: 'build.profile.js',
        dojo: 'src/dojo/dojo.js',
        load: 'build',
        cwd: './',
        basePath: './src'
      }
    }
  });

  grunt.registerTask('build-dev', ['clean:build', 'dojo', 'copy']);
  grunt.registerTask('build', ['clean:build', 'dojo', 'copy', 'clean:afterbuild', 'clean:emptydir']);

};
