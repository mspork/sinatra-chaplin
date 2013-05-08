define(['text!templates/mobile/notes/list.hbs'], function(template) {
		var NoteListView = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				console.log("NoteListView#render()");
				var self = this;
				var json = this.collection.toJSON();
				var templateFunc = Handlebars.compile(template);
				self.$el.html(templateFunc({ 'items': json }));
				$('.top-bar')
					.removeClass('expanded')
					.css('min-height', '');
			}
		});
		return NoteListView;
});