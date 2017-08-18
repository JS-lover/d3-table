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
						theadConfig:options.theadConfig||{}
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
		this.fixedTheadEle=null;

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
			this.initThead(".fixed-tbody",this.dataCenter.rendedColumn);
			this.initTbody(".fixed-tbody",this.dataCenter.rendedColumn,this.dataCenter.currentData)
			this.cloneThead()
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
								_this.initThead(".fixed-tbody",_this.dataCenter.rendedColumn);
								_this.initTbody(".fixed-tbody",_this.dataCenter.rendedColumn,_this.dataCenter.currentData);
								_this.cloneThead()
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

	D3table.prototype.initThead=function(context, column){
		var columnDispalyed=adaptThead(column,this.options.theadConfig);
	    var theadEle =this.ele.select(context).selectAll("thead")
	    if (theadEle) theadEle.remove();
	    //var ele=d3.select(".thead-text").parentNode
	    var _this=this,
	    	thead = this.ele.select(context).append("thead"),
	    	theadTr = thead.append("tr"),
	    	theadTh = theadTr.selectAll("th")
	        .data(columnDispalyed)
	        .enter()
	        .append("th")
	        .attr("class", "defalut-sort");
	    if (_this.options.sort) {
	    	var theadText=theadTh.append("span")
	    					   .attr("class","thead-text")
				     	       .text(d => {
						            if (_this.dataCenter.columnUnselected.indexOf(d) >= 0) return;
						            return d;
						        });
	    	var theadIcon=theadTh.append("i")
	    					   .attr("class","icon-sort");
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
	            if (thisIcon.attr("class") == "icon-sort") {
	            	theadIcon.attr("class", "icon-sort");
	                thisIcon.attr("class", "icon-arrow-up");
	                ascendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column, _data)
	            } else if (thisIcon.attr("class") == "icon-arrow-up") {
	            	theadIcon.attr("class", "icon-sort");
	                thisIcon.attr("class", "icon-arrow-down");
	                descendSort(_data,thValue);

	                _this.initTbody(".fixed-tbody", column ,_data)
	            } else if (thisIcon.attr("class") == "icon-arrow-down") {
	            	theadIcon.attr("class", "icon-sort");
	                thisIcon.attr("class","icon-arrow-up");
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
		        .append("tr");
		    var tbodyTd=tbodyTr.selectAll("td")
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
			        	if(d.key=="actions"||d.key=="status"){
			        		return d.key;
			        	}
			        	if(d.value.type=="tip"){
			        		return d.value.type;
			        	}
			        	return name;
			        })

			        .html(function(d) {

			        	var type =d.key,
			        	    type_ =d.value.type,
			        	    content=d.value,
			        		html="";

			        	if(type&&type=="actions"){
			        		content.forEach((d,i)=>{
				        		html+=`<i class=${d.class}></i>`
				        	})
				            return html;
			        	}else if(type=="status"){
			        		content.forEach((d,i)=>{
			        			html+=`<i class=${d.class}></i>${d.value}`
			        		})
		           			return html;			        		
			        	}else if(type_&&type_=="tip"){
			        		return html+=`<span class="tip-title">${content.title}</span>`;
			        	}else{
			        		return content;
			        	}
			        }) 
					var _this=this;
					d3.selectAll(".actions").on("click",function(d){
						var targetClassName=d3.event.target.className,
							targetRowData=d3.select(d3.event.target.parentNode.parentNode).data(),
							currentData=_this.dataCenter.currentData,
							targetUseName=targetRowData[0].useName,
							clickedIndex=null,
							targetRowDataValues=Object.values(targetRowData[0]);
						for(let i=0;i<currentData.length;i++){
							if(currentData[i]["useName"]==targetUseName){
								clickedIndex=i+1;
								break;
							}
						}

						if(targetClassName=="icon-pencil"){
							/*if(_this.ele.select(".edit-table-box"))_this.ele.select(".edit-table-box").remove()
							var rowEditor=_this.ele.select(".table-body").append("div")
									 .attr("class","edit-table-box")
									 .style("top",clickedIndex*28+"px");
							rowEditor.html(
									`<table class="table-editor">
										<tbody>
											<tr>
											</tr>
										</tbody>
									</table>`)

							var editConfiger=[{
												name:"useName",type:"input"
											},{
												name:"email",type:"input"
											},{
												name:"company",type:"select"
											},{
												name:"process",type:"select"
											},{
												name:"role",type:"selectFixedValue"
											},{
												name:"status",type:"none"
											},{
												name:"actions",type:"icon"
											}]
							editConfiger.forEach((d,i)=>{
								for(let k in targetRowData[0]){
									if(targetRowData[0].hasOwnProperty(k)&&k==d.name){
										d.value=targetRowData[0][k];
										continue;
									}
								}
							})
							console.log(editConfiger)
							_this.ele.selectAll(".table-editor tbody tr").selectAll("td")
									 .data(editConfiger)
									 .enter()
									 .append("td")
									 .html(d=>{
									 	if(d.type=="input"){
									 		return `<input type="text" class="editor-input editor-input-${d.name}" value=${d.value}></input>`
									 	}
									 	if(d.type=="select"){
									 		return `<select class="editor-select editor-select-${d.name}" value=${d.value}>
														<option></option>
														<option></option>
									 				</select>`
									 	}
									 	if(d.type=="none"){
									 		return d.value;
									 	}
									 	if(d.type=="selectFixedValue"){
									 		return `<select class="editor-select editor-select-${d.name}" value=${d.value}>
														<option>Sales</option>
														<option>admin</option>
									 				</select>`
									 	}
									 	if(d.type=="icon"){
									 		return 	`<i class='icon-save'></i>
									 				 <i class='icon-delete-disable'></i>
									 				 Enable<i class='icon-disable-toggle'></i>`;
									 	}
									 })
					        _this.ele.node().querySelectorAll(".table-editor tbody td").forEach(function(d,i){
					        	d.style.width=widthArr[i]+"px";
					        })*/


						}
						if(targetClassName=="icon-enable-active"){
							console.log("icon-enable-active")
						}
						if(targetClassName=="icon-enable-reject"){
							console.log("icon-enable-active")
						}
					})

					d3.selectAll(".tip-title").on("mouseover",function(d){
						var event=d3.event;
						if(_this.ele.select(".tooltip"))_this.ele.select(".tooltip").remove()
						var targetNode=d3.event.target,
						 	ptNode=targetNode.parentNode,
							targetRowData=d3.select(ptNode).data();

						var rowEditor=_this.ele.select(".table-body").append("div")
								 .attr("class","tooltip")

						rowEditor.selectAll("p")
								 .data(targetRowData[0]["value"]["list"])
								 .enter()
								 .append("p")
								 .html(d=>d)
						rowEditor.style("top",20+ptNode.offsetTop-rowEditor.node().offsetHeight/2+"px")
								 .style("left",18+ptNode.offsetLeft+targetNode.offsetWidth+"px");
						console.log(rowEditor.node().offsetHeight)
					})
					d3.selectAll(".tip-title").on("mouseout",function(d){
						 if(_this.ele.select(".tooltip"))_this.ele.select(".tooltip").remove()
					})

	    }
	}
	D3table.prototype.cloneThead=function(){
		var _this=this,
			widthArr=[],
	    	doc=document,
	    	nodeHeight=null,
	    	currentElement=doc.querySelector(_this.name);
			var originNode=currentElement.querySelector(".fixed-tbody thead");

        	if(_this.fixedTheadEle){d3.select(".scroll-thead").remove();}
    		_this.fixedTheadEle=d3.select(_this.name).select(".table-body").append("table").attr("class","scroll-thead");
    		var newNode=originNode.cloneNode(true);
    		d3.select(newNode).selectAll(".icon-sort").remove();
    		d3.select(newNode).selectAll(".icon-arrow-up").remove();
    		d3.select(newNode).selectAll(".icon-arrow-down").remove();

	        currentElement.querySelector(".scroll-thead").appendChild(newNode);
        	_this.fixedTheadEle.style("position","absolute")
        					   .style("display","none")

		this.ele.select(".table-body").on("scroll."+_this.name,()=>{
			if(widthArr.length===0){
				_this.getTdsWidth(currentElement,".fixed-tbody thead th",widthArr);
			}
	        if(nodeHeight==null)nodeHeight=originNode.offsetHeight;
	        newNode.querySelectorAll("th").forEach(function(d,i){
	        	d.style.width=widthArr[i]+"px";
	        })
     		this.toggleThead(currentElement,nodeHeight)
		})
	}
	D3table.prototype.getTdsWidth=function(ele,seletor,result){
        ele.querySelectorAll(seletor).forEach(function(d,i){
        	result.push(d.offsetWidth);
        })			
	}
	D3table.prototype.toggleThead=function(ele,theadHeight){
			var sTop=ele.querySelector(".table-body").scrollTop,
				scrollThead=d3.select(ele).select(".scroll-thead");

	       	scrollThead.style("top",sTop+"px");	 
	        if(sTop>theadHeight&&scrollThead.style("display")=="none"){
	        	scrollThead.style("display","block")
	        }else if(sTop<theadHeight&&scrollThead.style("display")=="block"){
	        	scrollThead.style("display","none")
	        }  		
	}

	
	D3table.prototype.getClickedTdText=function(){
		var _this=this;
		this.ele.selectAll(".TDclickable").on("click",function(){
			_this.dataCenter.clickedText=this.innerHTML;
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
	D3table.prototype.clearFloat=function(parent){
		this.ele.select(parent).append("div")
								   .attr("class","clearfix");		
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
		data.sort((a,b)=>{
			if(/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])){
				var A=a[key].substr(0,a[key].length-1),
					B=b[key].substr(0,b[key].length-1);
				return Number(A)-Number(B);
			}else if((typeof a[key])!="number"){
				return a[key].localeCompare(b[key]);
			}else{
				return a[key]-b[key];
			}
			
		});
	}
	function descendSort(data,key){
		data.sort((a,b)=>{
			if(/^((\d+\.?\d*)|(\d*\.\d+))\%$/.test(a[key])){
				var A=a[key].substr(0,a[key].length-1),
					B=b[key].substr(0,b[key].length-1);
				return Number(B)-Number(A);
			}else if((typeof a[key])!="number"){
				return b[key].localeCompare(a[key]);
			}else{
				return b[key]-a[key];
			}
		});
	}

	return function(ele,options,data){
	 	return new D3table(ele,options,data);
	}	
})();