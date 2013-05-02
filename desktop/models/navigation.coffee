define [
  'chaplin',
  'js/desktop/models/base/model',
], (Chaplin, Model) ->
  'use strict'

  class Navigation extends Model
    defaults:
      navPath: "#"
