define(
	[
	'handlebars',
	'foundation',
	'js/mobile/views/notes/list',
	'js/mobile/views/notes/item',
	'js/mobile/views/notes/itemEdit',
	'js/mobile/views/profiles/item',
	'foundationtopbar'
	],
	function(
		Handlebars,
		Foundation,
		NoteListView,
		NoteView,
		NoteEditView,
		ProfileView)
	{

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

	var Router = Backbone.Router.extend({
		routes: {
			'': 'notes',
			'notes/add': 'addNote',
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

	this.router.on('route:addNote', function() {
		console.log("add note event handler");
		var note, noteAddView;
		note = new Note();
		noteAddView = new NoteEditView( {model: note });
		note.trigger('add');
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



