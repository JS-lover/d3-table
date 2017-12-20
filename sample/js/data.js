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


var tableData2 = 
    [
      {
        "name": "FEDEX EXPRESS TRANSPORTATION AND",
        "caseCount": 1,
        "cycleTime": "5.4 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PERFIOS SOFTWARE SOLUTIONS PVT",
        "caseCount": 1,
        "cycleTime": "12.0 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "APOLLO HEALTH AND LIFESTYLE LIMITED",
        "caseCount": 2,
        "cycleTime": "5.1 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "DEPUTY COMMISSIONER OF COMMERCIAL",
        "caseCount": 4,
        "cycleTime": "8.3 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "VIRTUAL OPERATIONS LTD",
        "caseCount": 2,
        "cycleTime": "16.9 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SHRI RAM ENTERPRISES",
        "caseCount": 1,
        "cycleTime": "27.1 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "AVAYA INDIA PRIVATE LIMITED",
        "caseCount": 1,
        "cycleTime": "25.6 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "HIREPRO CONSULTING PVT LTD",
        "caseCount": 4,
        "cycleTime": "10.6 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "ISS SUPPORT SERVICES PVT LTD",
        "caseCount": 3,
        "cycleTime": "10.3 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CENTRAL BANK OF INDIA",
        "caseCount": 1,
        "cycleTime": "20.8 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PEOPLESTRONG HR SERVICES PVT LTD",
        "caseCount": 1,
        "cycleTime": "16.1 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "ASAP INFO SYSTEMS PVT LTD",
        "caseCount": 8,
        "cycleTime": "34.8 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SBI A/C ENTRY TAX",
        "caseCount": 1,
        "cycleTime": "3.0 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "JONES LANG LASALLE PROPERTY",
        "caseCount": 1,
        "cycleTime": "62.7 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PAO DGS&D",
        "caseCount": 1,
        "cycleTime": "13.5 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SAUJANNAYA MANPOWER SYSTEMS",
        "caseCount": 1,
        "cycleTime": "8.3 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "TEAMLEASE SERVICES (P) LTD",
        "caseCount": 5,
        "cycleTime": "13.7 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "LOCUZ ENTERPRISE SOLUTIONS",
        "caseCount": 2,
        "cycleTime": "52.7 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "DATTATRAY VASANTRAO ZAMBRE",
        "caseCount": 5,
        "cycleTime": "4.2 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CHUBB ALBA CONTROL SYSTEMS LIMITED",
        "caseCount": 1,
        "cycleTime": "3.9 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CMS IT SERVICES PVT LTD",
        "caseCount": 5,
        "cycleTime": "10.3 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "IDBI BANK LIMITED A/C STAMP DUTY",
        "caseCount": 1,
        "cycleTime": "7.1 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SODEXO SVC INDIA PVT. LTD.",
        "caseCount": 1,
        "cycleTime": "2.0 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "INFINITY BNKE INFOCITY PRIVATE",
        "caseCount": 1,
        "cycleTime": "6.9 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "RED HAT INDIA PVT LTD",
        "caseCount": 3,
        "cycleTime": "20.6 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PERSISTENT SYSTEMS LIMITED",
        "caseCount": 6,
        "cycleTime": "8.8 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SPPL PROPERTY MANAGEMENT PVT LTD",
        "caseCount": 13,
        "cycleTime": "17.7 Days",
        "percentage": "0.05%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "RAWLEY & ASSOCIATES",
        "caseCount": 3,
        "cycleTime": "8.3 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "EXOTIC INNOVATIONS PVT LTD",
        "caseCount": 3,
        "cycleTime": "23.0 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SERVICEBERRY TECHNOLOGIES",
        "caseCount": 7,
        "cycleTime": "10.9 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "MAHA GOVT STATUTORY EPAYMENT",
        "caseCount": 2,
        "cycleTime": "13.0 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CRESTLAW PARTNERS",
        "caseCount": 1,
        "cycleTime": "13.0 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CROWN SOLUTIONS INDIA PVT. LTD.",
        "caseCount": 2,
        "cycleTime": "4.9 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "NEOCOM SYSTEMS",
        "caseCount": 1,
        "cycleTime": "5.9 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PRIMUS GLOBAL TECHNOLOGIES PVT LTD",
        "caseCount": 6,
        "cycleTime": "9.5 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "RELIANCE COMMUNICATIONS LIMITED",
        "caseCount": 2,
        "cycleTime": "8.0 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "INGRAM MICRO INDIA PRIVATE LIMITED",
        "caseCount": 1,
        "cycleTime": "7.0 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "INTERRA INFORMATION TECHNOLOGIES",
        "caseCount": 2,
        "cycleTime": "30.2 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "AHANA SYSTEMS AND SOLUTIONS",
        "caseCount": 7,
        "cycleTime": "2.4 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "NUCSOFT LTD",
        "caseCount": 13,
        "cycleTime": "21.2 Days",
        "percentage": "0.05%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "DLF CYBER CITY DEVELOPERS LIMITED",
        "caseCount": 18,
        "cycleTime": "8.5 Days",
        "percentage": "0.07%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PIERIAN SERVICES PVT LTD",
        "caseCount": 4,
        "cycleTime": "15.8 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "COMMSCOPE SOLUTIONS INDIA PVT LTD",
        "caseCount": 1,
        "cycleTime": "55.1 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "KINGSTON PROPERTY SERVICES LIMITED",
        "caseCount": 7,
        "cycleTime": "6.5 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "MANPOWERGROUP SERVICES INDIA",
        "caseCount": 14,
        "cycleTime": "14.9 Days",
        "percentage": "0.06%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "AGNICIENT TECHNOLOGIES PRIVATE",
        "caseCount": 8,
        "cycleTime": "10.8 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "ITSOURCE TECHNOLOGIES LIMITED",
        "caseCount": 34,
        "cycleTime": "14.6 Days",
        "percentage": "0.14%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "SOLARWINDS INC",
        "caseCount": 1,
        "cycleTime": "5.8 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "PERFICIENT INC",
        "caseCount": 1,
        "cycleTime": "24.9 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "HARRIS COUNTY",
        "caseCount": 4,
        "cycleTime": "20.7 Hours",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "CLEVELAND COUNTY",
        "caseCount": 1,
        "cycleTime": "12.8 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "AMERICAN EXPRESS BUSINESS",
        "caseCount": 7,
        "cycleTime": "7.7 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "Crown Equipment Corporation",
        "caseCount": 1,
        "cycleTime": "3.1 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "BANK OF INDIA",
        "caseCount": 1,
        "cycleTime": "5.7 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "ALD AUTOMOTIVE PVT LTD",
        "caseCount": 8,
        "cycleTime": "7.6 Days",
        "percentage": "0.03%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "GLOBAL E BUSINESS OPERATIONS",
        "caseCount": 1,
        "cycleTime": "3.8 Days",
        "percentage": "0.00%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "DEPARTMENT OF COMMERCIAL TAX",
        "caseCount": 2,
        "cycleTime": "22.0 Days",
        "percentage": "0.01%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "MICROSOFT CORPORATION (INDIA)",
        "caseCount": 32,
        "cycleTime": "14.7 Days",
        "percentage": "0.13%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "BANK OF BARODA",
        "caseCount": 4,
        "cycleTime": "10.3 Days",
        "percentage": "0.02%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "ANIXTER INDIA PVT LTD",
        "caseCount": 16,
        "cycleTime": "6.6 Days",
        "percentage": "0.07%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      },
      {
        "name": "REDINGTON (INDIA) LIMITED",
        "caseCount": 11,
        "cycleTime": "11.1 Days",
        "percentage": "0.04%",
        "duration":"1 year,200 days,16 hours,36 minutes 6 dseconds"
      }
    ]