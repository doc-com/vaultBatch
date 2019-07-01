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

// testAsync(1,2, function(result){
//     console.log(result);
// });


var nums = [1,2,3,4,5,6,7,8,9];

testAsyncMap = (nums, cb) => {
	setTimeout(function() {
		cb(
			nums.map(n => {
				return n*2;
			})
		);
	},3000);
}


// testAsyncMap(nums, function(result){
// 	console.log(result);
// });


mapNums = (nums) => {
	nums.map(num => {
		testAsyncDouble(num, function(result){
			console.log(result);
		});
	});
}

testAsyncDouble = (num, cb) => {
	setTimeout(function() {
		cb(num * 2);
	}, 3000);
}

mapNums(nums);