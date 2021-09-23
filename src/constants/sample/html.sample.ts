export const HTMLSample = `
<h1 style="font-size: 40px; text-align: center;">
	Hello there!
</h1>

<div class="container">
	<button>0</button>
</div>

<style>
  body {
		background: #ff7979;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

	button {
  	color: white;
  	cursor: pointer;
  	user-select: none;
  	padding: 5px 20px;
  	font-size: 30px;
  	webkit-appearance: none;
  	border: none;
		box-shadow: rgb(0 0 0 / 55%) 0px 20px 68px;
		background: #e056fd;
		outline: none;
	}

	button:focus, button:active {
		border-top: 3px solid #21222d;
	}

  h1 {
    font-weight: 500;
    color: #f9ca24;
  }

  .container {
    display: flex;
    justify-content: center;
  }
</style>

<script>
  let counter = 0

  const body = document.querySelector('body')
  const b = document.querySelector('button')
  
  b.addEventListener('click', () => {
    counter++

    b.style.background = counter % 2 === 0 ? "#e056fd" : "#ff7979"
    body.style.background = counter % 2 === 0 ? "#ff7979" : "#e056fd"
		b.style.boxShadow = \`\${b.style.background} 5px 32px 68px 12px\`
    b.textContent = counter
  })
</script>
`.trimStart()
