
function del_duplicate_HandlerObject() {
};


del_duplicate_HandlerObject.prototype = new ZmZimletBase();
del_duplicate_HandlerObject.prototype.constructor = del_duplicate_HandlerObject;

dasfdasfdasfdasfasdfdasfdasfasfasfasfdasfs
del_duplicate_HandlerObject.prototype.init = function() {
	this
};
del_duplicate_HandlerObject.prototype.doubleClicked = function() {	
	this.e._displayDialog = function() {

	if (this.preferenceDialog) {
		this.preferenceDialog.popup(); 
		this.contentList = new EmailContentPrefs();
		this.repeatedList = new EmailRepeatedPrefs();
		this.showRepeatMail();
		return;
	}	
	
	var preferenceView = new DwtComposite(this.getShell()); 
	preferenceView.setSize("200", "150");
	preferenceView.getHtmlElement().style.overflow = "auto"; 
	preferenceView.getHtmlElement().innerHTML = this.createDialogpreferenceView(); 
	
	Dwt.setHandler(document.getElementById("deleteEqual"), DwtEvent.ONCLICK, AjxCallback.simpleClosure(this.deleteEqualEml, this));
	Dwt.setHandler(document.getElementById("getInfo"), DwtEvent.ONCLICK, AjxCallback.simpleClosure(this._getAllEmlInfo, this));
	
	this.preferenceDialog = new ZmDialog( { title:"Duplicate  Messages  Setting", view:preferenceView, parent:this.getShell(), standardButtons:[DwtDialog.OK_BUTTON, DwtDialog.CANCEL_BUTTON] } );
	this.preferenceDialog.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this._okBtnListener));
	this.preferenceDialog.setButtonListener(DwtDialog.CANCEL_BUTTON, new AjxListener(this, this._okBtnListener));

	this.preferenceDialog.popup();
	
};

del_duplicate_HandlerObject.prototype.createDialogpreferenceView = function() {
	var html = new Array();
	var i = 0;
	html[i++] = "<table>";
	html[i++] = "<tr>";
	html[i++] = "<td><input id='deleteEqual'  type='button' class='classbutton-delete' value='Delete all'/></td>";
	html[i++] = "</tr>";
	html[i++] = "<tr>";
	html[i++] = "<td><input id='getInfo'  type='button' class='classbutton-infor' value='Get Information'/></td>";
	html[i++] = "</tr>";
	html[i++] = "</table>";

	return html.join("");
};

del_duplicate_HandlerObject.prototype._okBtnListener =function() {
	this.preferenceDialog.popdown(); 
}

del_duplicate_HandlerObject.prototype.resetView = function() {
	try {
		q="in:inbox";
		appCtxt.getSearchController().search({query:q});
	} catch(e) {
	}
};

del_duplicate_HandlerObject.prototype.showRepeatMail = function(){
	var msgArray = appCtxt.getCurrentController().getList().getArray();
//	console.log(msgArray);
	for(var i =0 ; i < msgArray.length ; i++){
		content=msgArray[i].fragment;
		var contentInfo = this.contentList.getByContent(content);
		if (!contentInfo) {
			contentInfo = new EmailContent(content,msgArray[i].msgIds[0]);
			this.contentList.add(contentInfo);
		}
		else{
			var a = this.getMsgInfo(msgArray[i].msgIds[0]);
			var b = this.getMsgInfo(contentInfo.getId());
			a = this.CleanSpace(a);
			b = this.CleanSpace(b);
			if( a == b ){
				this.repeatedList.add(contentInfo.getId(),i);
				this.repeatedList.add(msgArray[i].msgIds[0],i);	
			}
	//		console.log("-----------------------");
		}
	}
//	console.log("repeat");
//	console.log(this.repeatedList);
//	console.log("content");
//	console.log(this.contentList);

}

del_duplicate_HandlerObject.prototype.deleteEqualEml = function(){
	var msgArray = appCtxt.getCurrentController().getList().getArray();
	var O_Array = this.repeatedList.getOrderArray();
	for(var i =1 ; i < O_Array.length ; i++){
		if(O_Array[i] == O_Array[i-1]){
			msgArray[O_Array[i]].move(4,null,this._handlErrorResponse);			
//			console.log(" move success!!");
		}
	}
	this.preferenceDialog.popdown();
}

//get all message information
del_duplicate_HandlerObject.prototype._getAllEmlInfo = function (){
	
	var getInforView = new DwtComposite(this.getShell());
	getInforView.setSize(600, 300);
	getInforView.getHtmlElement().style.overflow = "auto"; 
	getInforView.getHtmlElement().innerHTML = this.htmlgetInforView();
	
	Dwt.setHandler(document.getElementById("box"), DwtEvent.ONCLICK, AjxCallback.simpleClosure(this.ButtonList, this));
	
	var delButton = Dwt.getNextId();
	var deleteButton = new DwtDialog_ButtonDescriptor(delButton, ("Delete"), DwtDialog.ALIGN_LEFT);
	this.informationDialog = new ZmDialog( { title:"Mail informations", view:getInforView, 
		parent:this.getShell(window), standardButtons:[DwtDialog.CANCEL_BUTTON], extraButtons:[deleteButton] });
	this.informationDialog.setButtonListener(delButton, new AjxListener(this, this.deletePart));
	
	this.inforColor();
	this.informationDialog.popup(); 
}

del_duplicate_HandlerObject.prototype.htmlgetInforView = function(){
	var msgArray = appCtxt.getCurrentController().getList().getArray();
	var html = new Array();
	var i = 0, k = 0, id, Repeat=0;
	var reId = this.repeatedList.getReArray();
	
	
	html[i++] = "<form name=\"form\">";
	html[i++] = "<B><input type='checkbox' name='allbox' id='box'> select all </B><br>";
	html[i++] = "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓<br>";
	for(var j=0 ; j < reId.length ; j++){
	
		id = reId[j];
		Repeat = 0;
		for(var l=0 ; l < j ; l++){
			if(id == reId[l])
				Repeat =  1;
		} 
		if(Repeat == 1)
			continue;
		else if(Repeat == 0){
			this.repeatedList.addfin(id);
			for(var m=0 ; m < msgArray.length ; m++){
				if(msgArray[m].msgIds[0] == reId[j])
					break;
			}
			html[i++] = "<input type='checkbox' name='c1'> ";
			html[i++] = "<div id='mailnum' style='font-weight:bold' name='n1'> Mail "+ k++ +" :</div>"; 
			html[i++] = "<div id='mailfrom'>From:"+msgArray[m].participants._array[0].name+"</div>";
			html[i++] = "<div id='mailaddress'>Address:< "+msgArray[m].participants._array[0].address+" ></div>";
			html[i++] = "Subject: \""+msgArray[m].subject+"<br>";
			html[i++] = "Content: "+msgArray[m].fragment;
			html[i++] = "<br>------------------------------------------------------------------------------------------------------------------<br>" ;
		}
	}
	html[i++] = "</form>";
	
	return html.join("");
	
};
del_duplicate_HandlerObject.prototype.ButtonList = function(){
//	console.log("fuck");
	if(document.getElementById("box").checked == true)
		this.SelectAll();
	else if(document.getElementById("box").checked == false)
		this.UnSelectAll();
};

del_duplicate_HandlerObject.prototype.SelectAll = function(){
	var checkItem = document.getElementsByName("c1");
	for(var i=0;i<checkItem.length;i++)
		checkItem[i].checked = true; 
};
del_duplicate_HandlerObject.prototype.UnSelectAll = function(){
	var checkItem = document.getElementsByName("c1");
	for(var i=0;i<checkItem.length;i++)
		checkItem[i].checked = false; 
};


del_duplicate_HandlerObject.prototype.getMsgInfo=function(i){
	var soapDoc = AjxSoapDoc.create("GetMsgRequest", "urn:zimbraMail");
	var folderNode = soapDoc.set("m");
	folderNode.setAttribute("id",i);
	var params = {soapDoc: soapDoc , 
	              asyncMode: false , 
				  callback: null , 
				  errorCallback: null
				  };
    var response = appCtxt.getAppController().sendRequest(params).GetMsgResponse.m[0].mp[0];
	var content;
	var attach;
//	console.log(response);
	
	if(response.hasOwnProperty("body")){
		return response.content;
	}
	else if(response.ct=="multipart/mixed"){
		if(response.mp[0].ct=="multipart/related")
			return response.mp[0].mp[0].mp[0].content;
		else if(response.mp[0].ct=="multipart/alternativ")
			return response.mp[0].mp[0].content;
	}
	else if(response.ct=="multipart/related"){
		return response.mp[0].mp[0].content;
	}
	else if(response.ct=="multipart/alternative"){
		return response.mp[0].content;
	}

};

del_duplicate_HandlerObject.prototype._handleSOAPResponseXML =
function(result) {

	if (result.isException()) {
		// do something with exception
		var exception = result.getException();
		return;
	}
};
del_duplicate_HandlerObject.prototype._handleSOAPErrorResponse =
function(ex) {

	var errorMsg = ex.getErrorMsg(); // the error message
	var dump = ex.dump(); // the complete error dump

};
del_duplicate_HandlerObject.prototype.CleanSpace = function(str) { 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
};	//eliminate space and enter
//delete email if the checkbox is checked
del_duplicate_HandlerObject.prototype.deletePart = function(){
//	console.log("delete part");
	var msgArray = appCtxt.getCurrentController().getList().getArray();
	var fiId = this.repeatedList.getFinArray();
	var checkItem = document.getElementsByName("c1");
	for(var i=0;i<checkItem.length;i++){
		if(checkItem[i].checked == true){
//			console.log(checkItem.length);
			for(var j =0 ; j < msgArray.length ; j++){
				if(msgArray[j].msgIds[0] == fiId[i]){
					msgArray[j].move(4,null,this._handlErrorResponse);
//					console.log("move success!!");
				}
			}			
		}
	}
	this.informationDialog.popdown();
};

del_duplicate_HandlerObject.prototype.inforColor = function(){
	var tagItem = document.getElementsByTagName("div");
	for(var i=0;i<tagItem.length;i++){
		if(tagItem[i].getAttribute("name") == "n1")
			tagItem[i].style.color = "#009900";
	}
};




/********************************************/
function EmailContent(c,i){
	this._content=c;
	this._id=i;
}
EmailContent.prototype.getContent = function(){
	return this._content;
};
EmailContent.prototype.getId = function(){
	return this._id;
}
//emailPrefs
function EmailContentPrefs() {
	this.hashArray = [];
}
function EmailRepeatedPrefs(){
	this.orderArray = [];
	this.reArray = [];
	this.FinalArray = [];
	
}

EmailContentPrefs.prototype.add = function (EmailContent) {
	this.hashArray[EmailContent.getContent()] = EmailContent;
}
EmailContentPrefs.prototype.getByContent = function (c) {
    if (this.hashArray.hasOwnProperty(c)) {
        return this.hashArray[c];
    }
}

EmailRepeatedPrefs.prototype.add = function (id,order)	{
	this.reArray[this.reArray.length] = id;
	this.orderArray[this.orderArray.length] = order;
}
EmailRepeatedPrefs.prototype.addfin = function(id){
	this.FinalArray[this.FinalArray.length] = id;
};
EmailRepeatedPrefs.prototype.getByContent = function (i) {
	if(this.reArray.hasOwnProperty(i))	{
		return this.reArray[i];
	}
}
EmailRepeatedPrefs.prototype.getOrderArray = function(){
	return this.orderArray; 
}
EmailRepeatedPrefs.prototype.getReArray = function(){
	return this.reArray; 
}
EmailRepeatedPrefs.prototype.getFinArray = function(){
	return this.FinalArray;
}
