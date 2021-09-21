export const ReactSample = `
const render = (element: React.ReactNode) => track('RootNode', element)

const Wrapper: React.FC = ({ children }) => (
	<div style={{
		background: 'papayawhip',
		width: '100%',
		padding: '2rem'
	}}>
		{children}
	</div>
)

const Title = () => (
	<h3 style={{ color: 'palevioletred', fontSize: '24px', fontWeight: 'bold' }}>
		Hello, 🏖!
	</h3>
)

render(
	<Wrapper>
		<Title />
	</Wrapper>
)
`.trim()
