function item(min, max, length) {
  const start = Math.round(Math.random() * (max - min) + min);
  return {
    date: start,
    name: 'book ' + start.toString(),
  }
}

console.log(new Array(10).fill().map(x => item(-2000, 1000, 100)));