

var config1={
        sort: true,
        scroll: {
          able: true,
          tbodyHeight: 300
        },
        toolbar: {
          filterColumn:["Vendor Name","Cycle Time","Item Count","Percentage"],
          columnSearched: "Vendor Name", //the key value in data
          placeholderTxt: "Type to start search Vendor Name"  //the tip in search input
        },
        clickedColumn: ["Vendor Name"],   //which column is clickable,the key should be same as that in thead  
        mark: {
          column: ["Vendor Name", "Cycle Time"], //which column is marked
          icon: "icon-name"                       //marked icon className
        },

        theadConfig:{name: "Vendor Name", caseCount: "Item Count", cycleTime: "Cycle Time",percentage:"Percentage",duration:"Duration"},//thead ,data key adapt
      }
var table1=D3table("#table1",config1,tableData2);
console.log(table1)


