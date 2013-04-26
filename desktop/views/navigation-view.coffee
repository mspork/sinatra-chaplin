define [
  'views/base/view'
  'text!templates/navigation.hbs',
  'models/navigation'
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
    
