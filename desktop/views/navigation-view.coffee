define [
  'js/desktop/views/base/view'
  'text!templates/desktop/navigation.hbs',
  'js/desktop/models/navigation'
], (View, template, Naviation) ->
  'use strict'

  class NavigationView extends View
    container: '#navigation-container'
    id: 'navigation'
    # regions:
    #   '#main-container': 'main'
    template: template
    template = null

    getTemplateData: ->
      super
      data = { 'navPath' : "/"}
      # console.log data
      # data
    
