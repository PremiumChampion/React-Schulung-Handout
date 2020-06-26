export interface NoteProps {
    Note: iNote;
    onSave: (newNote: iNote) => void;
    onDelete: () => void;
}

export interface NotizanzeigeProps {

}

export interface NotizbearbeitungProps {
    Note: iNote;
    onSave: (newNote: iNote) => void;
    onDelete: () => void;
    onDiscard: () => void;
}

export interface iNote {
    title: string;
    body: string;
    guid: string;
}