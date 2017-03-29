
// import Hashmap from 'hashmap';


export default class Notebook {
  constructor(name = 'No name') {
    this.notes = []
    this.name = name

    let firstNote = new Note('My first note', 'I can delete this by swiping left')
    this.notes.push(firstNote)
  }

  addNote(title, text) {
    this.notes.push(new Note(title, text));
  }

  rm(note) {
    let i = this.notes.indexOf(note);
    this.notes.splice(i, 1);
  }

  search(query) {
    matches = [];
    this.notes.forEach((note) => {
      if(note.title.indexOf(query) != -1)
        matches.push(note);
      else if (note.text.indexOf(query) != -1)
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
