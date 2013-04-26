define [
  'chaplin',
  'models/base/collection',
  'models/note'
], (Chaplin, Collection, Note) ->
  'use strict'

  class Notes extends Collection
    # Mixin a synchronization state machine.

    # URL that the data resides on.
    # This is the URL that HTTP methods will be run against.    
    url: 'api/notes'

    # model: Note

    initialize: -> 
      super
    #   _(this).extend Chaplin.SyncMachine
    #   @syncStateChange @announce
      @fetch()

    # fetch: (options = {}) -> 
    #   # Initiate a syncing operation; magic for selectors
    #   @beginSync()
    #   success = options.success
    #   options.success = (collection, response) =>
    #     success? collection, response
    #     @finishSync()
    #   super options

      # request = super
      # # Facilitates the sync machine by letting those who care know that
      # # the request is done and is successful (or is failure).
      # request.done => @processNotes()
      # request.fail => @abortSync()
      # request

    # processNotes: (response) ->
    #   # Exit if for some reason this collection was
    #   # disposed prior to the response
    #   return if @disposed

    #   # Update the collection
    #   # @reset(if response and response.data then response.data else [])

    #   # Set the machine into `synced` state
    #   @finishSync()

    announce: =>
      console.debug 'state changed'
      console.log this

