define [
  'js/desktop/controllers/base/controller'
  'js/desktop/models/hello-world'
  'js/desktop/views/hello-world-view'
], (Controller, HelloWorld, HelloWorldView) ->
  'use strict'

  class HelloController extends Controller
    show: (params) ->
      @model = new HelloWorld()
      @view = new HelloWorldView {@model}
