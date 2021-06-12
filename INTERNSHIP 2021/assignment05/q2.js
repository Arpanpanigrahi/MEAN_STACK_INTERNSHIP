var arr = []


let result = (arr) => {
    if(arr.length==0){
        console.log(`Nothing available`)
    }
    else{
        if(arr.length==1){
            console.log(arr[0])
        }
        else if(arr.length==2){
            console.log(`${arr[0]} and ${arr[1]}`)
        }
        else if(arr.length==3){
            console.log(`${arr[0]},${arr[1]} and ${arr[2]}`)
        }
        else{
            console.log(`${arr[0]},${arr[1]} and Others`)
        }
    }

}


let size = Number(prompt("Enter the size of the array"))
if(size==0){
    result(arr)
}
else{
   
    for(let i=0;i<size;i++){
        arr.push(prompt("Enter the element"))
    }
    result(arr);
}