export const ReactSample = `
const render = (element: React.ReactNode) => track('RootNode', element)

const {useState, useEffect} = React

const Wrapper: React.FC = ({ children }) => {
	const [counter, setCounter] = useState(0)

	useEffect(() => {
		fetch('http://localhost:3000')
			.then(x => x.text())
			.then(x => setCounter(x.length))
	}, [])

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
