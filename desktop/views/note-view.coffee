define [
  'js/desktop/views/base/view'
  'text!templates/desktop/note.hbs'
], (View, template) ->
  'use strict'

  class NoteView extends View
    # Automatically render after initialize.
    autoRender: true
    className: 'note'
    # region: 'main'

    # Save the template string in a prototype property.
    # This is overwritten with the compiled template function.
    # In the end you might want to used precompiled templates.
    template: template
    template = null
