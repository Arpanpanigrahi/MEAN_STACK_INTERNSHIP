//Q4

for(let i=1;i<=100;i++)
{
    if(i%3==0){
        document.write(`HTML`);
        document.write(`<br>`);
    }
    if(i%5==0){
        document.write(`CSS`);
        document.write(`<br>`);
    }
    if(i%3==0 && i%5==0){
        document.write(`JAVASCRIPT`);
        document.write(`<br>`);
    }
    if(i%3!=0 && i%5!=0){
        document.write(i);
        document.write(`<br>`);
    }
}