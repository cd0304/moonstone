/**
	_moon.Dialog_ is a <a href="#moon.Popup">moon.Popup</a> with a title, a
	message, and an area for additional controls.
*/
enyo.kind({
	name: "moon.Dialog",
	kind: moon.Popup,
	classes: "moon-dialog",
	published: {
		title: "",
		subTitle: "",
		message: ""
	},
	tools: [
		{
			layoutKind: "FittableColumnsLayout",
			components: [
				{fit: true, components: [
					{name: "title", classes: "moon-header-font moon-popup-header-text moon-dialog-title"},
					{name: "subTitle", classes: "moon-dialog-sub-title"}
				]},
				{name: "client", classes: "moon-dialog-client"}
			]
		},
		{kind: "moon.Divider", classes: "moon-dialog-divider"},
		{name: "message", kind:"moon.BodyText", classes: "moon-dialog-content"}
	],
	create: function() {
		this.inherited(arguments);
		this.titleChanged();
		this.subTitleChanged();
		this.messageChanged();
	},
	titleChanged: function() {
		this.$.title.setContent(this.title);
	},
	subTitleChanged: function() {
		this.$.subTitle.setContent(this.subTitle);
	},
	messageChanged: function() {
		this.$.message.setContent(this.message);
	}
});