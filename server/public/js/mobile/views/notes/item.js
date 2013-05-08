define(['text!templates/mobile/notes/item.hbs'], function(template){
		var NoteView = Backbone.View.extend({
			el: '#content-container',

			initialize: function(){
				this.model.on('show', this.render, this);
			},
			render: function(){
				console.log('NoteView#render');
				var json = this.model.toJSON();
				var templateFunc = Handlebars.compile(template);
				this.$el.html(templateFunc( json ));
			}
		});
		return NoteView;
});
