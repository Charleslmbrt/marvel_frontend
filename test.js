const purchases = [
  { name: "Popcorn", price: 5.75 },
  { name: "Movie Ticket", price: 12 },
  { name: "Soda", price: 3.75 },
  { name: "Candy", price: 5 },
];

const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
const byValue = (a, b) => a - b;
const toName = (e) => e.name;
const byName = sortByMapped(toName, byValue);

console.log([...purchases].sort(byName));
