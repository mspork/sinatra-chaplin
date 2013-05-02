define [
  'handlebars'
  'chaplin'
  'js/desktop/lib/view-helper' # Just load the view helpers, no return value
], (Handlebars, Chaplin) ->
  'use strict'

  class View extends Chaplin.View
    getTemplateFunction: ->
      # Template compilation
      # --------------------

      # This demo uses Handlebars templates to render views.
      # The template is loaded with Require.JS and stored as string on
      # the view prototype. On rendering, it is compiled on the
      # client-side. The compiled template function replaces the string
      # on the view prototype.
      #
      # In the end you might want to precompile the templates to JavaScript
      # functions on the server-side and just load the JavaScript code.
      # Several precompilers create a global JST hash which stores the
      # template functions. You can get the function by the template name:
      #
      # templateFunc = JST[@templateName]

      template = @template

      if typeof template is 'string'
        # Compile the template string to a function and save it
        # on the prototype. This is a workaround since an instance
        # shouldn’t change its prototype normally.
        templateFunc = Handlebars.compile template
        @constructor::template = templateFunc
      else
        templateFunc = template

      templateFunc

    changePage: ->  
      console.log 'View#changePage'

      @$el.attr('data-role', 'page')
      # transition = $.mobile.defaultPageTransition
      # We don't want to slide the first page
      # if (this.firstPage) {
      #     transition = 'none';
      #     this.firstPage = false;
      # }
      # $.mobile.pageContainer = $('div[data-role="page"]')
      $.mobile.enhancePage(@$el, 'page')
