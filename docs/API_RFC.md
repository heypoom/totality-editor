Totality is the real-time simulation editor, used for Poom's Simulate the Universe project. We want to make simulations as accessible as possible.

# Extension API

Allows you to register a new extension to utilize the totality editor API.

- There should be an extension marketplace, where you can fetch the extension bundle dynamically.

- Extensions should be able to be added and customized directly:

  - In the totality editor UI.

    - The Extension tab should support adding custom editor extensions.

  - When the totality editor is embedded in a React app, or in a MDX markdown document.

    - API inspired by react-live

    ```tsx
    import {
      SortVisualizerExtension,
      DraculaThemeExtension,
    } from '@totality/extensions'

    return (
      <Totality
        extensions={[SortVisualizerExtension, DraculaThemeExtension]}
        code="const a = MyView"
        scope={{MyView}}
        options={options}
      />
    )
    ```

    - Or, specify extensions as a list of extension URLs or keys to fetch from NPM.

    ```tsx
    extensions={['language.typescriptreact', 'theme.dracula']}
    ```

  - When the totality editor is invoked externally as markdown tagged component,
    using magic comments to load or unload extensions.

    ```js
    //!ext editor.vim, language.typescriptreact, core.sort-visualizer, theme.dracula

    Node.of(5)
    ```

  - Within the totality editor code execution itself.

    - Operation should be idempotent; if the extension is already loaded, we skip the registry operation.

  ```ts
  const {Registry} = Totality

  const SortVisualizerExtension = await Registry.fetch(
    'https://unpkg.com/totality-sort-visualizer@1'
  )

  Registry.useRemote('https://unpkg.com/totality-sort-visualizer@1')

  // Register a new extension
  Registry.use(SortVisualizerExtension)

  // Register a new extension with custom configuration
  Registry.use(SortVisualizerExtension, {
    theme: {pivot: '#2d2d30'},
  })

  // Un-register the extension
  Registry.remove('sort-visualizer')
  Registry.remove(SortVisualizerExtension)

  // Access the extension instance.
  Registry.of(SortVisualizerExtension)
  Registry.get('sort-visualizer')
  ```

  - Extension Configuration is globally configured.

    ```ts
    // Modify the extension configuration.
    App.config({
      'editor.fontSize': '',
      'sort-visualizer.theme.pivot': '#2d2d30',
    })
    ```

## Creating an Extension

You can create a Totality extension by creating an extension object.

The following overrideable lifecycle hooks are available:

- Setup: invoked when the extension is registered or enabled.
- Cleanup: invoked when the extension is removed or disabled.

You can use `this.app` to reference the extension API

```ts
const SortVisualizerExtension: Extension = {
  // Invoked when the extension is registered.
  async setup(context) {}

  // Invoked when the extension is unregistered.
  async cleanup(context) {}
}
```

## Totality Event Store

Listen to the global event store to receive updates from the app.

```ts
context.store.on('animate/start', async () => {
  // ...
})

context.store.run('animate/skip', {frame: 10})
```

# Writing custom React components for your extension.

Totality Editor is based on React, so you can write your custom React component
to display in each parts of the editor, similar to Visual Studio Code.

- Add a custom visualizations or renderers using your React component with the _Renderer & Visualization API_: `Renderer.create({component})`

- Add a custom editor control inline in your code editor with the _Editor Control API_: `EditorControl.create({component})`

- Add a knob for people to experiment with different parameters, and tell your stories with the _Knobs API_: `Knobs.create({component})`

# Renderer & Visualization API

You can create and register a renderer, as follows.

Your renderer has access to the app instance,
and therefore the _code runner_ and its context.

You can store additional tracking variables in your class instance.

```ts
const GraphRenderer = Renderer.create({
  component: GraphRendererView,
})

app.useRenderer(GraphRenderer)
```

You can write your renderer as a standard React component.

- You can use the `useTotality` hook to get access to the Totality app class instance, and listen to the changes.
- You may also access the `TotalityContext` React context directly.

```tsx
const GraphRendererView = () => {
  const {app, tracked} = useTotality()

  return <D3 nodes={parse(tracked)} />
}
```

# Editor Control API

To enhance the editing and experimentation experience, you
can add an _Editor Control_ to present custom value controls,
such as editing color values, numeric values, domain-specific values and more: `app.useEditorControl(ColorControl)`

For example, if you're making a visualization GLSL (GL shader language), you might
want to add a slider to change a float variable, right in the editor (similar to thebookofshaders.com)

Editor Controls are show inline in the _Code Editor_ panel.

Again, you writet this a standard React component, and you can use the `useTotality` hook
to interact with the simulation editor.

```ts
const ColorControl = EditorControl.create({
  component: ColorControlView,
})

app.useEditorControl(ColorControl)
```

# Knobs API

Aside from editing the variables directly with the editor control,
an even easier way to let people experiment with your simulation.

Knobs are different than Editor Controls -- Knobs are used to
present user-friendly controls for people to tinker with different
parameters and explore data-driven storytelling, without having to
manually edit the variables in the code editor.

You could use knobs to let people try out different values,
or different presets. You could show different knobs for different stages
of your storytelling or explanation.

In contrast to Editor Controls, Knobs are show in a different panel.

```ts
const SliderKnob = Knob.create({
  component: SliderKnobView,
})

app.useKnob(SliderKnobs)
```

# Code Editor Hooks API

You can use the `editor` instance in the Totality app to get access
to the Monaco Editor instance, so you can alter the code editor's behaviour.

```ts
app.editor.use(setupVimMode)
```

# Panel & Window Manager API

Each extension can add their own panels and windows to the editor, and alter existing panels.

```ts
app.panel.add({title: 'Knobs Panel'})
```

# Commands and Shortcuts API

Each extension can register their commands to the Command Palette, and add global shortcuts to the editor.

# Runner API

Each extension have access to the `Runner` instances, which is used to
evaluate TypeScript code. It handles aborting and cleaning up tasks,
tracking variables of interest, JS sandboxing with Realms,
managing concurrent runs, adding variable to global scope and more.

You can inject variables and functions into the global scope using the
Runnel API, so you can add your own tracking functions.

Note that you must also add your type declarations with `declare const` separately,
in order to make them available to the TypeScript editor.

```ts
app.runner.realm.global.track = () => {}
```

# Change Tracker API

This is a lightweight abstraction to track changes in your code, in order to visualize them.

# Tree Parser and Traversal API

Used for parsing and traversing JSON trees and ASTs, and
mapping them to visualizations to visualize different parts of the tree.

For example, if you have a JSON object `{files: File[], transforms: [0, 0, -1]}`, you might
show the files as a File Explorer to download the file, while visualizing the 3D
transforms. This is very useful in visualizing large state tree.
