var str=prompt("Enter the elements of array")
var i
var arr=str.split(",")
console.log(arr)
//var arr=Array(prompt("Enter the elements of array"))
if(arr[0]==""){
    document.write("Nothing avaliable to print")
}
else if(arr.length==1){
    document.write(arr[0])
}
else if(arr.length==2){
    document.write(`${arr[0]} and ${arr[1]}`)
}
else if(arr.length==3){
    document.write(`${arr[0]},${arr[1]} and ${arr[2]}`)
}
else{
    document.write(`${arr[0]},${arr[1]} and others`)
}