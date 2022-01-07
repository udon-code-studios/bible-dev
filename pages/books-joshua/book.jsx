export default function Book (props) {
	return (
		<div className = 'bg-red-600 p-4 mx-1 mt-2 text-center inline-block align-middle text-3xl whitespace-nowrap cursor-pointer' style={{ writingMode: 'vertical-rl', boxShadow: 'inset 10px 0 5px rgba(0,0,0,.5), inset -10px 0 5px rgba(0,0,0,.5)' }}>
			{ props.name }
		</div>
	)
}