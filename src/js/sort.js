
var _sort=(function(){
	function sortArray(data) {
      return data.sort((a, b) => (typeof a) == "number" ? b - a : b.localeCompare(a));
    }
	function sortObjectsInObject(data, key, objCount) {
      var result = [],
          arr = [];
      //get the value of the key in objects.
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
      for (var c = 0; c < objCount; c++) {
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
  function ascendSort_ObjectsInArray(data, key) {
      if(TypeChecker.isArray(data)){
          data.sort((a, b) => {
              if (!(Object.prototype.toString.call(a[key]) === '[object Undefined]') && !(Object.prototype.toString.call(b[key]) === '[object Undefined]')) {
                  if (/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])) {
                    var A = a[key].substr(0, a[key].length - 1),
                      B = b[key].substr(0, b[key].length - 1);
                    return Number(A) - Number(B);
                  } else if ((typeof a[key]) != "number") {
                    return a[key].localeCompare(b[key]);
                  } else {
                    return a[key] - b[key];
                  }
              } else {
                console.warn("no data for ascend sorting !")
              }
          });
      }         
  },
  function descendSort_ObjectsInArray(data, key) {
      if(Object.prototype.toString.call(data) === '[object Array]'){
          data.sort((a, b) => {
              if (!(Object.prototype.toString.call(a[key]) === '[object Undefined]') && !(Object.prototype.toString.call(b[key]) === '[object Undefined]')) {
                  if (/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])) {
                    var A = a[key].substr(0, a[key].length - 1),
                      B = b[key].substr(0, b[key].length - 1);
                    return Number(B) - Number(A);
                  } else if ((typeof a[key]) != "number") {
                    return b[key].localeCompare(a[key]);
                  } else {
                    return b[key] - a[key];
                  }
              } else {
                console.warn("no data for  descend sorting !")
              }
          });
          
      } 
  },
	return {
		sortArray:sortArray,
    sortObjectsInObject:sortObjectsInObject
    ascendSort_ObjectsInArray:ascendSort_ObjectsInArray
		descendSort_ObjectsInArray:descendSort_ObjectsInArray
	}

})()


