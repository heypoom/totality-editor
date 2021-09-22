export const ReactSample = `
const {useState, useEffect} = React

const Wrapper: React.FC = ({ children }) => {
	const [counter, setCounter] = useState(0)

	useEffect(() => {
		fetch('https://icanhazip.com')
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
