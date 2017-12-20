var D3table = (function() {
    function D3table(ele, options, data) {
        this.name = ele;
        this.ele = d3.select(ele);
        this.searchTimer = null;
        this.iconTo={
        	"icon-sort":"icon-ascend-sort",
        	"icon-ascend-sort":"icon-descend-sort",
        	"icon-descend-sort":"icon-ascend-sort"
        }
        var DEFAULT_OPTION={
        	sort:false,
					scroll:{
						able:false,
						tbodyHeight:300
					},
          toolbar: {
              filterColumn: [], //filter column
              columnSearched:[], //search target column's value
              placeholderTxt:""
          },
          mark: {
              column:[], //mark special column
              icon: "" //add icon
          },
          clickedColumn:[],
          theadConfig:{}
        }
        this.options =Object.assign({},DEFAULT_OPTION,options)
        
        this.data = data;
        this.model = {
            columnUnselected: [],
            columnSelected: [...this.options.toolbar.filterColumn],
            currentData: [...data],
            rendedColumn: [],
            designated: "",
            clickedText: "",
        }
        for (var key in this.data[0]) {
            if (this.data[0].hasOwnProperty(key)) {
                this.model.rendedColumn.push(key);
            }
        }

        this.toDataName={};
        for(let name in this.options.theadConfig){
        	if(this.options.theadConfig.hasOwnProperty(name)){
        		this.toDataName[this.options.theadConfig[name]] =name;
        	}
        }
    }

    D3table.prototype.init = function() {
        this.initContainer();
        this.initToolbar();
        this.initThead(".fixed-tbody", this.model.rendedColumn);
        this.initTbody(".fixed-tbody", this.model.rendedColumn, this.model.currentData)

        if(this.options.clickedColumn.length){
        	this.getClickedTdText()
        }
    }

    D3table.prototype.initContainer = function() {
        this.ele.html(
            `
	            <div class="bi-table">
								<div class="table-toolbar">
								</div>
									<div class="table-body">
										<table class="fixed-tbody"></table>
									</div>
							</div>
						`
        )
    }

    D3table.prototype.initToolbar = function() {
        this.initFilterColumnTool(this.options.toolbar.filterColumn)
        if (typeof this.options.toolbar.columnSearched == "string") {
        	this.searchTool(this.options.toolbar.columnSearched)
        }        
        // this.clearFloat(".table-toolbar")
        this.ele.select(".table-toolbar")
		        		.append("div")
		            .attr("class", "clearfix");        
    }
    D3table.prototype.initFilterColumnTool = function(t_value) {
        var _this = this,
            column = this.options.toolbar.filterColumn;
        if (t_value && t_value.length > 0) {
            var filterColumnBox = this.ele.select(".table-toolbar")
                .append("div")
                .attr("class", "filter-column");

            var columnSerie = filterColumnBox.append("ul")
                .attr("class", "column-series");

            var toggleButton = filterColumnBox.append("i")
                .attr("class", "icon icon-menu");

            toggleButton.on("click", function() {
                var columnSerieDisplay = columnSerie.style("display") == "none" ? "block" : "none";
                columnSerie.style("display", columnSerieDisplay)

            });
            var optionLi = columnSerie.selectAll("li")
											                .data(column)
											                .enter()
											                .append("li");
						
						var optionLabel = optionLi.append("label");

            var optionInput=optionLabel.append("input")
						            .attr("type", "checkbox")
						            .attr("checked", true)
						            .attr("data-label", d => d);

						var model =this.model,
		    				inputEle=d3.selectAll(".filter-column input"),
		    				labelEle=d3.selectAll(".filter-column ul label");

						optionInput.on("click", function(event) {
          		if(d3.select(this).style("cursor")=="not-allowed"){
          			d3.event.preventDefault();
          		}else{
				    		setTimeout(function(){
				    			if(model.columnSelected.length===1){
						    		for(let ele = 0,len = inputEle._groups[0].length; ele<len; ele++){
						    			if(inputEle._groups[0][ele].checked==true){
						    				d3.select(labelEle._groups[0][ele]).style("cursor","not-allowed");
						    				d3.select(inputEle._groups[0][ele]).style("cursor","not-allowed");
						    			}
						    		}
					    		}else if(model.columnSelected.length>1){
						    		for(let ele = 0,len = inputEle._groups[0].length; ele<len; ele++){
				    					d3.select(labelEle._groups[0][ele]).style("cursor","pointer");
					    				d3.select(inputEle._groups[0][ele]).style("cursor","pointer");
				    				}
					    		}
					    	},0)
				    						            	
                _this.ele.select(".search-input").property("value", "")
                
                var labelName = d3.select(this).attr("data-label"),
                		oChecked = d3.select(this).node().checked;


                _this.filterDataByColumn(labelName , oChecked)
                _this.initThead(".fixed-tbody",model.rendedColumn);
                _this.initTbody(".fixed-tbody",model.rendedColumn,model.currentData);

                columnSerie.style("display", "none")

          		}
          	});

            optionLabel.append("span").text(d => d);

	    			if(model.columnSelected.length===1){
		    				d3.select(labelEle._groups[0][0]).style("cursor","not-allowed");
		    				d3.select(inputEle._groups[0][0]).style("cursor","not-allowed");
		    		}
        }
    }
    D3table.prototype.searchTool = function(t_value) {
        var _this = this,
        		t_value = _this.toDataName[t_value];

        var searchTool = this.ele.select(".table-toolbar")
									                .append("div")
									                .attr("class", "search-tool");
        searchTool.html(
        			`<div class='search-box'>
								<i class='icon icon-search'></i>
								<input type='text' class='search-input' placeholder="${_this.options.toolbar.placeholderTxt}">
							 </div>`)

        searchTool.select(".search-input").on("keyup", function(event) {
            if (_this.searchTimer) clearTimeout(_this.searchTimer);
            var value = this.value.trim();
            _this.searchTimer = setTimeout(function() {

              _this.model.currentData.length = 0;
              _this.model.currentData=_this.data.filter((d,i)=>{
              	return d[t_value].indexOf(value) >= 0
              })

              _this.initTbody(".fixed-tbody", _this.model.rendedColumn, _this.model.currentData);

            }, 300)
        });
    }

    D3table.prototype.initThead = function(context, column) {
        var tHeadNames = getTheadName(column, this.options.theadConfig),
        		theadEle = this.ele.select(context).selectAll("thead")

        if (theadEle) theadEle.remove();

        var _this = this,
            thead = this.ele.select(context).append("thead"),
            theadTr = thead.append("tr");

        var theadTh = theadTr.selectAll("th")
									            .data(tHeadNames)
									            .enter()
									            .append("th")
									            .attr("class", "defalut-sort");

        if (_this.options.sort) {

            var theadText = theadTh.append("span")
										                .attr("class", "thead-text")
										                .text(d => {
										                    if (_this.model.columnUnselected.indexOf(d) >= 0) return;
										                    return d;
										                });

            var theadIcon = theadTh.append("i").attr("class", "icon-sort");

            theadIcon.on("click", function() {
                var _data = [..._this.model.currentData],
                    tConfig = _this.options.theadConfig,
                    textClicked = d3.select(this.parentNode).select(".thead-text").html(),
                    thValue = _this.toDataName[textClicked];


                var thisIcon = d3.select(this.parentNode).select("i"),
                		thisIconName = thisIcon.attr("class");

                  theadIcon.attr("class", "icon-sort");
                  thisIcon.attr("class", _this.iconTo[thisIconName]);
                  
                if (_this.iconTo[thisIconName] == "icon-ascend-sort") {
                    ascendSort(_data, thValue);

                } else if (_this.iconTo[thisIconName] == "icon-descend-sort") {
                    descendSort(_data, thValue);

                }
                 _this.initTbody(".fixed-tbody", column, _data);
            });
        }
    }
    D3table.prototype.initTbody = function(context, column, data) {
        var	options = this.options,
        	  tHeadNames = getTheadName(column, options.theadConfig),
            tbodyEle = this.ele.select(context).selectAll("tbody"),
            _this = this;

        if (tbodyEle) tbodyEle.remove();
        var tbody = this.ele.select(context).append("tbody");

        if (data && data.length === 0) {
            this.noData(context);
        } else {
            if (options.scroll.able) {
                this.ele.select(".table-body tbody").style("height",options.scroll.tbodyHeight + "px")
            }

        		var oMark , oClick,
          			tbodyTr = tbody.selectAll("tr")
									            .data(data)
									            .enter()
									            .append("tr");

            tbodyTr.selectAll("td")
		                .data(row => {
		                    return column.map(col => {
		                        return { value: row[col], key: col };
		                    });
		                })
		                .enter()
		                .append("td")
		                .attr("class", (d, i) => {
		                    var name = "";

						        		oMark = options.mark.column.length > 0 && options.mark.column.indexOf(options.theadConfig[d.key]) >= 0;
						        		oClick = options.clickedColumn.length > 0 && options.clickedColumn.indexOf(options.theadConfig[d.key]) >= 0;

		                    if (oMark&&oClick) {
		                        name = options.mark.icon + " td-clickable";
		                    }
		                    if (!oMark&&oClick) {
		                        name = "td-clickable";
		                    }
		                    if (oMark&&!oClick) {
		                        name = options.mark.icon;
		                    }
		                    return name;
		                })
		                .text(function(d) {
		                    return d.value;
		                })
        }
    }

    D3table.prototype.getClickedTdText = function() {
        var _this = this;
        this.ele.selectAll(".td-clickable").on("click", function() {
            _this.model.clickedText = this.innerHTML;
            console.log(this.innerHTML)
        })
    }
    D3table.prototype.filterDataByColumn = function(value,bool) {
      var columns =this.options.toolbar.filterColumn,
          rendedColumnName=[],
          model=this.model;

        model.rendedColumn.length = 0;
        model.columnSelected.length = 0;

        var index = model.columnUnselected.indexOf(value);
        //push the column value if columnUnselected not contain it.

        if (index < 0) {
            model.columnUnselected.push(value);
        } else {
            model.columnUnselected.splice(index, 1);
        }

        columns.forEach((d, i) => {
            if (model.columnUnselected.indexOf(d) < 0) {
                model.columnSelected.push(d);
            }
        })
        this.data.forEach((d, i) => {
            model.currentData[i] = {};
            for (let k in d) {
                if (model.columnSelected.indexOf(this.options.theadConfig[k]) >= 0) {
                    model.currentData[i][k] = d[k];
                }
            }
        })
        
        for (let key in model.currentData[0]) {
            if (model.currentData[0].hasOwnProperty(key)) {
                model.rendedColumn.push(key);
                rendedColumnName.push(this.options.theadConfig[key]);
            }
        }

        this.disabledSearch(rendedColumnName, this.options.toolbar.columnSearched);        
    }
    D3table.prototype.disabledSearch = function(column, search) {
        var iptEle = this.ele.select(".search-input");

        if (type(search) == "String") {

            column.indexOf(search) < 0 ? iptEle.property("disabled", true) : iptEle.property("disabled", false);

        } else if (type(search) == "Array") {

            var disabled = search.every(d => column.indexOf(d) < 0)
            disabled ? iptEle.property("disabled", true) : iptEle.property("disabled", false);

        } else {
            console.warn("the value of you want to search should be string or array");
        }
    }
    D3table.prototype.noData = function(element) {
        var _this = this;
        this.ele.select(element)
            .select("tbody")
            .html(
            	`<tr>
	            	<td class="no-data" colspan="${_this.model.rendedColumn.length}">
									No data to display
								</td>
							</tr>`);
    }
    // D3table.prototype.clearFloat = function(parent) {
    //     this.ele.select(parent)
		  //       		.append("div")
		  //           .attr("class", "clearfix");
    // }

    function getTheadName(column, adaptObj) {
        var result = [];
        column.forEach((d, i)=>{
            if (adaptObj[d]) {
                result.push(adaptObj[d])
            } else {
                console.warn("not find table head's key")
            }
        })
        return result;
    }

    function type(target) {
        var type = Object.prototype.toString.call(target);
        return type.slice(8, type.length - 1);
    }

    function ascendSort(data, key) {
        data.sort((a, b) => {

            if (typeof a[key] != "undefined" && typeof a[key] != "undefined") {
                if (/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])) {
                    var A = a[key].substr(0, a[key].length - 1),
                        B = b[key].substr(0, b[key].length - 1);
                    return Number(A) - Number(B);
                } else if ((typeof a[key]) != "number") {
                    return a[key].localeCompare(b[key]);
                } else {
                    return a[key] - b[key];
                }
            }

        });
    }

    function descendSort(data, key) {
        data.sort((a, b) => {
            if (typeof a[key] != "undefined" && typeof a[key] != "undefined") {
                if (/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])) {
                    var A = a[key].substr(0, a[key].length - 1),
                        B = b[key].substr(0, b[key].length - 1);
                    return Number(B) - Number(A);
                } else if ((typeof a[key]) != "number") {
                    return b[key].localeCompare(a[key]);
                } else {
                    return b[key] - a[key];
                }
            }
        });
    }

    return function(ele, options, data) {
        var tableInit = new D3table(ele, options, data);
        tableInit.init();
        return tableInit
    }
})();