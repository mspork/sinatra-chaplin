
define(
	['backbone',
	'handlebars',
	'zepto',
	'foundation',
	'text!templates/mobile/profile.hbs',
	'text!templates/mobile/notes.hbs',
	'text!templates/mobile/note.hbs',
	'text!templates/mobile/noteEdit.hbs',
	'foundationtopbar'
	],
	function(
		Backbone, Handlebars,
		Zepto, Foundation,
		profileTemplate, notesTemplate, noteTemplate, noteEditTemplate) {

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};


		var Notes = Backbone.Collection.extend({
			url: '/api/notes'
		});

		var Note = Backbone.Model.extend({
			urlRoot: '/api/notes'
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
				console.log('NoteView#render');
				var json = this.model.toJSON();
				var templateFunc = Handlebars.compile(noteTemplate);
				this.$el.html(templateFunc( json ));
			}
		});

		var NoteEditView = Backbone.View.extend({
			el: '#content-container',

			events: {
				'click #save': 'saveUser'
			},

			initialize: function(){
				this.model.on('edit', this.render, this);
			},

			saveUser: function(ev){
				var noteDetails = $('form#note').serializeObject();
				// noteDetails['id'] = this.model.id;
				var note = new Note( {'id': this.model.id} );
				note.save(noteDetails, {
					success: function(note, response){
						console.log('save successful');
						var route = "notes/" + note.id;
						// TODO: is there anyway we can get rid of using window global
						// For e.g. something like this? (tried it and did not work)
						// note.trigger('show');						
						window.app.router.navigate(route, {trigger: true});
					},
					error: function(model, xhr, options){
						console.log('error on save');
						console.log(xhr);
					}
				});
				return false;
			},

			render: function(){
				console.log('NoteEditView#render');
				var json = this.model.toJSON();
				var templateFunc = Handlebars.compile(noteEditTemplate);
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
				'notes/:id/edit': 'editNote',
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
				note = new Note( {id: id});
				note.fetch({
					success: function() {
							console.log(note);
							noteView = new NoteView( {model: note });
							note.trigger('show');
					}
				});
			}
		});

		this.router.on('route:editNote', function(id) {
			console.log("edit id: " + id);
			var note, noteEditView;
			// TODO: clean this up - factor out commonalities
			if(self.collections.length > 0){
				note = self.collections.notes.get(id);
				console.log('Note already in collection: ' + note);
				noteEditView = new NoteEditView( {model: note });
				note.trigger('edit');
			} else {
				note = new Note( {id: id});
				note.fetch({
					success: function() {
							console.log('Note had to be retrieved individually' + note);
							noteEditView = new NoteEditView( {model: note });
							note.trigger('edit');
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



