
// import Hashmap from 'hashmap';


export default class Notebook {
  constructor(name = 'No name') {
    this.notes = []
    this.name = name

    let firstNote = new Note('My first note', 'I can delete this by swiping left')
    this.notes.push(firstNote)
  }

  addNote(title, text) {
    this.notes.unshift(new Note(title, text));
  }

  rm(note) {
    let i = this.notes.indexOf(note);
    this.notes.splice(i, 1);
  }

  importNotebook(notebook) {
    console.log(notebook);
    this.notes = notebook.notes;
    this.name = notebook.name;
    console.log('IMPORTED:', this.notes, this.name);
  }
  exportNotebook() {
    notebook = {
      notes: this.notes,
      name: this.name
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
  }
}
