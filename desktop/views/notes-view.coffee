define [
  'views/base/view'
  'text!templates/notes.hbs',
  'models/notes'
], (View, template, Notes) ->
  'use strict'

  class NotesView extends View

    # This is important - does not render without it
    # region: 'main'
    id: 'notes'
    container: '#content-container'
    # autoRender: yes
    
    render: ->
      console.log 'NotesView#render' 
      super

    # rendered: no

    # getTemplateData: ->
    #   super
    #   # console.log data
    #   # data
    
    # listen: 
    #   'change collection': 'render'


    # Save the template string in a prototype property.
    # This is overwritten with the compiled template function.
    # In the end you might want to used precompiled templates.
    template: template
    template = null

    initialize: ->
      super
      @listenTo @collection, 'add', @render

    #   @collection.synced =>
    #     console.log "synced event in view"
    #     console.log @collection
    #     unless @rendered 
    #       @render()
    #       @rendered = yes

