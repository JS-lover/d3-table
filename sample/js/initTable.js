

var config1={
        sort: true,
        scroll: {
          able: true,
          tableHeight: 126
        },
        toolbar: {
          filterColumn:["vendorName","CycleTime"],
          columnSearched: ["vendorName"], //the key value in data
          sortBy: ["Vendor Name", "Cycle Time", "Item Count"], //the column value in table view
          placeholderTxt: "Type to start search Vendor Name"  //the tip in search input
        },
        clickable: ["Vendor Name"],   //which column is clickable,the key should be same as that in thead  
        mark: {
          column: ["Vendor Name", "Cycle Time"], //which column is marked
          icon: "iconname"                       //marked icon className
        },
        theadConfig:{vendorName: "Vendor Name", CycleTime: "Cycle Time", itemCount: "Item Count"}//thead ,data key adapt
      }

var table1=D3table("#table1",config1,tableData1);
table1.init()

var table2=D3table("#table2",config1,tableData1);
table2.init()



/*var table2=D3table("#table2",config2,tableData2);
table2.init()

var table3=D3table("#table3",config3,tableData3);
table3.init()

var table4=D3table("#table4",config4,tableData3);
table4.init()
*/
