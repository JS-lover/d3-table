

var config1={
        sort: true,
        scroll: {
          able: true,
          tableHeight: 126
        },
        toolbar: {
          filterColumn:["vendorName","CycleTime"],
          columnSearched: ["vendorName","CycleTime"], //the key value in data
          placeholderTxt: "Type to start search Vendor Name"  //the tip in search input
          //sortBy: ["Vendor Name", "Cycle Time", "Item Count"], //the column value in table view
        },
        clickable: ["Vendor Name"],   //which column is clickable,the key should be same as that in thead  
        mark: {
          column: ["Vendor Name", "Cycle Time"], //which column is marked
          icon: "iconname"                       //marked icon className
        },
        theadConfig:{vendorName: "Vendor Name", CycleTime: "Cycle Time", itemCount: "Item Count"}//thead ,data key adapt
      }
var LEAPconfig={
        sort: true,

        toolbar: {
          columnSearched: ["userName"], //the key value in data
          filterColumn:["Email","Company"],
          placeholderTxt: "Type to start search User Name"  //the tip in search input
        },
        clickable: ["User Name"],   //which column is clickable,the key should be same as that in thead  
        mark: {
          column: [], //which column is marked
          icon: "iconname"                       //marked icon className
        },
        theadConfig:{useName: "User Name", email: "Email", company: "Company",process:"Process",role:"Role",status:"Status",actions:"Action"}//thead ,data key adapt
      }

var table1=D3table("#table1",LEAPconfig,LEAPUser);
// var table1=D3table("#table1",config1,tableData1);
table1.init()

