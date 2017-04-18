
// import Hashmap from 'hashmap';


export default class Notebook {
	constructor(name = 'No name') {
		this.notes = [];
		this.name = name;

		let firstNote = new Note('My first note', 'I can delete this by swiping left')
		this.notes.push(firstNote)
		// let firstDeck = new Deck('All notes')
	}

	addNote(title, text) {
		this.notes.unshift(new Note(title, text));
	}

	rm(note) {
		let i = this.notes.indexOf(note);
		this.notes.splice(i, 1);
	}

	importNotebook(notebook) {

		//this is a hack
		notebook.notes.forEach((note, index, arr) => {
			if (!note.id) {
				note.id = arr.length - index;
			}
		});

		this.notes = notebook.notes;
		this.name = notebook.name;
		// console.log('IMPORTED:', this.notes, this.name);
	}

	exportNotebook() {
		notebook = {
			notes: this.notes,
			name: this.name,
		}
		return notebook;
	}

	search(query) {
		matches = [];
		query = query.toLowerCase()
		this.notes.forEach((note) => {
			if(note.title.toLowerCase().indexOf(query) != -1)
				matches.push(note);
			else if (note.text.toLowerCase().indexOf(query) != -1)
				matches.push(note);
		});
		return(matches);
	}
}

export class Note {
	constructor(title = '', text = '') {
		this.title = title;
		this.text = text;
		this.id = Date.now();
	}
}

export class Deck {
	constructor(name = '', notes = []) {
		this.name = name;
		this.notes = notes;
	}
	
	addNote(note) {
		this.notes.push(note);
	}

	exportDeck() {
		deck = {
			name: this.name,
			notes: this.notes
		};
		return deck;
	}

	importDeck(deck) {
		this.name = deck.name,
		this.notes = deck.notes
	}
}