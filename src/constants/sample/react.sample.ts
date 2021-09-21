export const ReactSample = `
const render = (element: React.ReactNode) => track('RootNode', element)

const {useState} = React

const Wrapper: React.FC = ({ children }) => {
	const [counter, setCounter] = useState(0)

	return (
		<div style={{width: '100%', padding: '2rem'}}>
			<button onClick={() => setCounter(counter + 1)}>{counter}</button>

			{children}
		</div>
	)
}

const Title = () => (
	<h3 style={{ color: '#badc58', fontSize: '24px', fontWeight: 'bold' }}>
		Hello, 🏖!
	</h3>
)

render(
	<Wrapper>
		<Title />
	</Wrapper>
)
`.trim()
