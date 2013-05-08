define(['text!templates/mobile/notes/itemEdit.hbs'], function(template) {


		var NoteEditView = Backbone.View.extend({
			el: '#content-container',

			events: {
				'click #save': 'saveNote'
			},

			initialize: function(){
				this.model.on('edit', this.render, this);
				this.model.on('add', this.render, this);
			},

			saveNote: function(ev){
				var noteDetails = $('form#note').serializeObject();
				this.model.save(noteDetails, {
					success: function(model, response){
						console.log('save successful');
						var route = "notes/" + model.id;
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
				var templateFunc = Handlebars.compile(template);
				this.$el.html(templateFunc( json ));
			}
		});

		return NoteEditView;
});