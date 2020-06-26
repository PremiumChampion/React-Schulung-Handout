import React from 'react';
import { NotizbearbeitungProps } from '../interfaces';
import { Dialog, TextField, DialogType, PrimaryButton, DialogFooter, DefaultButton } from '@fluentui/react';

interface NotizbearbeitungState {
  Title: string;
  Body: string;
}

export default class Notizbearbeitung extends React.Component<NotizbearbeitungProps, NotizbearbeitungState> {

  constructor(props: NotizbearbeitungProps) {
    super(props);
    this.state = {
      Title: this.props.Note.title,
      Body: this.props.Note.body
    }
  }

  public render() {
    return (
      <>
        <Dialog
          hidden={false}
          onDismiss={this.saveNote.bind(this)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Bearbeiten',
            showCloseButton: true,
            onDismiss: this.props.onDiscard.bind(this)
          }}>
          <TextField
            label={"Titel eingeben:"}
            value={this.state.Title}
            onChange={this.titleChanged.bind(this)}
          />
          <TextField
            label={"Body eingeben:"}
            value={this.state.Body}
            multiline
            autoAdjustHeight 
            resizable={false}
            onChange={this.bodyChanged.bind(this)}
          />
          <DialogFooter>
            <PrimaryButton onClick={this.saveNote.bind(this)} text="Speichern" />
            <DefaultButton onClick={this.props.onDelete.bind(this)} text="Löschen" />
          </DialogFooter>
        </Dialog>
      </>
    );
  }


  private saveNote(event: React.MouseEvent< HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | HTMLSpanElement, MouseEvent>) {
    this.props.onSave({ title: this.state.Title, body: this.state.Body, guid: this.props.Note.guid });
  }

  private titleChanged(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newTitle: string) {
    this.setState({ Title: newTitle });
  }

  private bodyChanged(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newBody: string) {
    this.setState({ Body: newBody });
  }

}
