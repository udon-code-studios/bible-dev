import { useState, useRef, useEffect } from 'react';

function TimelinePoint({ name, date, pos }) {
	const [open, setOpen] = useState(false);
	return (
		<div className = 'absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
			style = {{ left: pos.toString() + '%'}}>
			<div
				className = 'group relative flex justify-center items-center w-6 h-6 bg-stone-400 border-stone-900 border-[3px] rounded-full'
				onClick = { () => setOpen(open ? false : true) }
			>
				<div className = 'border-[5px] border-stone-900 rounded-full'/>
				<div className = 'absolute bottom-6 whitespace-nowrap rotate-90 -translate-y-full'>
          { /* name */ }
				</div>
				<div
					className = 'hidden group-hover:block absolute top-7 p-2 bg-stone-900 text-stone-400 text-center rounded-xl whitespace-nowrap z-10'
					style = {{ display: open ? 'block' : null }}
				>
          { name }
          <br/>
					{ date }
				</div>
			</div>
		</div>
	);
}

function TimelineSpan({ from, to, name, date, layer, timelineWidth }) {
  console.log((to - from).toString() + '%');
  
	const [open, setOpen] = useState(false);
	return (
		<div
			className = 'group absolute flex justify-center items-center top-10 -z-10 hover:z-20'
			style = {{
        left: from.toString() + '%',
        marginTop: (1.5 * (layer || 0)).toString() + 'rem',
        zIndex: open ? '10' : null,
      }}
			onClick = { () => setOpen(open ? false : true) }
		>
			<div className = 'relative h-5 bg-stone-900 text-stone-400 rounded-full'
				style = {{ width: ((to - from) * timelineWidth / 100).toString() + 'px',}}
			>
				<div
					className = 'absolute -bottom-[.1rem] left-1.5 font-bold text-ellipsis whitespace-nowrap overflow-hidden'
					style = {{ width: 'calc(100% - 0.625rem)' }}
				>
					{ name }
				</div>
				<div
					className = 'hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-[25px] p-2 bg-stone-900 text-stone-400 text-center rounded-xl whitespace-nowrap z-20'
					style = {{ display: open ? 'block' : null }}
				>
					{ name }<br/>
					{ date }
				</div>
			</div>
		</div>
	);
}

export default function TimeLine({ spans, dates }) {
  // just in case
  if (!spans || spans.length < 1 || !dates || dates.length < 1) {
    return (
      <div className = 'text-red-700 text-center text-2xl'>
        Something went wrong. Please try again. (No spans or dates in timeline)
      </div>
    );
  }

  // Sort spans and dates
  spans = spans.sort((first, second) => first.from - second.from);
  dates = dates.sort((first, second) => first.date - second.date);
  
  // calculate first and last date by sorting

  // spans:
  const firstSpanDate = spans.map(span => span.from).sort((first, second) => first - second)[0];
  const lastSpanDate = spans.map(span => span.to).sort((first, second) => first - second).pop();

  // dates:
  const firstDateDate = dates.map(date => date.date).sort((first, second) => first - second)[0];
  const lastDateDate = dates.map(date => date.date).sort((first, second) => first - second).pop();

  const firstDate = Math.min(firstSpanDate, firstDateDate);
  const lastDate = Math.max(lastSpanDate, lastDateDate);

  // calculating y values of spans
  const layers = [-Infinity];
  spans.map(span => {
    let idx = 0;
    while (idx < spans.length) { // make sure no infinite loop
      if (layers[idx]) {
        if (layers[idx] <= span.from) {
          span.layer = idx;
          layers[idx] = span.to;
          break;
        } else {
          idx++;
        }
      } else { // new layer
        span.layer = idx;
        layers.push(span.to);
        break
      }
    }
  });

  console.log(spans.map(span => span.layer));
  
  // width of bar stuff
  const [width, setWidth] = useState(1000);
  const timelineRef = useRef();

  // set up resizing once in browser
  useEffect(() => {
    setWidth(timelineRef.current.offsetWidth);
    window.addEventListener('resize', () => {
      setWidth(timelineRef.current.offsetWidth);
    });
  }, []);
	return (
		<div
      className = 'flex justify-center items-center relative w-3/4 min-w-[150rem] mx-10'
      style = {{ height: (8 + layers.length * 1.5).toString() + 'rem' }}
    >
			<div
        className = 'w-4 h-4 border-stone-900 -mr-4 border-t-2 border-l-2 -rotate-45'
        style = {{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />
			<div
        className = 'w-full 0rem h-[2px] bg-stone-900 z-[1]' ref = { timelineRef }
        style = {{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />
			<div
        className = 'absolute w-full z-[2]'
        style = {{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      >
        { dates.map(date => (
          <TimelinePoint
            name = { date.name }
            date = { Math.abs(date.date).toString() + ((date.date) < 0 ? ' BC' : ' AD') }
            pos = { (date.date - firstDate) / (lastDate - firstDate) * 100 }
            key = { date.name }
          />
        )) }
				{ spans.map(span => (
          <TimelineSpan
            name = { span.name }
            date = { Math.abs(span.from).toString() + ((span.from) < 0 ? ' BC' : ' AD') + ' - ' + Math.abs(span.to).toString() + ((span.to) < 0 ? ' BC' : ' AD') }
            from = { (span.from - firstDate) / (lastDate - firstDate) * 100 }
            to = { (span.to - firstDate) / (lastDate - firstDate) * 100 }
            timelineWidth = { width }
            layer = { span.layer }
            key = { span.name }
          />
        )) }
			</div>
			<div className = 'w-4 h-4 border-stone-900 -ml-4 border-t-2 border-l-2 rotate-[135deg]'
        style = {{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />
		</div>
	);
}