// Generated by CoffeeScript 1.6.2
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['chaplin', 'models/base/collection', 'models/note'], function(Chaplin, Collection, Note) {
    'use strict';
    var Notes, _ref;

    return Notes = (function(_super) {
      __extends(Notes, _super);

      function Notes() {
        this.announce = __bind(this.announce, this);        _ref = Notes.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Notes.prototype.url = 'api/notes';

      Notes.prototype.model = Note;

      Notes.prototype.initialize = function() {
        Notes.__super__.initialize.apply(this, arguments);
        _(this).extend(Chaplin.SyncMachine);
        this.syncStateChange(this.announce);
        return this.fetch();
      };

      Notes.prototype.fetch = function(options) {
        var success,
          _this = this;

        if (options == null) {
          options = {};
        }
        this.beginSync();
        success = options.success;
        options.success = function(collection, response) {
          if (typeof success === "function") {
            success(collection, response);
          }
          return _this.finishSync();
        };
        return Notes.__super__.fetch.call(this, options);
      };

      Notes.prototype.processNotes = function(response) {
        if (this.disposed) {
          return;
        }
        return this.finishSync();
      };

      Notes.prototype.announce = function() {
        console.debug('state changed');
        return console.log(this);
      };

      return Notes;

    })(Collection);
  });

}).call(this);
