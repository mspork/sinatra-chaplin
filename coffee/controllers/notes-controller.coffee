define [
  'controllers/base/controller'
  'models/notes'
  'models/note'
  'views/notes-view'
], (Controller, Notes, Note, NotesView) ->
  'use strict'

  class NotesController extends Controller
    show: (params) ->
      @collection = new Notes
      # text = "You have NO BLODDY text"
      # note = new Note()
      # note.set { text: text }
      # @collection.add note
      # @collection.models
      # console.log('Notes before fetch')
      # console.log("Note with text: #{note.text}")
      console.log(@collection)

      @view = new NotesView {@collection}

      # @collection.fetch()

      # console.log('Notes after fetch')
