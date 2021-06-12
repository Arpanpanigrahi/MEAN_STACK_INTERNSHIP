//Q3- Find the sign of the product of three nos.


const n1= prompt(`Enter first number`);
const n2= prompt(`Enter second number`);
const n3= prompt(`Enter third number`);

var mul=n1*n2*n3;

if(mul>0){
    document.write(`The product of ${n1}, ${n2} and ${n3} is ${mul}: POSITIVE`);
}
else if(mul<0){
    document.write(`The product of ${n1}, ${n2} and ${n3} is ${mul}: NEGATIVE`);
}
else{
    document.write(`The product of ${n1}, ${n2} and ${n3} is ${mul}`);
}