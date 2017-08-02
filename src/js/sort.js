
var _sort=(function(){
	function sortObject(data){

	}

	function sortArray(data){
		return data.sort(function(a,b){
			return (typeof a)=="number"?a-b:a.localeCompare(b);
		});
	}
	function sortObjectsInObject(data,key){
		var result=[],
			arr=[];
	    for(var i in data ){				
			if(data.hasOwnProperty(i)){			
				for(var k in data[i]){
					if(data[i].hasOwnProperty(k)&&k==="caseCount"){
						arr.push(data[i][k])
					}
				}
			}
		}
		var _arr=sortArray(arr);			
		_arr.forEach(function(value,index){
		    for(var i in data ){				
				if(data.hasOwnProperty(i)){			
					for(var k in data[i]){
						if(data[i].hasOwnProperty(k)&&k==="caseCount"&&data[i][k]===value){
							result[index]={};
							result[index][i]=data[i];
						}
					}
				}
			}
		})

		return result;
	}
	function sortObjectInArray(data,key){

	}

	return {
		sortArray:sortArray,
		sortObject:sortObject
	}

})()


