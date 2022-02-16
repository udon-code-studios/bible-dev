// file: components/Footer.js

import { useState, useRef, useEffect } from 'react';

const timeSpans = [
  { from: -687, to: -587, name: 'Genesis' },
  { from: 528, to: 628, name: 'Esodus' },
  { from: -1732, to: -1632, name: 'Leviticus' },
  { from: -1750, to: -1650, name: 'Numbers' },
  { from: 189, to: 289, name: 'Daniel' },
  { from: 383, to: 483, name: 'Habakkukuk' },
  { from: -1261, to: -1161, name: 'book -1261' },
  { from: 287, to: 387, name: 'book 287' },
  { from: -924, to: -824, name: 'book -924' },
  { from: -1870, to: -1770, name: 'book -1870' },
  { from: -1664, to: -1564, name: 'book -1664' },
  { from: -1826, to: -1726, name: 'book -1826' },
  { from: -1402, to: -1302, name: 'book -1402' },
  { from: 836, to: 936, name: 'book 836' },
  { from: -439, to: -339, name: 'book -439' },
  { from: 84, to: 184, name: 'book 84' },
  { from: -608, to: -508, name: 'book -608' },
  { from: -1251, to: -1151, name: 'book -1251' },
  { from: -1134, to: -1034, name: 'book -1134' },
  { from: -1023, to: -923, name: 'book -1023' },
  { from: -1611, to: -1511, name: 'book -1611' },
  { from: 166, to: 266, name: 'book 166' },
  { from: 737, to: 837, name: 'book 737' },
  { from: -738, to: -638, name: 'book -738' },
  { from: -748, to: -648, name: 'book -748' },
  { from: 379, to: 479, name: 'book 379' },
  { from: -666, to: -566, name: 'book -666' },
  { from: -1388, to: -1288, name: 'book -1388' },
  { from: -578, to: -478, name: 'book -578' },
  { from: 627, to: 727, name: 'book 627' },
  { from: -1251, to: -1151, name: 'book -1251' },
  { from: -1313, to: -1213, name: 'book -1313' },
  { from: 486, to: 586, name: 'book 486' },
  { from: -1029, to: -929, name: 'book -1029' },
  { from: -196, to: -96, name: 'book -196' },
  { from: -1897, to: -1797, name: 'book -1897' },
  { from: 675, to: 775, name: 'book 675' },
  { from: -1773, to: -1673, name: 'book -1773' },
  { from: -1028, to: -928, name: 'book -1028' }
];
const events = [
  { date: 411, name: 'book 411' },
  { date: 544, name: 'book 544' },
  { date: -129, name: 'book -129' },
  { date: -1032, name: 'book -1032' },
  { date: -48, name: 'book -48' },
  { date: -1638, name: 'book -1638' },
  { date: -875, name: 'book -875' },
  { date: 609, name: 'book 609' },
  { date: 48, name: 'book 48' },
  { date: -1487, name: 'book -1487' }
];

/**
 * @param {*} spans - book time spans
 * @param {*} dates - { year: 1989, event: 'Fall of the Berlin Wall' }
 * @returns Timeline JSX
 */
export default function Timeline({ spans = timeSpans, dates = events }) {
  const [width, setWidth] = useState(1000);
  const timelineRef = useRef();

  // set up resizing once in browser
  useEffect(() => {
    setWidth(timelineRef.current.offsetWidth);
    window.addEventListener('resize', () => {
      setWidth(timelineRef.current.offsetWidth);
    });
  }, []);
  
  // if spans or dates are null, return error message
  if (!spans || !dates) {
    return (
      <div className='text-red-700 text-center text-2xl'>
        Something went wrong. Please try again. (No spans or dates in timeline)
      </div>
    );
  }

  // Sort spans and dates
  spans = spans.sort((first, second) => first.from - second.from);
  dates = dates.sort((first, second) => first.date - second.date);

  // calculate first and last date by sorting
  const firstSpanDate = spans[0].from;
  const lastSpanDate = spans.map(span => span.to).sort((first, second) => first - second).pop();
  const firstDateDate = dates[0].date;
  const lastDateDate = dates.map(date => date.date).sort((first, second) => first - second).pop();
  const firstDate = Math.min(firstSpanDate, firstDateDate);
  const lastDate = Math.max(lastSpanDate, lastDateDate);

  // determine layer each span should belong
  const layers = [];
  spans.map(span => {
    let layer = 0;
    while (layer < spans.length) {
      if (layers[layer]) {
        if (layers[layer] <= span.from) {
          span.layer = layer;
          layers[layer] = span.to;
          break;
        } else {
          layer++;
        }
      } else { // new layer
        span.layer = layer;
        layers.push(span.to);
        break;
      }
    }
  });

  

  return (
    <div
      className='flex justify-center items-center relative w-3/4 min-w-[150rem] mx-10'
      style={{ height: (8 + layers.length * 1.5).toString() + 'rem' }}
    >
      {/* left arrow */}
      <div
        className='w-4 h-4 border-stone-900 -mr-4 border-t-2 border-l-2 -rotate-45'
        style={{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />

      {/* center line */}
      <div
        className='w-full 0rem h-[2px] bg-stone-900 z-[1]' ref={timelineRef}
        style={{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />

      {/* spans and events */}
      <div
        className='absolute w-full z-[2]'
        style={{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      >
        {dates.map(date => (
          <TimelinePoint
            name={date.name}
            date={Math.abs(date.date).toString() + ((date.date) < 0 ? ' BC' : ' AD')}
            pos={(date.date - firstDate) / (lastDate - firstDate) * 100}
            key={date.name}
          />
        ))}

        {spans.map(span => (
          <TimelineSpan
            name={span.name}
            date={Math.abs(span.from).toString() + ((span.from) < 0 ? ' BC' : ' AD') + ' - ' + Math.abs(span.to).toString() + ((span.to) < 0 ? ' BC' : ' AD')}
            from={(span.from - firstDate) / (lastDate - firstDate) * 100}
            to={(span.to - firstDate) / (lastDate - firstDate) * 100}
            timelineWidth={width}
            layer={span.layer}
            key={span.name}
          />
        ))}
      </div>

      {/* right arrow */}
      <div className='w-4 h-4 border-stone-900 -ml-4 border-t-2 border-l-2 rotate-[135deg]'
        style={{ marginTop: (-(8 + layers.length * 1.5) / 1.2).toString() + 'rem' }}
      />
    </div>
  );
}

function TimelinePoint({ name, date, pos }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
      style={{ left: pos.toString() + '%' }}>
      <div
        className='group relative flex justify-center items-center w-6 h-6 bg-stone-400 border-stone-900 border-[3px] rounded-full'
        onClick={() => setOpen(open ? false : true)}
      >
        <div className='border-[5px] border-stone-900 rounded-full' />
        <div className='absolute bottom-6 whitespace-nowrap rotate-90 -translate-y-full'>
          { /* name */}
        </div>
        <div
          className='hidden group-hover:block absolute top-7 p-2 bg-stone-900 text-stone-400 text-center rounded-xl whitespace-nowrap z-10'
          style={{ display: open ? 'block' : null }}
        >
          {name}
          <br />
          {date}
        </div>
      </div>
    </div>
  );
}

function TimelineSpan({ from, to, name, date, layer, timelineWidth }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className='group absolute flex justify-center items-center top-10 -z-10 hover:z-20'
      style={{
        left: from.toString() + '%',
        marginTop: (1.5 * (layer || 0)).toString() + 'rem',
        zIndex: open ? '10' : null,
      }}
      onClick={() => setOpen(open ? false : true)}
    >
      <div className='relative h-5 bg-stone-900 text-stone-400 rounded-full'
        style={{ width: ((to - from) * timelineWidth / 100).toString() + 'px', }}
      >
        <div
          className='absolute -bottom-[.1rem] left-1.5 font-bold text-ellipsis whitespace-nowrap overflow-hidden'
          style={{ width: 'calc(100% - 0.625rem)' }}
        >
          {name}
        </div>
        <div
          className='hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-[25px] p-2 bg-stone-900 text-stone-400 text-center rounded-xl whitespace-nowrap z-20'
          style={{ display: open ? 'block' : null }}
        >
          {name}<br />
          {date}
        </div>
      </div>
    </div>
  );
}

//
// end of file: components/Timeline.js
