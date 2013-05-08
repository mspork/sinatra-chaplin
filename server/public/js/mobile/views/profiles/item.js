define(['text!templates/mobile/profiles/item.hbs'], function(template){
		var ProfileView = Backbone.View.extend({
			el: '#content-container',
			render: function(){
				templateFunc = Handlebars.compile(template);
				this.$el.html(templateFunc());
				$('.top-bar')
					.removeClass('expanded')
					.css('min-height', '');
			}
		});
		return ProfileView;
});
