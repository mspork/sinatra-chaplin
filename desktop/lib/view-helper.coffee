define [
  'handlebars'
  'chaplin'
  'js/desktop/lib/utils'
], (Handlebars, Chaplin, utils) ->
  'use strict'

  # Application-specific Handlebars helpers
  # ---------------------------------------

  # Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}
  Handlebars.registerHelper 'url', (routeName, params..., options) ->
    Chaplin.helpers.reverse routeName, params

  Handlebars.registerHelper 'eachProperty', (context, options) ->
    ret = ""
    for prop of context
      ret = ret + options.fn({ property:prop, value:context[prop] })
    ret

  null
