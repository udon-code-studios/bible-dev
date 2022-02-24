import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function Markdown({ text, children }) {
	return (
		<ReactMarkdown
			components={{
				// bypass some default tailwind stuff
				h1: ({ node, ...props }) => <span className="text-6xl" {...props}></span>,
				h2: ({ node, ...props }) => <span className="text-5xl" {...props}></span>,
				h3: ({ node, ...props }) => <span className="text-4xl" {...props}></span>,
				h4: ({ node, ...props }) => <span className="text-3xl" {...props}></span>,
				h5: ({ node, ...props }) => <span className="text-2xl" {...props}></span>,
				h6: ({ node, ...props }) => <span className="text-xl" {...props}></span>,
				// use next Link instead of <a>
				a: ({ node, ...props }) => (
					<Link href = { props.href }>
						<a className="underline hover:text-blue-600">
							{props.children}
						</a>
					</Link>
				)
			}}
		>
			{ children ? children : text }
		</ReactMarkdown>
	)
}