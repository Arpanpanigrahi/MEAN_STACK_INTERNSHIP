let isPerfect= (n)=>
   {
       // To store sum of divisors
       sum = 1;
   
       // Find all divisors and add them
       for (let i=2; i*i<=n; i++)
       {
           if (n%i==0)
           {
               if(i*i!=n)
                   sum = sum + i + n/i;
               else
                   sum=sum+i;
           }
       }
       // If sum of divisors is equal to
       // n, then n is a perfect number
       if (sum == n && n != 1)
           document.write(`The Number ${n} is a Perfect Number.`)
       else
            document.write('Not a Perfect Number.')
   }

   const num =Number(prompt('Check if number is Perfect or not:'));
   isPerfect(num);