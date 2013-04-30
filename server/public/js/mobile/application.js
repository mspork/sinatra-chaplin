
define(
	['backbone',
	'handlebars',
	'zepto',
	'foundation',
	'foundationtopbar',
	'text!desktop/templates/hello-world.hbs',
	'text!desktop/templates/notes.hbs',
	'text!desktop/templates/navigation.hbs' ],
	function(
		Backbone, Handlebars,
		Zepto, Foundation, FoundationTopbar,
		helloTemplate, notesTemplate, navigationTemplate) {
	// console.log(person.first + ' ' + person.last);
	// 
	var App = function() {

		var Notes = Backbone.Collection.extend({
			url: '/api/notes'
		});

		var Note = Backbone.Model.extend({
			urlRoot: '/api/note'
		});

		var NoteList = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				var notes = new Notes();
				var that = this;
				notes.fetch({
					success: function(notes) {
						// console.log(notes.toJSON());
						// https://github.com/wycats/handlebars.js/issues/122
						var json = notes.toJSON();
						var templateFunc = Handlebars.compile(notesTemplate);
						that.$el.html(templateFunc({ 'items': json }));
						$('.top-bar')
							.removeClass('expanded')
							.css('min-height', '');
					}
				});
			}
		});

		var HelloView = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				templateFunc = Handlebars.compile(helloTemplate);
				this.$el.html(templateFunc());
				$('.top-bar')
					.removeClass('expanded')
					.css('min-height', '');
			}
		});

		var NavigationView = Backbone.View.extend({
			el: '#navigation-container',
			render: function(){
				templateFunc = Handlebars.compile(navigationTemplate);
				this.$el.html(templateFunc({ 'navPath' :  'mobi' }));
			}
		});

		var Router = Backbone.Router.extend({
			routes: {
				'': 'home',
				'notes': 'notes'
			}
		});


		var noteList = new NoteList();
		var home = new HelloView();
		var nav = new NavigationView();

		var router = new Router();


		router.on('route:home', function() {
			// nav.render();
			home.render();
		});

		router.on('route:notes', function() {
			console.log("notes route");
			// nav.render();
			noteList.render();
		});

		Backbone.history.start();
		// Backbone.history.start({pushState: true});
		// 
		Zepto(document).foundation();
	};

	console.log('returning from application.js');
	return App;
});



