test = (par, par2) => {
    return par + par2;
}

testAsync = (par, par2, cb) => {
    setTimeout( function() {
        console.log('dentro');
        cb(par + par2);
    }, 3000);
    console.log('fuera');
}

testAsync(1,2, function(result){
    console.log(result);
});