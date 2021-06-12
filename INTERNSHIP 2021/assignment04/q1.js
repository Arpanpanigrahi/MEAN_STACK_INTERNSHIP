//Q1-Biggest of 3 nos. using conditional operator

const n1= prompt(`Enter first number`);
const n2= prompt(`Enter second number`);
const n3= prompt(`Enter third number`);

(n1>n2)?(n1>n3)? document.write(`1st no. is Biggest`) : document.write(`3rd no. is Biggest`): (n2>n3)?document.write(`2nd no. is Biggest`):document.write(`3rd no. is Biggest`);