/**
	_moon.Button_ is an <a href="#enyo.Button">enyo.Button</a> with Moonstone
	styling applied. The color of the button may be customized by specifying a
	background color.

	For more information, see the documentation on
	<a href='https://github.com/enyojs/enyo/wiki/Buttons'>Buttons</a> in the
	Enyo Developer Guide.
*/

enyo.kind({
	name: 'moon.Button',
	kind: 'enyo.Button',
	mixins: ["moon.MarqueeSupport"],
	published: {
		/**
			A parameter indicating the size of the button.
			If true, the diameter of this button is 60px.
			However, the button's tap target still has a diameter of 78px, so there is
			invisible DOM that wraps the small button to provide the larger tap zone.
		*/
		small: false,
		/**
			A parameter indicating the min-Width of the button.
			If true, the min-width shoule be set 180px wide, (The small button is set 130px)
			When false, thie min-width should be the current @moon-button-height (forcing it no smaller than a circle)
		*/
		minWidth: true
	},
	classes: 'moon-large-button-text moon-button enyo-unselectable',
	spotlight: true,
	handlers: {
		//* _onSpotlightSelect_ simulates _mousedown_.
		onSpotlightSelect	: 'depress',
		//* _onSpotlightKeyUp_ simulates _mouseup_.
		onSpotlightKeyUp	: 'undepress',
		//* Also make sure we remove the pressed class if focus is removed from
		//* this item before it receives a keyup.
		onSpotlightBlur		: 'undepress',
		//* _onSpotlightFocus_ bubble _requestScrollIntoView_ event
		onSpotlightFocused	: "spotFocused"
	},
	//* On creation, updates based on value of _this.small_.
	initComponents: function() {
		if (!(this.components && this.components.length > 0)) {
			this.createComponent({name: "client", kind:"moon.MarqueeText", isChrome: true});
		}
		this.smallChanged();
		this.minWidthChanged();
		this.inherited(arguments);
	},
	//* Adds _pressed_ CSS class.
	depress: function() {
		this.addClass('pressed');
	},
	//* Bubble _requestScrollIntoView_ event
	spotFocused: function(inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble("onRequestScrollIntoView", {side: "top"});
		}
	},
	//* Removes _pressed_ CSS class.
	undepress: function() {
		this.removeClass('pressed');
	},
	//* If _this.small_ is true, adds a child that increases the tap area.
	smallChanged: function() {
		if (this.$.tapArea) {
			this.$.tapArea.destroy();
		}

		if (this.small) {
			this.addClass('small');
			this.addClass('moon-small-button-text');
			var ta = this.createComponent({name: "tapArea", classes: "small-button-tap-area", isChrome: true});
			if (this.generated) {
				ta.render();
			}
		} else {
			this.removeClass('small');
			this.removeClass('moon-small-button-text');
		}
		this.contentChanged();
	},
	//* Override to handle potential child components.
	contentChanged: function() {
		if (this.$.client) {
			this.$.client.setContent(this.getContent());
		} else {
			this.inherited(arguments);
		}
	},
	minWidthChanged: function() {
		if (this.minWidth) {
			this.addClass('min-width');
		} else {
			this.removeClass('min-width');
		}
	}
});
