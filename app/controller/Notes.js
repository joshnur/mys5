//Notes.js - Testing Git integration - #2
Ext.define("mysencha5.controller.Notes", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			notesListContainer: 'noteslistcontainer',
			noteEditor: 'noteeditor'
		},
		control: {
			notesListContainer: {
				newNoteCommand: "onNewNoteCommand",
        editNoteCommand: "onEditNoteCommand"
			},
			noteEditor:{saveNoteCommand: 'onSaveNoteCommand'}
		}
	},

	onSaveNoteCommand: function () {

    console.log("onSaveNoteCommand");

    var noteEditor = this.getNoteEditor();
    var currentNote = noteEditor.getRecord();
    var newValues = noteEditor.getValues();

    // Update the current note's fields with form values.
    currentNote.set("title", newValues.title);
    currentNote.set("narrative", newValues.narrative);

    var errors = currentNote.validate();

    if (!errors.isValid()) {
        Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
        currentNote.reject();
        return;
    }

    var notesStore = Ext.getStore("Notes");

    if (null == notesStore.findRecord('id', currentNote.data.id)) {
        notesStore.add(currentNote);
    }

    notesStore.sync();

    notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

    this.activateNotesList();
	},

	onNewNoteCommand: function () {
		console.log("onNewNoteCommand");

		var now = new Date();
    var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

    var newNote = Ext.create("mysencha5.model.Note", {
        id: noteId,
        dateCreated: now,
        title: "",
        narrative: ""
    });

    this.activateNoteEditor(newNote);
	},

    getRandomInt: function (min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
		},

	activateNoteEditor: function (record) {

    var noteEditor = this.getNoteEditor();
    noteEditor.setRecord(record); // load() is deprecated.
    Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
	},

	activateNotesList: function () {
	    Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
	},

	slideLeftTransition: { type: 'slide', direction: 'left' },

slideRightTransition: { type: 'slide', direction: 'right' },

    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);

    },

    // Base Class functions.

    launch: function () {

        this.callParent(arguments);
        Ext.getStore("Notes").load();
        console.log("launch");

    },

   init: function () {

        this.callParent(arguments);

        console.log("init");

    }

});