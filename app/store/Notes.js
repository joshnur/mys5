Ext.define('mysencha5.store.Notes', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.LocalStorage',
    config: {
    	model: 'mysencha5.model.Note',
    	proxy: {
    		type: 'localstorage',
    		id: 'notes-app-store'
    	},
    	sorters: [{
    		property: 'dateCreated', direction: 'DESC'
    	}]
        //autoLoad: true, 
    }
});