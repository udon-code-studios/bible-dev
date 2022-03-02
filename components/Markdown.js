import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Component, createRef, Fragment } from 'react';

// using class so we can have an array of React.createRef (doesn't work in functional components)
export default class Markdown extends Component {
  constructor(props) {
    super(props)
    const { references } = this.props;
    this.currentRef = 0;

    // array of refs for each of the references we link to.
    // used for scrolling to and then focusing
    this.referenceRefs = Array(references.length).fill().map(_ => createRef());
  }
  render() {
    const { text, children } = this.props;
    return (
      <>
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
              <Link href={props.href}>
                <a className="underline hover:text-blue-600">
                  {props.children}
                </a>
              </Link>
            ),
            p: ({ node, ...props }) => {
              props.children = props.children.map((child, idx) => {
                if (typeof child === 'string') {
                  // if string check for [x] which signals reference
                  // split by reference with regex
                  child = child.split(/\[\d+\]/g);
                  this.currentRef += child.length - 1;
                  // original length of array
                  const originalLength = child.length;
                  Array(child.length - 1).fill().forEach((_, idx) => {
                    child.splice(originalLength - 1 - idx,
                      0,
                      <sup key={idx}>
                        <a
                          href='#'
                          onClick={(e) => {
                            e.preventDefault();
                            if (!this.referenceRefs[this.currentRef - idx - this.currentRef / 2 - 1]) return;
                            const current = this.referenceRefs[this.currentRef - idx - this.currentRef / 2 - 1].current;
                            current.scrollIntoView({ behavior: 'smooth' });
                            current.focus();
                          }}
                        >
                          {/* subtract currentRef / 2 because of ssr */}
                          {/* tried useState but causes infinite loop */}
                          [{this.currentRef - idx - this.currentRef / 2}]
                        </a>
                      </sup>
                    )
                  });
                }
								// using React.Fragment to prevent key warning
								// you can't have props of a <></>, but you can if you use React.Fragment
                return <Fragment key={idx}>{child}</Fragment>
              })
              return <p {...props} />
            }
          }}
          className="whitespace-pre"
        >
          {children ? children : text}
        </ReactMarkdown>

        { this.props.references.map((item, idx) => {
          return (
            <div
              className="outline-none focus:bg-stone-700 focus:outline-none transition-all"
              key={idx}
              ref={this.referenceRefs[idx]}
              tabIndex={0}
              // prevent clicking focus
              onMouseDown={ (e) => e.preventDefault() }
            >
              <ReactMarkdown
                components={{
                  // use next Link instead of <a>
                  a: ({ node, ...props }) => (
                    <Link href={props.href}>
                      <a className="underline hover:text-blue-600" target = '_blank'>
                        {props.children}
                      </a>
                    </Link>
                  ),
                }}
              >
                { item }
              </ReactMarkdown>
            </div>
          )
        }) }
      </>
    )
  }
}