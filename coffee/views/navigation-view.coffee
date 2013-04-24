define [
  'views/base/view'
  'text!templates/navigation.hbs'
], (View, template) ->
  'use strict'

  class NavigationView extends View
    container: '#navigation-container'
    id: 'navigation'
    # regions:
    #   '#main-container': 'main'
    template: template
    template = null
