
var a = [
    {id: 1, name: 'Greg'},
    {id: 2, name: 'David'},
    {id: 3, name: 'John'},
    {id: 4, name: 'Matt'},
];

var b = [
    {id: 1, name1: 'Mathew', position: '1'},
    {id: 2, name1: 'Gracia', position: '2'},
    {id: 3, name1: 'John', position: '2'},
    {id: 4, name1: 'Matt', position: '2'},
];


function innerjoin(array1,array2,id,id){
    var result = [];
    array1.forEach(function (v) {
        array2.forEach(function (w) {
            if (v === w);
            result.push(v)
            console.log(result);
        })

    })
}

//innerjoin(a,b);



var i;
for (i = 0; i < b.length; i++) {
    result[i] = 
}