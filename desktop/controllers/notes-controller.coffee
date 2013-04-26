define [
  'controllers/base/controller'
  'models/notes'
  'models/note'
  'views/notes-view'
], (Controller, Notes, Note, NotesView, MobiNotesView) ->
  'use strict'

  class NotesController extends Controller
    show: (params) ->
      @collection = new Notes
      # note = new Note()
      # note.set { text: text }
      # @collection.add note
      # @collection.models
      # console.log(@collection)
      # @collection.fetch()
      @view = new NotesView {@collection}


    # mobiShow: (params) ->
    #   @collection = new Notes
    #   console.log(@collection)
    #   @view = new MobiNotesView {@collection}