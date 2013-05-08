
define(
	['backbone',
	'handlebars',
	'zepto',
	'foundation',
	'foundationtopbar',
	'text!templates/mobile/profile.hbs',
	'text!templates/mobile/notes.hbs',
	'text!templates/mobile/note.hbs'
	],
	function(
		Backbone, Handlebars,
		Zepto, Foundation, FoundationTopbar,
		profileTemplate, notesTemplate, noteTemplate) {

		var Notes = Backbone.Collection.extend({
			url: '/api/notes'
		});

		var Note = Backbone.Model.extend({
			urlRoot: '/api/note'
		});

		var NoteListView = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				console.log("NoteListView#render()");
				var self = this;
				var json = this.collection.toJSON();
				var templateFunc = Handlebars.compile(notesTemplate);
				self.$el.html(templateFunc({ 'items': json }));
				$('.top-bar')
					.removeClass('expanded')
					.css('min-height', '');
			}
		});

		var NoteView = Backbone.View.extend({
			el: '#content-container',

			initialize: function(){
				this.model.on('show', this.render, this);
			},
			render: function(){
				var json = this.model.toJSON();
				var templateFunc = Handlebars.compile(noteTemplate);
				this.$el.html(templateFunc( json ));
			}
		});

		var ProfileView = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				templateFunc = Handlebars.compile(profileTemplate);
				this.$el.html(templateFunc());
				$('.top-bar')
					.removeClass('expanded')
					.css('min-height', '');
			}
		});

		var Router = Backbone.Router.extend({
			routes: {
				'': 'notes',
				'notes': 'notes',
				'notes/:id': 'openNote',
				'profile': 'profile'
			}
		});

	var App = function() {
		this.collections.notes = new Notes();
		this.views.noteListView = new NoteListView( { collection: this.collections.notes} );
		this.views.profileView = new ProfileView();
		this.router = new Router();

		var self = this;

		this.router.on('route:profile', function() {
			self.views.profileView.render();
		});

		this.router.on('route:notes', function() {
			console.log("notes route");
			self.collections.notes.fetch({
				success: function() {
						self.views.noteListView.render();
				}
			});
		});

		this.router.on('route:openNote', function(id) {
			console.log("we have id: " + id);
			var note, noteView;
			// TODO: clean this up - factor out commonalities
			if(self.collections.length > 0){
				note = self.collections.notes.get(id);
				console.log(note);
				noteView = new NoteView( {model: note });
				note.trigger('show');
			} else {
				self.collections.notes.fetch({
					success: function() {
							note = self.collections.notes.get(id);
							console.log(note);
							noteView = new NoteView( {model: note });
							note.trigger('show');
					}
				});
			}
		});

	};

	App.prototype = {
    views: {},
    collections: {},
    init: function() {
			Backbone.history.start();
			// Backbone.history.start({pushState: true});
			Zepto(document).foundation();
    }
  };
	console.log('returning from application.js');
	return App;
});



