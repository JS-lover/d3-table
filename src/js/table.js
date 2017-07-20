import "../css/d3-table.css";
import "../css/style.css";

import * as d3 from "d3"
var biTable=(function(){

	function biTable(ele,options,data){
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
					    	height:options.thStyle?(options.thStyle.height||24):24,
					    	textAlign: options.thStyle?(options.thStyle.textAlign||"center"):"center"
					    },	
					    tdStyle:{																	  //the style of table's row
					    	border:options.tdStyle?(options.tdStyle.border||""):"",
					    	backgroundColor: options.tdStyle?(options.tdStyle.backgroundColor||""):"",
					    	textAlign:options.tdStyle?(options.tdStyle.textAlign||"center"):"center",
					    	height:options.tdStyle?(options.tdStyle.height||28):28, 	
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
						}
					};

		this.data=data;
		this.dataCenter={
	        columnUnselected:[],
	        columnSelected:[...this.options.toolbar.filterColumn],
	       	dataFilterByColumn:[...data],
	       	rendedColumn:[],
	       	designated:""
		}

	    for(var key in this.data[0]){
	    	if(this.data[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }	
	}

	biTable.prototype.init=function(){
		this.initContainer();
		this.initToolbar();
		this.initThead(".fixed-thead",this.dataCenter.rendedColumn);
		this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
		this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.dataFilterByColumn)
		this.fitThead();

		d3.select(window).on("resize."+this.name,()=>{
				this.responsiveThead(this.ele.select(".fixed-tbody"),this.ele.select(".table-body"),this.ele.select(".fixed-head-table"));	
		})
	}

	biTable.prototype.initContainer=function(){
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

	biTable.prototype.initToolbar=function(){
		var _this=this,
			column=[...this.options.toolbar.filterColumn];

		if(this.options.toolbar.filterColumn&&this.options.toolbar.filterColumn.length>0){

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
					_this.initThead(".fixed-thead",_this.dataCenter.rendedColumn);
					_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
					_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.dataFilterByColumn);
					_this.fitThead();
					columnSerie.style("display", "none")

		        });

		    optionLabel.append("span")
		        .text(d => d);	        					
		}

		if(this.options.toolbar.columnSearched&&this.options.toolbar.columnSearched.length>0){
			var searchTool=this.ele.select(".table-toolbar")
					.append("div")
					.attr("class","search-tool");

			var columnSearched=this.options.toolbar.columnSearched,
				_this=this;
				//placeholderTxt="";
			/*if(type(columnSearched)){
				columnSearched.forEach((d,i)=>{
					if(i===0){
						placeholderTxt+=d;
					}else{
						placeholderTxt+="\\" +d;
					}
				})
			}*/
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
					  			_this.dataCenter.dataFilterByColumn.length=0;
					  			data.forEach(function(d,i){
					  				if(d[_this.options.toolbar.columnSearched].indexOf(value)>=0){
					  					_this.dataCenter.dataFilterByColumn.push(d);
					  				}
					  			})
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.dataFilterByColumn);
					  		},300)
					  });
		}

		if(this.options.toolbar.sortBy&&this.options.toolbar.sortBy.length>0){
			var _this=this,
				value=this.options.toolbar.sortBy,
				sortBy=this.ele.select(".table-toolbar")
								.append("div")
								.attr("class","sort-by")
								.html(`<span class="prompt">Sort By</span>
								   	  <div class="selection">
										<div class="sort-selected">
											<span class="selected-value"></span>
											<i class="icon icon-dropdown"></i>
										</div>
										<div class="select-ul"></div>
								   	  </div>`);

			var selectUl=sortBy.select(".select-ul").append("ul"),
				item=selectUl.selectAll("li")
					.data(value)
					.enter()
					.append("li")
					.text((d,i)=>{
						return d;
					});
			sortBy.select(".selected-value").html(value[0]);
			this.dataCenter.designated=value[0];

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

		this.ele.select(".table-toolbar").append("div")
								   .attr("class","clearfix");
	}

	biTable.prototype.initThead=function(context, column){
	    var theadEle =this.ele.select(context).selectAll("thead")
	    if (theadEle) theadEle.remove();

	    var _this=this,
	    	thead = this.ele.select(context).append("thead"),
	    	theadTr = thead.append("tr"),
	    	theadTh = theadTr.selectAll("th")
	        .data(column)
	        .enter()
	        .append("th")
	        .text(d => {
	            if (_this.dataCenter.columnUnselected.indexOf(d) >= 0) return;
	            return d;
	        })
	        .attr("class", "defalut-sort")
	        .style("background-color", _this.options.thStyle.backgroundColor)
	        .style("height", _this.options.thStyle.height+"px")
	        .style("text-align", _this.options.thStyle.textAlign);

	        //this.ele.select(".responsive-thead").style("background-color", () => _this.options.thStyle.backgroundColor)
	    if (_this.options.sort&&context===".fixed-thead") {

	        theadTh.style("cursor", "pointer");
	        theadTh.on("click", function() {
	    		var _data = [..._this.dataCenter.dataFilterByColumn],
	    			textClicked = this.innerHTML;

	            if (d3.select(this).attr("class") == "defalut-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "ascend-sort");
	                ascendSort(_data,textClicked);

	                _this.initTbody(".fixed-tbody", column, _data)
	            } else if (d3.select(this).attr("class") == "ascend-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "descend-sort");
	                descendSort(_data,textClicked);

	                _this.initTbody(".fixed-tbody", column ,_data)
	            } else if (d3.select(this).attr("class") == "descend-sort") {
	                theadTh.attr("class", "defalut-sort");
	                d3.select(this).attr("class", "ascend-sort");
					ascendSort(_data,textClicked);

	                _this.initTbody(".fixed-tbody", column, _data);
	            }
	        });
	    }
	}

	biTable.prototype.initTbody=function(context,column,data){
	    var tbodyEle = this.ele.select(context).selectAll("tbody"),
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
			        	if(this.options.mark.column.length>=0&&this.options.mark.column.indexOf(d.key)>=0){
			        		return this.options.mark.icon;
			        	}
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

	    //this.responsiveThead(this.ele.select(".fixed-tbody"),this.ele.select(".table-body"),this.ele.select(".fixed-head-table"));	
	}

	biTable.prototype.filterData=function(value){
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
	        this.dataCenter.dataFilterByColumn[i] = {};
	        for (var k in d) {
	            if (this.dataCenter.columnUnselected.indexOf(k) < 0) {
	                this.dataCenter.dataFilterByColumn[i][k] = d[k];
	            }
	        }
	    })

	    for(var key in this.dataCenter.dataFilterByColumn[0]){
	    	if(this.dataCenter.dataFilterByColumn[0].hasOwnProperty(key)){
	    		this.dataCenter.rendedColumn.push(key);
	    	}
	    }
	    this.disabledSearch(this.dataCenter.rendedColumn,this.options.toolbar.columnSearched);
	}

	biTable.prototype.disabledSearch=function(column,search){
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
	biTable.prototype.responsiveThead=function(innerTable,outerTable,thead){
		if(outerTable.style("width")!=innerTable.style("width")){
			thead.style("width",innerTable.style("width"));
		}
	}
	biTable.prototype.getStyle=function(ele,prop){
	    var style=window.getComputedStyle?window.getComputedStyle(ele, null):ele.currentStyle;     
	    return style[prop];
	}
	biTable.prototype.noData=function(element){
		var _this=this;
		this.ele.select(element)
				.select("tbody")
				.html(`<tr><td class="no-data" colspan="${_this.dataCenter.rendedColumn.length}">
								no data to display
							</td></tr>`);
	}
	biTable.prototype.fitThead=function(){
	    var widthArr=[],
	    	_this=this,
	    	doc=document;
        doc.querySelectorAll(".fixed-tbody th").forEach(function(d,i){

        	widthArr.push(_this.getStyle(d,"width"));
        })
        doc.querySelectorAll(".fixed-thead th").forEach(function(d,i){
        	d.style.width=widthArr[i];
        })
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

	return function(ele,options,data){
	 	return new biTable(ele,options,data);
	}	
})();

export default biTable