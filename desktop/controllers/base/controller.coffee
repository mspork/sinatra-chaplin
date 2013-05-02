define ['chaplin', 'js/desktop/views/navigation-view'], (Chaplin, NavigationView) ->
  'use strict'

  class Controller extends Chaplin.Controller
    # Place your application-specific controller features here
    beforeAction:
      '.*': ->
        @compose 'navigation', NavigationView
