define [
  'views/base/view'
  'text!templates/notes.hbs',
  'models/notes'
], (View, template, Notes) ->
  'use strict'

  class NotesView extends View

    id: 'notes'
    container: '#content-container'

    # rendered: no

    getTemplateData: ->
      data = super
      console.log data
      data

    listen: 
      # 'change collection': 'processNotes'

    # Save the template string in a prototype property.
    # This is overwritten with the compiled template function.
    # In the end you might want to used precompiled templates.
    template: template
    template = null

    processNotes: ->
      console.log('got Notes via fetch')
      console.log @collection
      render()

    initialize: ( options = {} )->
      super options
      @listenTo @collection, 'change', @processNotes