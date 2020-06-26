# React-Schulung

## A. Einführung

### 1\. Erstellen des Projekts ([Link](https://create-react-app.dev/docs/adding-typescript/))

```powershell
npx create-react-app {{Unser Projektname}} --template typescript
```

### 2\. Zurechtfinden im Projekt

- Was wurde erstellt?

### 3\. Erstmaliges starten des Projekts

```powershell
npm run start
```

### 4\. Allgemeine Fragen

#### Was ist ein React-Komponente?

- Eine React-Komponente ist im Grunde nur eine Funktion, welche HTML zurückgibt.

```tsx
function App() {
      // Hier steht natives HTML oder eine andere React-Komponente
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>Edit <code>src/App.tsx</code> and save to reload.</p>
                  <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Learn React
                  </a>
              </header>
          </div>
      );
  }

  export default App;
```

### Nutzen von Klassen als React-Komponente

```tsx
class Hello extends React.Component<Props, object> {
    public render() {
        const { name, enthusiasmLevel = 1 } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">
                <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        );
    }
}
```

#### Was sind Props?

- Props sind statische Informationen/Eigenschaften in einer Komponente, wie z.B. eine Refferenz zu einer Globalen Funktions-Klasse

- Props können in der Komponente während ihrem Lebenszyklus nicht verändert werden.

#### Was ist der State?

- State sind dynamische Informationen, welche sich während ihrem Lebenszyklus noch verändern können.

- Eine Veränderung am State sorgt dafür, dass sich die Komponente erneut rendert (nur die Teile, welche sich verändert haben).

--------------------------------------------------------------------------------

## B. Unser Projekt

Erstellen einer App, welche uns erlaubt Notizen zu speichern, bearbeiten und zu löschen.

So ähnlich soll die App am besten zum Schluss aussehen:

### 1\. Konzeption

- Wie soll unsere App aussehen?
- Wie sieht die Nutzerführung aus?

### 2\. In welche Teile können wir unsere App unterteilen?

- Welche [Fluent-UI-Controls](https://developer.microsoft.com/en-us/fluentui#/controls/web) können wir verwenden, um diese Funktion zu erzielen?

  - Action Button
  - Panel
  - Modal
  - Dialog
  - TextField
  - Icons
  - Buttons
  - Spinner


### 3\. Installieren der Abhängigkeiten

- Fluent-UI ([Link](https://www.npmjs.com/package/@fluentui/react))

```powershell
npm install @fluentui/react --save
```

- JavaScript Cookie ([)Link](https://www.npmjs.com/package/js-cookie))

```powershell
npm i js-cookie @types/js-cookie --save
```

- Guid TypeScript ([Link](https://www.npmjs.com/package/guid-typescript))

```powershell
npm i guid-typescript --save
```

### 4\. Wie erstelle ich mir meine eigene React-Komponente

```tsx
class Name_der_Komponente extends React.Component<Eigenschafts_Interface_der_Komponente, State_Interface_der_Komponente> {

    construktor(props: Eigenschafts_Interface_der_Komponente){
        super(props);
        // Weiterer Setup und erstmaliges setzen des States
    }

    // Rendert die Komponente
    public render() {
        return (
        <div></div>
        );
    }
}
```

### 5\. Wo und Wie wird die Komponente gerendert?

- Die Komponente wird in der index.tsx erstmalig gerendert. (Dies kann auch eine andere TS-Datei sein.)
- Wie wird die Komponente gerendert?

  ```tsx
  ReactDOM.render(<Name_der_Komponente />, document.getElementById('root'));
  ```

### 6\. Nutzen von Properties

Beim Rendern einer Komponente können verschiedene Properties/Eigenschaften angegeben werden, diese entsprechen im größten Sinne den Attributen eines HTML-Tags. Ein großer Unterschied besteht darin, dass dort z.B. auch Methoden oder andere Datentypen übergeben werden können.

Es ist immer empfohlen eine strikte Typisierung einzuhalten, um unnötigen Bugs aus dem Weg zu gehen.

Properties können durch `this.props.EIGENSCHFTSNAME` abgerufen werden.

!! Properties können nicht in der Komponente verändert werden, sondern müssen von einer _Parent-Komponente_ verändert werden.

Wann sind Properties hilfreich und wann nicht?

### 7\. Nutzen des States

Um Daten _Live_ zu ändern (z.B. bei einer Eingabe eines Users) wird häufig der sogenannte State verwendet. Dieser erlaubt es nur veränderte Teile neu zu rendern, jedoch auch nicht zu oft, damit die Performance nicht beeinträchtigt wird.

Der State kann durch `this.state.EIGENSCHFTSNAME` abgerufen werden.

`this.state` ist eine Konstante und kann daher nicht mit `this.state = DEIN_NEUER_STATE;` verändert werden. Um den State zu verändern rufen wir die Funktion `this.setState({EIGENSCHFTSNAME: NEUER EIGENSCHFTSWERT});` auf.

Dabei können wir sowohl nur eine Eigenschaft als auch mehrere Eigenschaften geichzeitig verändern.

--------------------------------------------------------------------------------

## C. Usefull Tipps

### 1\. _"Mappen"_ von Arrays

Um z.B. eine Liste mit verschiedenen Items zu rendern, kann man in einer Funktion ein Array _mappen_.

Wichtig danei ist, dass das Element, was zurückgegeben wird ein **key-Attribut** besitzt, da React ansonsten das falsche Element erneut rendert, wenn z.B. ein Element am Anfang hinzukommt. Dabei ist es auch nicht empfohlen, den Index als key zu wählen, da dieser nicht bei jedem Element eindeutig ist.

```tsx
public render() {
    let items: string[] = ["Apfel", "Banane", "Kiwi", "Orange"];
    return (
        <ul>
            {
                items.map((item: string, index: number, array: typeof string[])=>{
                    return (
                        <li key={SOME_UNIKE_ITEM_PROPERTY_OR_GUID}>{item}</li>
                    );
                })
            }
        </ul>
    );
}
```

Expected output:

```html
<ul><li>Apfel</li><li>Banane</li><li>Kiwi</li><li>Orange</li></ul>
```

### 2\. Konditionales Rendern von Komponenten

Wenn man in einer Komponente Teile nur rendern möchte, wenn diese eine bestimmt Bedingung erfüllen, z.B. Wenn ein Textfeld nicht leer ist.

Damit folgendes Element nicht gerendert wird, kann die folgende Struktur verwedet werden:

```tsx
public render() {
    return (
        <div>
            {true &&
                <p>Dieser Paragraph wird angezeigt</p>
            }
            {false &&
                <p>Dieser Paragraph wird nicht angezeigt</p>
            }
        </div>
    );
}
```

Diese Bedingungen können dann auch verknüpft werden.

```tsx
public render() {
    let name: string = "Dein Name";
    return (
        <div>
            {name.length > 0 && name.length < 10 &&
                <p>Dein Name ist {name}</p>
            }
            {name.length == 0 || name.length > 10 &&
                <div>Der Name {name} ist leer oder zu lang.</div>
            }
        </div>
    );
}
```

### 3\. Nützliche Funktionen

#### componentDidMount()

Um eine bestimmte Aktion auszuführen, wenn die Komponente auf der Seite platziert wurde (z.B. Daten aggregieren) kann die Methode `componentDidMount()` verwendet werden. Darin kan dann `this.setState({});` verwendet werden, um ein erneutes Rendern zu triggern und die Komponente zu verändern.

```tsx
/**
 * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
 */
componentDidMount?(): void;
```

#### shouldComponentUpdate()

Um eine das erneute Rendern zu unterdrücken, z.B. um ein Focus Event beizubehallten, kann die Methode `shouldComponentUpdate()` verwendet werden diese gibt dann einen Boolean (true/false) zurück.

- true = Komponente soll erneut gerendert werden
- flase = Komponente soll nicht erneut gerendert werden

Die Methode hat drei Parameter:

1. nextProps

    - Enthalten die neuen Properties / Eigenschaften.
    - Können mit `this.props` verglichen werden.

2. nextState

    - Der neue State, falls die Methode durch `this.setState({});` getriggert wurde.
    - Kann mit `this.state` verglichen werden um zu entscheiden, ob die Komponente ein Update erhalten sollte.

3. nextContext

    - Wird global verwendet um die Eigenschaften nicht durch den gesamten Komponenten Aufbau zu schleifen.

```tsx
/**
 * Called to determine whether the change in props and state should trigger a re-render.
 *
 * `Component` always returns true.
 * `PureComponent` implements a shallow comparison on props and state and returns true if any
 * props or states have changed.
 *
 * If false is returned, `Component#render`, `componentWillUpdate`
 * and `componentDidUpdate` will not be called.
 */
shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
```

#### componentWillUnmount()

Wird die Komponente entfernt, können hier notwendige Aufräumarbeiten angestoßen werden, z.B. ein GET/POST/PUT Request abgebrochen oder ein Timeout / Intervall gecleared.

```tsx
/**
 * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
 * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
 */
componentWillUnmount?(): void;
```

#### componentDidCatch()

Um einen Fehler beim Rendern abzufangen wird die Methode `componentDidCatch()` implementiert.

Fehler können z.B. sein, dass eine Variable `undefined` oder `null` ist.

Der Übergabeparameter `error: Error` enthält den Stack des Fehlers.

Der Übergabeparameter `errorInfo: ErrorInfo` enthät eine Property Namens `componentStack`, welche erfasst, welche Komponente die Ausnahme enthielt sowie Ihren callStack.

Hier könnte z.B. dem Nutzer eine Nachricht angezeigt werden, welcher Fehler aufgetreten ist, und wie dieser behoben werden könnte oder die Eigenschaften auf Fehler überprüft und die Komponente dann erneut gerendert werden.

```tsx
/**
 * Catches exceptions generated in descendant components. Unhandled exceptions will cause
 * the entire component tree to unmount.
 */
componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
```

--------------------------------------------------------------------------------
