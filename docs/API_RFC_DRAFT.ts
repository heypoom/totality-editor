interface IApp {
  // Extension Registry
  registry: ExtensionRegistry

  // Global Event Store
  store: Store

  // Runner (JS Code Evaluator)
  runner: Runner

  // Editor Manager class
  editor: EditorManager

  // Manages the panels and windows.
  panel: PanelManager

  useKnob(knob: KnobConfig): void
  useRenderer(renderer: RendererConfig): void
  useEditorWidget(widget: EditorWidgetConfig): void

  create(): IApp
}

class Renderer {
  create() {}
}

declare const App: IApp
const app = App.create()

const GraphRenderer: RendererConfig = {component}
app.useRenderer(GraphRenderer)

const SliderKnob: KnobConfig = {component}
app.useKnob(SliderKnob)

const ColorControl: EditorControlConfig = {component}
app.useEditorWidget(ColorControl)

const setupVimMode = ({monaco, editor}: IEditorContext) => null
app.editor.use(setupVimMode)
