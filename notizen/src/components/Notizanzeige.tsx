import React from 'react';
import { NotizanzeigeProps, iNote } from '../interfaces';
import { Guid } from 'guid-typescript';
import Note from './Note';
import { MessageBar, MessageBarType, ActionButton, Spinner, SpinnerSize, SpinnerType } from '@fluentui/react';
import { NoteFunctions } from './../functions';
import Notizbearbeitung from './Notizbearbeitung';

interface NotizanzeigeState {
  notes: iNote[];
  newNote: iNote;
  loading: boolean;
}

export default class Notizanzeige extends React.Component<NotizanzeigeProps, NotizanzeigeState> {

  constructor(props: NotizanzeigeProps) {
    super(props);
    this.state = {
      notes: [],
      newNote: null,
      loading: true
    };
  }

  public render() {
    return (
      <>
        <ActionButton iconProps={{ iconName: "Add" }} text={"Notiz hinzufügen"} onClick={this.addNote.bind(this)} />
        {this.state.newNote !== null &&
          <Notizbearbeitung Note={this.state.newNote} onDelete={this.discardNewNote.bind(this)} onDiscard={this.discardNewNote.bind(this)} onSave={this.appendNote.bind(this)} />
        }
        {this.state.notes.length > 0 && !this.state.loading &&
          this.state.notes.map((value: iNote, index: number, array: iNote[]) => {
            return (
              <div key={value.guid}>
                <Note Note={value} onSave={this.saveNote.bind(this, index)} onDelete={this.deleteNote.bind(this, index)} />
                <hr />
              </div>
            );
          })
        }
        {this.state.notes.length === 0 && !this.state.loading &&
          <MessageBar messageBarType={MessageBarType.info}>Du hast keine Notizen</MessageBar>
        }
        {this.state.loading &&
          <Spinner size={SpinnerSize.large} type={SpinnerType.large} label={"Lade Notizen"}></Spinner>
        }
      </>
    );
  }



  private saveNote(index: number, newNote: iNote) {
    let newNotes: iNote[] = this.state.notes;
    newNotes[index] = newNote;
    this.setState({ notes: newNotes });
    NoteFunctions.saveNotes(newNotes);
  }

  private deleteNote(index: number) {
    let newNotes: iNote[] = this.state.notes;
    newNotes.splice(index, 1);
    this.setState({ notes: newNotes });
    NoteFunctions.saveNotes(newNotes);
  }

  private addNote() {
    this.setState({ newNote: { body: "", title: "", guid: Guid.create().toString() } });
  }

  private appendNote(newNote: iNote) {
    let newNotes: iNote[] = this.state.notes;
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes, newNote: null });
    NoteFunctions.saveNotes(newNotes);
  }

  private discardNewNote() {
    this.setState({ newNote: null });
  }

  public componentDidMount() {
    NoteFunctions.getNotes()
      .then((value: iNote[]) => {
        this.setState({ notes: value, loading: false });
      })
  }


}
