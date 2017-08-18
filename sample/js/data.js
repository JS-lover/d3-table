/*
     add d3-bi branch 2017/8/18
*/
var tableData1 = [
    { "vendorName": "HEWLETT PACKARD FINANCIAL SRVCS CO", "CycleTime": "123 days", "itemCount": "6789" },
    { "vendorName": "HEWLETT PACKARD FINANCIAL SRVCS CO", "CycleTime": "123 days", "itemCount": "6789" },
    { "vendorName": "HEWLETT PACKARD FINANCIAL SRVCS CO", "CycleTime": "123 days", "itemCount": "6789" },
    { "vendorName": "HEWLETT PACKARD FINANCIAL SRVCS CO", "CycleTime": "123 days", "itemCount": "6789" },
    { "vendorName": "DHL EXPRESS (AUSTRALIA) PTY LTD", "CycleTime": "456 days", "itemCount": "5432" },
    { "vendorName": "DHL EXPRESS (AUSTRALIA) PTY LTD", "CycleTime": "456 days", "itemCount": "5432" },
    { "vendorName": "DHL EXPRESS (AUSTRALIA) PTY LTD", "CycleTime": "456 days", "itemCount": "5432" },
    { "vendorName": "HEWLETT PACKARD PUERTO RICO BV LLC", "CycleTime": "234 days", "itemCount": "3456" },
    { "vendorName": "HEWLETT PACKARD PUERTO RICO BV LLC", "CycleTime": "234 days", "itemCount": "3456" },
    { "vendorName": "HEWLETT PACKARD PUERTO RICO BV LLC", "CycleTime": "234 days", "itemCount": "3456" },
    { "vendorName": "HP INC", "CycleTime": "345 days", "itemCount": "2346" },
    { "vendorName": "HP INC", "CycleTime": "345 days", "itemCount": "2346" },
    { "vendorName": "HP INC", "CycleTime": "345 days", "itemCount": "2346" },
    { "vendorName": "HP PPS AUSTRALIA PTY LTD", "CycleTime": "678 days", "itemCount": "1234" },
    { "vendorName": "HP PPS AUSTRALIA PTY LTD", "CycleTime": "678 days", "itemCount": "1234" },
    { "vendorName": "HP PPS AUSTRALIA PTY LTD", "CycleTime": "678 days", "itemCount": "1234" },
]


var LEAPUser = [{
            useName: "Andrea James",
            email: "andrea.james@dxc.com",
            company: "Company1",
            process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
            role: "Sales",
            status:[{value:"Approved",class:"approved",dis_class:"rejected"}],
            actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active"}, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]

    },
    {
        useName: "Brandon Jill",
        email: "brandon.jill",
        company: "Company1",
        process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
        role: "Sales",
        status: [{value:"Approved",class:"approved",dis_class:"rejected"}],
        actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]

}, {
    useName: "Rebecca",
    email: "Rebecca",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status:[{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]

}, {
    useName: "Larry Larson",
    email: "Larrylarson",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status:[{value:"Approved",class:"approved",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]

}, {
    useName: "Andrea James1",
    email: "andrea.james@dxc.com",
    company: "Company1",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Sales",
    status:[{value:"Approved",class:"approved",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]

}, {
    useName: "Brandon Jill1",
    email: "brandon.jill",
    company: "Company1",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Sales",
    status:[{value:"Approved",class:"approved",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Rebecca1",
    email: "Rebecca",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status:[{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Larry Larson1",
    email: "Larrylarson",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status: [{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Andrea James2",
    email: "andrea.james@dxc.com",
    company: "Company1",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Sales",
    status:[{value:"Approved",class:"approved",dis_class:"rejected"}],
    actions:[{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Brandon Jill2",
    email: "brandon.jill",
    company: "Company1",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Sales",
    status:[{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Rebecca2",
    email: "Rebecca",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status:[{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}, {
    useName: "Larry Larson2",
    email: "Larrylarson",
    company: "Company2",
    process:{type:"tip",title:"2process",list:["Melissa","Danial","Rebecca"]},
    role: "Admin",
    status:[{value:"Rejected",class:"rejected",dis_class:"rejected"}],
    actions: [{ type: "active", class: "icon-enable-active", dis_class: "icon-enable-active" }, { type: "reject", class: "icon-enable-reject", dis_class: "icon-enable-reject" }]
}]
