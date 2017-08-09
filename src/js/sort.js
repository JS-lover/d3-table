
var _sort=(function(){
	function sortArray(data) {
      return data.sort((a, b) => (typeof a) == "number" ? b - a : b.localeCompare(a));
    }
	function sortObjectsInObject(data, key, count) {
      var result = [],
          arr = [];
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          for (var k in data[i]) {
            if (data[i].hasOwnProperty(k) && k === key) {
              arr.push(data[i][k])
            }
          }
        }
      }

      var _arr = sortArray(arr),
          _arrLen = _arr.length;
      for (var c = 0; c < count; c++) {
        if (c > _arrLen - 1) break;
        for (var i in data) {
          if (data.hasOwnProperty(i)) {
            for (var k in data[i]) {
              if (data[i].hasOwnProperty(k) && k === key && data[i][k] === _arr[c]) {
                result[c] = {};
                result[c][i] = data[i];
              }
            }
          }
        }
      }
      return result;
    }
	function sortObjectInArray(data,key){
	}
	return {
		sortArray:sortArray,
		sortObject:sortObject
	}

})()


