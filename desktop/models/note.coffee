define [
  'chaplin',
  'js/desktop/models/base/model'
], (Chaplin, Model) ->
  'use strict'

  class Note extends Model
    # defaults:
    #   message: 'NOTE'

    # initialize: (attributes, options) ->
    #   super
    #   console.debug 'HelloWorld#initialize'
