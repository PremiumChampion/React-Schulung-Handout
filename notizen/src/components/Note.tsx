import React from 'react';
import { NoteProps, iNote } from '../interfaces';
import { ActionButton } from '@fluentui/react';
import Notizbearbeitung from './Notizbearbeitung';

interface NoteState {
  EditModeOpen: boolean;
 }

export default class Note extends React.Component<NoteProps, NoteState> {

  constructor(props: NoteProps) {
    super(props);
    this.state = {
      EditModeOpen: false
    };
  }

  public render() {
    return (
      <>
        <p>{this.props.Note.title}</p>
        <pre>{this.props.Note.body}</pre>
        <ActionButton text={`Bearbeiten`} iconProps={{ iconName: "Edit" }} onClick={this.toggleEditMode.bind(this)} />
        <ActionButton text={`Löschen`} iconProps={{ iconName: "Delete" }} onClick={this.props.onDelete} />
        {this.state.EditModeOpen &&
          <Notizbearbeitung Note={this.props.Note} onSave={this.saveNote.bind(this)} onDelete={this.props.onDelete} onDiscard={this.toggleEditMode.bind(this)} />
        }
      </>
    );
  }

  private toggleEditMode() {
    this.setState({ EditModeOpen: !this.state.EditModeOpen });
  }

  public saveNote(newNote: iNote) {
    this.toggleEditMode();
    this.props.onSave(newNote)
  }

}
