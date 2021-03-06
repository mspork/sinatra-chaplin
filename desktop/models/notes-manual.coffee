define [
  'chaplin',
  'js/desktop/models/base/collection',
  'js/desktop/models/note'
], (Chaplin, Collection, Note) ->
  'use strict'

  class Notes extends Collection

    # URL that the data resides on.
    # This is the URL that HTTP methods will be run against.    
    url: 'api/notes'

    model: Note

    initialize: -> 
      super
      @fetch()

