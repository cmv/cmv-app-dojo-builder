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
          'dist/**/*',
          '!dist/**/index.html',
          '!dist/**/build-report.txt',
          '!dist/**/app/config/**/*.js',
          '!dist/**/app/css/**',
          '!dist/**/images/**',
          '!dist/**/nls/**',
          '!dist/**/css/**',
          '!dist/**/resources/**',
          '!dist/**/dojo/dojo.js',
          '!dist/**/*js.map'
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
          src: ['built.html'],
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

  grunt.registerTask('build', ['clean:build', 'dojo', 'copy', 'clean:afterbuild', 'clean:emptydir']);
  grunt.registerTask('build-dev', ['clean:build', 'dojo', 'copy']);

};
