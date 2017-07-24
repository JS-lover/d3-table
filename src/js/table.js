/*var D3table=(function(){

	function D3table(ele,options,data){
		this.name=ele;
		this.ele=d3.select(ele);
		this.options={
			   			sort:options.sort||false,                                                     //sort table's row when click table's head 
			   			scroll:{
			   				able:options.scroll?(options.scroll.able||false):false,                   //show scroll 
			   				tableHeight:options.scroll?(options.scroll.tableHeight||300):300          //container's height
			   			},
					    thStyle:{                     												  //the style of table's head							
					    	backgroundColor: options.thStyle?(options.thStyle.backgroundColor||"white"):"white",
					    	textAlign: options.thStyle?(options.thStyle.textAlign||"center"):"center",
					    	color: options.thStyle?(options.thStyle.color||""):""
					    },	
					    tdStyle:{																	  //the style of table's row
					    	border:options.tdStyle?(options.tdStyle.border||""):"",
					    	backgroundColor: options.tdStyle?(options.tdStyle.backgroundColor||""):"",
					    	textAlign:options.tdStyle?(options.tdStyle.textAlign||"center"):"center",	
					    	stripe: options.tdStyle?(options.tdStyle.stripe||false):false, 	    	  //show stripe row 
					    	odd:options.tdStyle?(options.tdStyle.odd||""):"",
					    	even:options.tdStyle?(options.tdStyle.even||""):"",
					    	hover:options.tdStyle?(options.tdStyle.hover||false):false         	 	  //change background color when hovering
					    },
						toolbar:{  
							sortBy:options.toolbar?(options.toolbar.sortBy||[]):[],                   	  //show tool
							filterColumn:options.toolbar?(options.toolbar.filterColumn||[]):[], 	  //filter column
							columnSearched:options.toolbar?(options.toolbar.columnSearched||[]):[],   //search target column's value
							placeholderTxt:options.toolbar?(options.toolbar.placeholderTxt||""):""
						},
						mark:{																			
							column:options.mark?(options.mark.column||[]):[],						   //mark special column
							icon:options.mark?(options.mark.icon||""):""					   //add icon
						},
						clickable:options.clickable||[],
						theadConfig:assembleTheadValue(options.theadDisplayed, data)||{}
					};

		this.data=data;
		this.dataCenter={
	        columnUnselected:[],
	        columnSelected:[...this.options.toolbar.filterColumn],
	       	currentData:[...data],
	       	rendedColumn:[],
	       	designated:"",
	       	clickedText:"",
		}

	    for(var key in this.data[0]){
	    	if(this.data[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }	
	}

	D3table.prototype.init=function(){
		this.initContainer();
		this.initToolbar();
		 if(this.options.scroll.able){
			this.initThead(".fixed-thead",this.dataCenter.rendedColumn);
			this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
			this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.currentData)
			this.fitThead();
			this.windowResize();
		 }else{
			this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
			this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.currentData)
		 }
		this.getClickedTdText()
	}

	D3table.prototype.initContainer=function(){
		this.ele.html(
			`<div class="bi-table">
				<div class="table-toolbar"></div>

				<div class="table-container">
					<div class="responsive-thead">
						<div class="fixed-head-table">
							<table class="fixed-thead"></table>
						</div>
					</div>
					<div class="table-body">
						<table class="fixed-tbody"></table>
					</div>
				</div>
				<div class="table-footer"></div>
			</div>`
			)
	}

	D3table.prototype.initToolbar=function(){
		this.filterColumnTool(this.options.toolbar.filterColumn)
		this.searchTool(this.options.toolbar.columnSearched)
		this.sortByTool(this.options.toolbar.sortBy)
		this.clearFloat(".table-toolbar")
	}
	D3table.prototype.filterColumnTool=function(t_value){
		var _this=this,
			column=[...this.options.toolbar.filterColumn];		
		if(t_value&&t_value.length>0){
					var filterColumnBox=this.ele.select(".table-toolbar")
							.append("div")
							.attr("class","filter-column");
				    var columnSerie = filterColumnBox.append("ul")
				        .attr("class", "column-series");

				    var toggleButton = filterColumnBox.append("i")
				        .attr("class", "icon icon-menu");
			        toggleButton.on("click", function() {
			            var columnSerieDisplay = columnSerie.style("display");
			            if (columnSerieDisplay == "none") {
			                columnSerie.style("display", "block")
			            } else {
			                columnSerie.style("display", "none")
			            }
			        });

				    var optionLi = columnSerie.selectAll("li")
				        .data(column)
				        .enter()
				        .append("li");

				    var optionLabel = optionLi.append("label");
				    
				    optionLabel.append("input")
				        .attr("type", "checkbox")
				        .attr("checked", true)
				        .attr("value", d => d)
				        .on("click", function() {
				        	_this.ele.select(".search-input").property("value","")
				        	_this.filterData(this.value)
							 if(_this.options.scroll.able){
								_this.initThead(".fixed-thead",_this.dataCenter.rendedColumn);
								_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
								_this.fitThead();
							 }else{
								_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
							 }
							columnSerie.style("display", "none")

				        });

				    optionLabel.append("span")
				        .text(d => d);	        					
		}		
	}
	D3table.prototype.searchTool=function(t_value){
		var _this=this;

		if(t_value&&t_value.length>0){
					var searchTool=this.ele.select(".table-toolbar")
							.append("div")
							.attr("class","search-tool");

					var columnSearched=this.options.toolbar.columnSearched;
					searchTool.html(`<div class='search-box'>
										<i class='icon icon-search'></i>
										<input type='text' class='search-input' title="${_this.options.toolbar.placeholderTxt}"  placeholder="${_this.options.toolbar.placeholderTxt}">
									 </div>`)

					searchTool.select(".search-input")
							  .on("keyup",function(event){
							  		var timer=null,
							  			inputContext=this,
							  			value=this.value.trim(),
							  			data=[..._this.data];
							  		timer=setTimeout(function(){
							  			if(timer)clearTimeout(timer);
							  			_this.dataCenter.currentData.length=0;
							  			data.forEach(function(d,i){
							  				if(d[t_value].indexOf(value)>=0){
							  					_this.dataCenter.currentData.push(d);
							  				}
							  			})
										_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
										 if(_this.options.scroll.able){
											_this.fitThead();
										 }

							  		},300)
							  });
		}		
	}
	D3table.prototype.sortByTool=function(t_value){
		var _this=this;		
		if(t_value&&t_value.length>0){
					var sortBy=this.ele.select(".table-toolbar")
										.append("div")
										.attr("class","sort-by")
										.html(`<span class="prompt">Sort By</span>
										   	  <div class="selection">
												<div class="sort-selected">
													<span class="selected-value"></span>
													<i class="glyphicon glyphicon-menu-down"></i>
												</div>
												<div class="select-ul"></div>
										   	  </div>`);

					var selectUl=sortBy.select(".select-ul").append("ul"),
						item=selectUl.selectAll("li")
							.data(t_value)
							.enter()
							.append("li")
							.text((d,i)=>{
								return d;
							});
					sortBy.select(".selected-value").html(t_value[0]);
					this.dataCenter.designated=t_value[0];

					item.on("click",function(){
						_this.dataCenter.designated=this.innerHTML;
						sortBy.select(".selected-value").text(this.innerHTML);
			            sortBy.select(".select-ul").style("display", "none")
					});

					sortBy.select(".sort-selected").on("click",function(){
						var selectUlDisplay = sortBy.select(".select-ul").style("display");
			            if (selectUlDisplay == "none") {
			                 sortBy.select(".select-ul").style("display", "block")
			            } else {
			                 sortBy.select(".select-ul").style("display", "none")
			            }
					});
		}		
	}
	D3table.prototype.clearFloat=function(parent){
		this.ele.select(parent).append("div")
								   .attr("class","clearfix");		
	}

	D3table.prototype.initThead=function(context, column){
		var columnDispalyed=adaptThead(column,this.options.theadConfig);
	    var theadEle =this.ele.select(context).selectAll("thead")
	    if (theadEle) theadEle.remove();

	    var _this=this,
	    	thead = this.ele.select(context).append("thead"),
	    	theadTr = thead.append("tr"),
	    	theadTh = theadTr.selectAll("th")
	        .data(columnDispalyed)
	        .enter()
	        .append("th")
	        .text(d => {
	            if (_this.dataCenter.columnUnselected.indexOf(d) >= 0) return;
	            return d;
	        })
	        .attr("class", "defalut-sort")
	        .style("background-color", _this.options.thStyle.backgroundColor)
	        .style("height", _this.options.thStyle.height+"px")
	        .style("text-align", _this.options.thStyle.textAlign)
	        .style("color", _this.options.thStyle.color);
	    if (_this.options.sort&&context===".fixed-thead") {

	        theadTh.style("cursor", "pointer");
	        theadTh.on("click", function() {
	    		var _data = [..._this.dataCenter.currentData],
	    			tConfig=_this.options.theadConfig,
	    			thValue=null,
	    			textClicked = this.innerHTML;

	    		for(var k in tConfig){
	    			if(tConfig.hasOwnProperty(k)&&tConfig[k]===textClicked){
	    				thValue=k;
	    			}
	    		}	
	            if (d3.select(this).attr("class") == "defalut-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "ascend-sort");
	                ascendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column, _data)
	            } else if (d3.select(this).attr("class") == "ascend-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "descend-sort");
	                descendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column ,_data)
	            } else if (d3.select(this).attr("class") == "descend-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "ascend-sort");
					ascendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column, _data);	                
	            }
	        });
	    }
	}

	D3table.prototype.initTbody=function(context,column,data){
		var columnDispalyed=adaptThead(column,this.options.theadConfig),
			tbodyEle = this.ele.select(context).selectAll("tbody"),
	    	_this=this;

	    if (tbodyEle) tbodyEle.remove();
	    var tbody = this.ele.select(context).append("tbody");

	    if(data&&data.length===0){
	    	this.noData(context);
	    }else{
		    if(this.options.scroll.able){
			    this.ele.select(".table-body").style("overflow","auto")
			    						.style("height",this.options.scroll.tableHeight+"px");    
		    }

		    var tbodyTr = tbody.selectAll("tr")
		        .data(data)
		        .enter()
		        .append("tr")
		        .style("background-color", (d,i)=>{
		        	if(this.options.tdStyle.stripe)return i%2?this.options.tdStyle.even:this.options.tdStyle.odd;
		        });

		    tbodyTr.selectAll("td")
			        .data(function(row) {
			            return column.map(function(col) {
			                return { value: row[col],key:col};
			            });
			        })
			        .enter()
			        .append("td")
			        .attr("class",(d,i)=>{

			        	var name="";
			        	if(this.options.mark.column.length>=0&&this.options.mark.column.indexOf(this.options.theadConfig[d.key])>=0){
			        		name+=" "+this.options.mark.icon;
			        	}
			        	if(this.options.clickable.length>0&&this.options.clickable.indexOf(this.options.theadConfig[d.key])>=0){
			        		name+=" TDclickable";
			        	}
			        	return name;
			        })
			        .text(function(d) {
			            return d.value;
			        })
			        .style("border",()=>{
			        	if(this.options.tdStyle.border){
			        		//this.ele.select(".table-container").style("border-bottom",this.options.tdStyle.border)
			        		return this.options.tdStyle.border;
			        	}
			        })
			        .style("border-top", "")
			        .style("height", this.options.tdStyle.height + "px")
			        .style("background-color", this.options.tdStyle.backgroundColor)
			        .style("text-align", this.options.tdStyle.textAlign);	

		    if(this.options.tdStyle.hover){
		    	var originalColor="";
		    	tbodyTr.on("mouseover",function(d,i){

		    		originalColor=d3.select(this).style("background-color");
		    		d3.select(this).style("background-color",()=>_this.options.thStyle.backgroundColor=="white"||""?
		    														"rgb(194, 194, 194)":_this.options.thStyle.backgroundColor)
		    	})
		    	tbodyTr.on("mouseout",function(){
		    		d3.select(this).style("background-color",originalColor);
		    	})
		    }	    	
	    }

	}
	D3table.prototype.getClickedTdText=function(){
		var _this=this;
		this.ele.selectAll(".TDclickable").on("click",function(){
			_this.dataCenter.clickedText=this.innerHTML;
			console.log(_this.dataCenter.clickedText);
		})

	}

	D3table.prototype.filterData=function(value){
		var data=[...this.data],
			column=[...this.options.toolbar.filterColumn];
		this.dataCenter.rendedColumn.length=0;
	    this.dataCenter.columnSelected.length=0;

	    var columnUnselectedIndex = this.dataCenter.columnUnselected.indexOf(value);
	        //push the column value if columnUnselected not contain it.
	    if (columnUnselectedIndex < 0) {
	        this.dataCenter.columnUnselected.push(value);
	    } else {
	        this.dataCenter.columnUnselected.splice(columnUnselectedIndex, 1);
	    }

	    column.forEach((d,i)=>{
	        if (this.dataCenter.columnUnselected.indexOf(d < 0)){
	            this.dataCenter.columnSelected.push(d);
	        }    	
	    })

	    data.forEach((d, i) => {
	        this.dataCenter.currentData[i] = {};
	        for (var k in d) {
	            if (this.dataCenter.columnUnselected.indexOf(k) < 0) {
	                this.dataCenter.currentData[i][k] = d[k];
	            }
	        }
	    })

	    for(var key in this.dataCenter.currentData[0]){
	    	if(this.dataCenter.currentData[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }
	    this.disabledSearch(this.dataCenter.rendedColumn,this.options.toolbar.columnSearched);
	}

	D3table.prototype.disabledSearch=function(column,search){
		var iptEle=this.ele.select(".search-input");
		if(type(search)=="String"){
			column.indexOf(search)<0?iptEle.property("disabled",true):iptEle.property("disabled",false);
		}else if(type(search)=="Array"){			
			var disabled=search.every((d)=>{
				return column.indexOf(d)<0;
			})
			disabled?iptEle.property("disabled",true):iptEle.property("disabled",false);
		}else{
			console.warn("the value of you want to search should be string or array");
		}
	}

	D3table.prototype.noData=function(element){
		var _this=this;
		this.ele.select(element)
				.select("tbody")
				.html(`<tr><td class="no-data" colspan="${_this.dataCenter.rendedColumn.length}">
								no data to display
							</td></tr>`);
	}
	D3table.prototype.fitThead=function(){
	    let widthArr=[],
	    	_this=this,
	    	doc=document,
	    	currentElement=doc.querySelector(this.name);
        currentElement.querySelectorAll(".fixed-tbody thead th").forEach(function(d,i){
        	widthArr.push(getStyle(d,"width"));
        })
        console.log(widthArr)
        currentElement.querySelectorAll(".fixed-thead thead th").forEach(function(d,i){
        	d.style.width=widthArr[i];
        })
	}

	D3table.prototype.windowResize=function(){
		if(this.windowResizeTimer)clearTimeout(this.windowResizeTimer);
		d3.select(window).on("resize."+this.name,()=>{
			this.windowResizeTimer= setTimeout(()=>{
				this.fitThead();
			},600)
		})	

	}
	function adaptThead(column,adaptObj){
	    var columnDispalyed=[];    
	    column.forEach(function(d,i){
	    	if(adaptObj[d]){
	    		columnDispalyed.push(adaptObj[d])
	    	}else{
	    		console.warn("not find table head's key")
	    	}
	    })
	    return columnDispalyed;		
	}
	function type (target){
		var type=Object.prototype.toString.call(target);
		return type.slice(8,type.length-1);
	}
	function ascendSort(data,key){
		data.sort(function(a, b) { return a[key].localeCompare(b[key]) });
	}
	function descendSort(data,key){
		data.sort(function(a, b) { return b[key].localeCompare(a[key]) });
	}

	function getStyle(ele,prop){
	    var style=window.getComputedStyle?window.getComputedStyle(ele, null):ele.currentStyle;     
	    return style[prop];
	}
    function assembleTheadValue(aTheadDisplayed, data) {
      var rendedColumn = [],
        theadConfig = {};
      for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          rendedColumn.push(key);
        }
      }
      rendedColumn.forEach(function(d, i) {
        theadConfig[d] = aTheadDisplayed[i];
      })
      return theadConfig;
    }	
	return function(ele,options,data){
	 	return new D3table(ele,options,data);
	}	
})()*/

var D3table=(function(){

	function D3table(ele,options,data){
		this.name=ele;
		this.ele=d3.select(ele);
		this.options={
			   			sort:options.sort||false,                                                     //sort table's row when click table's head 
			   			scroll:{
			   				able:options.scroll?(options.scroll.able||false):false,                   //show scroll 
			   				tableHeight:options.scroll?(options.scroll.tableHeight||300):300          //container's height
			   			},
					    thStyle:{                     												  //the style of table's head							
					    	backgroundColor: options.thStyle?(options.thStyle.backgroundColor||"white"):"white",
					    	textAlign: options.thStyle?(options.thStyle.textAlign||"center"):"center",
					    	color: options.thStyle?(options.thStyle.color||""):""
					    },	
					    tdStyle:{																	  //the style of table's row
					    	border:options.tdStyle?(options.tdStyle.border||""):"",
					    	backgroundColor: options.tdStyle?(options.tdStyle.backgroundColor||""):"",
					    	textAlign:options.tdStyle?(options.tdStyle.textAlign||"center"):"center",
					    	stripe: options.tdStyle?(options.tdStyle.stripe||false):false, 	    	  //show stripe row 
					    	odd:options.tdStyle?(options.tdStyle.odd||""):"",
					    	even:options.tdStyle?(options.tdStyle.even||""):"",
					    	hover:options.tdStyle?(options.tdStyle.hover||false):false         	 	  //change background color when hovering
					    },
						toolbar:{  
							sortBy:options.toolbar?(options.toolbar.sortBy||[]):[],                   	  //show tool
							filterColumn:options.toolbar?(options.toolbar.filterColumn||[]):[], 	  //filter column
							columnSearched:options.toolbar?(options.toolbar.columnSearched||[]):[],   //search target column's value
							placeholderTxt:options.toolbar?(options.toolbar.placeholderTxt||""):""
						},
						mark:{																			
							column:options.mark?(options.mark.column||[]):[],						   //mark special column
							icon:options.mark?(options.mark.icon||""):""					   //add icon
						},
						clickable:options.clickable||[],
						theadConfig:assembleTheadValue(options.theadDisplayed, data)||{}
					};

		this.data=data;
		this.dataCenter={
	        columnUnselected:[],
	        columnSelected:[...this.options.toolbar.filterColumn],
	       	currentData:[...data],
	       	rendedColumn:[],
	       	designated:"",
	       	clickedText:"",
		}

	    for(var key in this.data[0]){
	    	if(this.data[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }	
	}

	D3table.prototype.init=function(){
		this.initContainer();
		this.initToolbar();
		 if(this.options.scroll.able){
			this.initThead(".fixed-thead",this.dataCenter.rendedColumn);
			this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
			this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.currentData)
			this.fitThead();
			this.windowResize();
		 }else{
			this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
			this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.currentData)
		 }
		this.getClickedTdText()
	}

	D3table.prototype.initContainer=function(){
		this.ele.html(
			`<div class="bi-table">
				<div class="table-toolbar"></div>

				<div class="table-container">
					<div class="responsive-thead">
						<div class="fixed-head-table">
							<table class="fixed-thead"></table>
						</div>
					</div>
					<div class="table-body">
						<table class="fixed-tbody"></table>
					</div>
				</div>
				<div class="table-footer"></div>
			</div>`
			)
	}

	D3table.prototype.initToolbar=function(){
		this.filterColumnTool(this.options.toolbar.filterColumn)
		this.searchTool(this.options.toolbar.columnSearched)
		this.sortByTool(this.options.toolbar.sortBy)
		this.clearFloat(".table-toolbar")
	}
	D3table.prototype.filterColumnTool=function(t_value){
		var _this=this,
			column=[...this.options.toolbar.filterColumn];		
		if(t_value&&t_value.length>0){
					var filterColumnBox=this.ele.select(".table-toolbar")
							.append("div")
							.attr("class","filter-column");
				    var columnSerie = filterColumnBox.append("ul")
				        .attr("class", "column-series");

				    var toggleButton = filterColumnBox.append("i")
				        .attr("class", "icon icon-menu");
			        toggleButton.on("click", function() {
			            var columnSerieDisplay = columnSerie.style("display");
			            if (columnSerieDisplay == "none") {
			                columnSerie.style("display", "block")
			            } else {
			                columnSerie.style("display", "none")
			            }
			        });

				    var optionLi = columnSerie.selectAll("li")
				        .data(column)
				        .enter()
				        .append("li");

				    var optionLabel = optionLi.append("label");
				    
				    optionLabel.append("input")
				        .attr("type", "checkbox")
				        .attr("checked", true)
				        .attr("value", d => d)
				        .on("click", function() {
				        	_this.ele.select(".search-input").property("value","")
				        	_this.filterData(this.value)
							 if(_this.options.scroll.able){
								_this.initThead(".fixed-thead",_this.dataCenter.rendedColumn);
								_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
								_this.fitThead();
							 }else{
								_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
							 }
							columnSerie.style("display", "none")

				        });

				    optionLabel.append("span")
				        .text(d => d);	        					
		}		
	}
	D3table.prototype.searchTool=function(t_value){
		var _this=this;

		if(t_value&&t_value.length>0){
					var searchTool=this.ele.select(".table-toolbar")
							.append("div")
							.attr("class","search-tool");

					var columnSearched=this.options.toolbar.columnSearched;
					searchTool.html(`<div class='search-box'>
										<i class='icon icon-search'></i>
										<input type='text' class='search-input' title="${_this.options.toolbar.placeholderTxt}"  placeholder="${_this.options.toolbar.placeholderTxt}">
									 </div>`)

					searchTool.select(".search-input")
							  .on("keyup",function(event){
							  		var timer=null,
							  			inputContext=this,
							  			value=this.value.trim(),
							  			data=[..._this.data];
							  		timer=setTimeout(function(){
							  			if(timer)clearTimeout(timer);
							  			_this.dataCenter.currentData.length=0;
							  			data.forEach(function(d,i){
							  				if(d[t_value].indexOf(value)>=0){
							  					_this.dataCenter.currentData.push(d);
							  				}
							  			})
										_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
										 if(_this.options.scroll.able){
											_this.fitThead();
										 }

							  		},300)
							  });
		}		
	}
	D3table.prototype.sortByTool=function(t_value){
		var _this=this;		
		if(t_value&&t_value.length>0){
					var sortBy=this.ele.select(".table-toolbar")
										.append("div")
										.attr("class","sort-by")
										.html(`<span class="prompt">Sort By</span>
										   	  <div class="selection">
												<div class="sort-selected">
													<span class="selected-value"></span>
													<i class="glyphicon glyphicon-menu-down"></i>
												</div>
												<div class="select-ul"></div>
										   	  </div>`);

					var selectUl=sortBy.select(".select-ul").append("ul"),
						item=selectUl.selectAll("li")
							.data(t_value)
							.enter()
							.append("li")
							.text(d=>d);
					sortBy.select(".selected-value").html(t_value[0]);
					this.dataCenter.designated=t_value[0];

					item.on("click",function(){
						_this.dataCenter.designated=this.innerHTML;
						sortBy.select(".selected-value").text(this.innerHTML);
			            sortBy.select(".select-ul").style("display", "none")
					});

					sortBy.select(".sort-selected").on("click",function(){
						var selectUlDisplay = sortBy.select(".select-ul").style("display");
			            if (selectUlDisplay == "none") {
			                 sortBy.select(".select-ul").style("display", "block")
			            } else {
			                 sortBy.select(".select-ul").style("display", "none")
			            }
					});
		}		
	}
	D3table.prototype.clearFloat=function(parent){
		this.ele.select(parent).append("div")
								   .attr("class","clearfix");		
	}

	D3table.prototype.initThead=function(context, column){
		var columnDispalyed=adaptThead(column,this.options.theadConfig);
	    var theadEle =this.ele.select(context).selectAll("thead")
	    if (theadEle) theadEle.remove();
	    var ele=d3.select(".thead-text").parentNode
	    var _this=this,
	    	thead = this.ele.select(context).append("thead"),
	    	theadTr = thead.append("tr"),
	    	theadTh = theadTr.selectAll("th")
	        .data(columnDispalyed)
	        .enter()
	        .append("th")
	        .attr("class", "defalut-sort")
	        .style("background-color", _this.options.thStyle.backgroundColor)
	        .style("height", _this.options.thStyle.height+"px")
	        .style("text-align", _this.options.thStyle.textAlign)
	        .style("color", _this.options.thStyle.color);
	    if (_this.options.sort&&context===".fixed-thead") {
	    	var theadText=theadTh.append("span")
	    					   .attr("class","thead-text")
				     	       .text(d => {
						            if (_this.dataCenter.columnUnselected.indexOf(d) >= 0) return;
						            return d;
						        });
	    	var theadIcon=theadTh.append("i")
	    					   .attr("class","icon icon-arrow-default");
	        theadText.style("cursor", "pointer");
	        theadText.on("click", function() {
	    		var _data = [..._this.dataCenter.currentData],
	    			tConfig=_this.options.theadConfig,
	    			thValue=null,
	    			textClicked=this.innerHTML;
	    		for(var k in tConfig){
	    			if(tConfig.hasOwnProperty(k)&&tConfig[k]===textClicked){
	    				thValue=k;
	    			}
	    		}
	    		var thisIcon=d3.select(this.parentNode).select("i");
	            if (thisIcon.attr("class") == "icon icon-arrow-default") {
	            	theadIcon.attr("class", "icon icon-arrow-default");
	                thisIcon.attr("class", "icon icon-arrow-up");
	                ascendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column, _data)
	            } else if (thisIcon.attr("class") == "icon icon-arrow-up") {
	            	theadIcon.attr("class", "icon icon-arrow-default");
	                thisIcon.attr("class", "icon icon-arrow-down");
	                descendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column ,_data)
	            } else if (thisIcon.attr("class") == "icon icon-arrow-down") {
	            	theadIcon.attr("class", "icon icon-arrow-default");
	                thisIcon.attr("class","icon icon-arrow-up");
					ascendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column, _data);	                
	            }
	        });
	    }
	}

	D3table.prototype.initTbody=function(context,column,data){
		var columnDispalyed=adaptThead(column,this.options.theadConfig),
			tbodyEle = this.ele.select(context).selectAll("tbody"),
	    	_this=this;

	    if (tbodyEle) tbodyEle.remove();
	    var tbody = this.ele.select(context).append("tbody");

	    if(data&&data.length===0){
	    	this.noData(context);
	    }else{
		    if(this.options.scroll.able){
			    this.ele.select(".table-body").style("overflow","auto")
			    						.style("height",this.options.scroll.tableHeight+"px");    
		    }

		    var tbodyTr = tbody.selectAll("tr")
		        .data(data)
		        .enter()
		        .append("tr")
		        .style("background-color", (d,i)=>{
		        	if(this.options.tdStyle.stripe)return i%2?this.options.tdStyle.even:this.options.tdStyle.odd;
		        });

		    tbodyTr.selectAll("td")
			        .data(row=>{
			            return column.map(col=>{
			                return { value: row[col],key:col};
			            });
			        })
			        .enter()
			        .append("td")
			        .attr("class",(d,i)=>{

			        	var name="";
			        	if(this.options.mark.column.length>=0&&this.options.mark.column.indexOf(this.options.theadConfig[d.key])>=0){
			        		name+=" "+this.options.mark.icon;
			        	}
			        	if(this.options.clickable.length>0&&this.options.clickable.indexOf(this.options.theadConfig[d.key])>=0){
			        		name+=" TDclickable";
			        	}
			        	return name;
			        })
			        .text(function(d) {
			            return d.value;
			        })
			        .style("border",()=>{
			        	if(this.options.tdStyle.border){
			        		//this.ele.select(".table-container").style("border-bottom",this.options.tdStyle.border)
			        		return this.options.tdStyle.border;
			        	}
			        })
			        .style("border-top", "")
			        .style("height", this.options.tdStyle.height + "px")
			        .style("background-color", this.options.tdStyle.backgroundColor)
			        .style("text-align", this.options.tdStyle.textAlign);	

		    if(this.options.tdStyle.hover){
		    	var originalColor="";
		    	tbodyTr.on("mouseover",function(d,i){

		    		originalColor=d3.select(this).style("background-color");
		    		d3.select(this).style("background-color",()=>_this.options.thStyle.backgroundColor=="white"||""?
		    														"rgb(194, 194, 194)":_this.options.thStyle.backgroundColor)
		    	})
		    	tbodyTr.on("mouseout",function(){
		    		d3.select(this).style("background-color",originalColor);
		    	})
		    }	    	
	    }

	}
	D3table.prototype.getClickedTdText=function(){
		var _this=this;
		this.ele.selectAll(".TDclickable").on("click",function(){
			_this.dataCenter.clickedText=this.innerHTML;
			console.log(_this.dataCenter.clickedText);
		})
	}
	D3table.prototype.filterData=function(value){
		var data=[...this.data],
			column=[...this.options.toolbar.filterColumn];
		this.dataCenter.rendedColumn.length=0;
	    this.dataCenter.columnSelected.length=0;

	    var columnUnselectedIndex = this.dataCenter.columnUnselected.indexOf(value);
	        //push the column value if columnUnselected not contain it.
	    if (columnUnselectedIndex < 0) {
	        this.dataCenter.columnUnselected.push(value);
	    } else {
	        this.dataCenter.columnUnselected.splice(columnUnselectedIndex, 1);
	    }
	    column.forEach((d,i)=>{
	        if (this.dataCenter.columnUnselected.indexOf(d < 0)){
	            this.dataCenter.columnSelected.push(d);
	        }    	
	    })
	    data.forEach((d, i) => {
	        this.dataCenter.currentData[i] = {};
	        for (var k in d) {
	            if (this.dataCenter.columnUnselected.indexOf(k) < 0) {
	                this.dataCenter.currentData[i][k] = d[k];
	            }
	        }
	    })
	    for(var key in this.dataCenter.currentData[0]){
	    	if(this.dataCenter.currentData[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }
	    this.disabledSearch(this.dataCenter.rendedColumn,this.options.toolbar.columnSearched);
	}
	D3table.prototype.disabledSearch=function(column,search){
		var iptEle=this.ele.select(".search-input");
		if(type(search)=="String"){
			column.indexOf(search)<0?iptEle.property("disabled",true):iptEle.property("disabled",false);
		}else if(type(search)=="Array"){			
			var disabled=search.every(d=>column.indexOf(d)<0)
			disabled?iptEle.property("disabled",true):iptEle.property("disabled",false);
		}else{
			console.warn("the value of you want to search should be string or array");
		}
	}
	D3table.prototype.noData=function(element){
		var _this=this;
		this.ele.select(element)
				.select("tbody")
				.html(`<tr><td class="no-data" colspan="${_this.dataCenter.rendedColumn.length}">
								no data to display
							</td></tr>`);
	}
	D3table.prototype.fitThead=function(){
	    var widthArr=[],
	    	_this=this,
	    	doc=document,
	    	currentElement=doc.querySelector(this.name);
        currentElement.querySelectorAll(".fixed-tbody thead th").forEach(function(d,i){
        	// widthArr.push(getStyle(d,"width"));
        	widthArr.push(d.offsetWidth);
        })
        currentElement.querySelectorAll(".fixed-thead thead th").forEach(function(d,i){
        	d.style.width=widthArr[i]+"px";
        })
	}
	D3table.prototype.windowResize=function(){
		if(this.windowResizeTimer)clearTimeout(this.windowResizeTimer);
		d3.select(window).on("resize."+this.name,()=>{
			this.windowResizeTimer= setTimeout(()=>{
				this.fitThead();
			},1000)
		})	

	}
	function adaptThead(column,adaptObj){
	    var columnDispalyed=[];    
	    column.forEach(function(d,i){
	    	if(adaptObj[d]){
	    		columnDispalyed.push(adaptObj[d])
	    	}else{
	    		console.warn("not find table head's key")
	    	}
	    })
	    return columnDispalyed;		
	}
	function type (target){
		var type=Object.prototype.toString.call(target);
		return type.slice(8,type.length-1);
	}
	function ascendSort(data,key){
		data.sort((a,b)=>a[key].localeCompare(b[key]));
	}
	function descendSort(data,key){
		data.sort((a,b)=>b[key].localeCompare(a[key]));
	}

	function getStyle(ele,prop){
	    var style=window.getComputedStyle?window.getComputedStyle(ele, null):ele.currentStyle;     
	    return style[prop];
	}
    function assembleTheadValue(aTheadDisplayed, data) {
      var rendedColumn = [],
        theadConfig = {};
      for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          rendedColumn.push(key);
        }
      }
      rendedColumn.forEach(function(d, i) {
        theadConfig[d] = aTheadDisplayed[i];
      })
      return theadConfig;
    }
	
	return function(ele,options,data){
	 	return new D3table(ele,options,data);
	}	
})();