 
zipCode

//动态Js区域
var regular=eval(
{
    "Email":{
        "fieldName":"E-mail",
        "regular":"/^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "OrtherCellPhone":{
        "fieldName":"其他联系人手机号码",
        "regular":"/^1[3|4|5|7|8][0-9]\d{8}$/",
        "regularErrorInfor":"手机格式不正确！请输正确的11位手机号码",
        "rf":1
    },
    "OrtherName":{
        "fieldName":"其他联系人姓名",
        "regular":"/^[\u4E00-\u9FA5]+$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "OrtherTelePhone":{
        "fieldName":"其他联系人电话（座机）",
        "regular":"/^((0\d{2,3})-)(\d{7,8})$/",
        "regularErrorInfor":"座机电话格式不正确！请按 区号-主机号 填写",
        "rf":1
    },
    "cifName":{
        "fieldName":"姓名",
        "regular":"/^[\u4E00-\u9FA5]+$/",
        "regularErrorInfor":"格式不正确！请输入中文",
        "rf":1
    },
    "companyZipCode":{
        "fieldName":"现单位邮政编码",
        "regular":"/^[0-9]\d{5}(?!\d)$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "departmentName":{
        "fieldName":"部门名称",
        "regular":"/^[\u4E00-\u9FA5]+$/",
        "regularErrorInfor":"格式不正确！请输入中文",
        "rf":1
    },
    "idCard":{
        "fieldName":"证件号码",
        "idCardType":{
            "01":"/^\d{15}|\d{18}$/",
            "HMPermit":"/^[0-9]{15,18}$/",
            "MTP":"/^[0-9]{12}$/",
            "officerCertificate":"/^[0-9]{15,18}$/",
            "other":"/^[0-9]{12}$/",
            "passport":"/^[0-9]{12}$/"
        },
        "regular":"idCardType",
        "regularErrorInfor":"证件号无效或者不符合办卡年龄！",
        "rf":0
    },
    "immediateCellPhone":{
        "fieldName":"直系手机号码",
        "regular":"/^1[3|4|5|7|8][0-9]\d{8}$/",
        "regularErrorInfor":"手机格式不正确！请输正确的11位手机号码",
        "rf":1
    },
    "immediateName":{
        "fieldName":"直系亲属姓名",
        "regular":"/^[\u4E00-\u9FA5]+$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "immediateTelePhone":{
        "fieldName":"直系联系电话（座机）",
        "regular":"/^((0\d{2,3})-)(\d{7,8})$/",
        "regularErrorInfor":"座机电话格式不正确！请按 区号-主机号 填写",
        "rf":1
    },
    "presentAge":{
        "fieldName":"现职年限（年）",
        "regular":"/^\d+(\.\d+)?$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "spellOfNameF":{
        "fieldName":"拼音 姓（大写）",
        "regular":"/^[A-Z]+$/",
        "regularErrorInfor":"格式不正确！请输入大写字母",
        "rf":1
    },
    "spellOfNameS":{
        "fieldName":"拼音 名（大写）",
        "regular":"/^[A-Z]+$/",
        "regularErrorInfor":"格式不正确！请输入大写字母",
        "rf":1
    },
    "taxAnnualIncome":{
        "fieldName":"当前税前年收入（万元）",
        "regular":"/^\d{1,4}$|^\d{1,4}[.]\d{1}$/",
        "regularErrorInfor":"格式不正确!请按照0000.0的格式填写",
        "rf":1
    },
    "unitTelephone":{
        "fieldName":"单位电话",
        "regular":"/^((0\d{2,3})-)(\d{7,8})$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "zipCode":{
        "fieldName":"邮政编码",
        "regular":"/^[0-9]\d{5}(?!\d)$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    },
    "jinPeng":{
        "fieldName":"jinPeng",
        "regular":"/^[0-9]*$/",
        "regularErrorInfor":"格式不正确!请注意填写格式.",
        "rf":1
    }
}
	);
var required=eval({"CRaddress":"现住宅地址","CarNumber":"车牌号","ClientAgreement":"华夏银行信用卡章程领用合约和收费标准","CustomerCity":"客户所在城市","Email":"E-mail","OrtherName":"其他联系人姓名","OrtherRelationship":"其他联系人与申请人关系","OrtherTelePhone":"其他联系人电话","ShowCards":"卡产品","cifName":"姓名","companyZipCode":"现单位邮政编码","departmentName":"部门名称","education":"教育程度","homeTelephone":"有无住宅电话","housingSituation":"住宅情况","idCard":"证件号码","idCardBirthday":"出生日期","idCardCreatedate":"证件签发日期","idCardDeadline":"证件有效期至","idCardGenda":"性别","immediateName":"直系亲属姓名","immediateRS":"直系与申请人关系","immediateTelePhone":"直系联系人电话","mailingAddress":"请将华夏信用卡寄往","mainCardIsByPassword":"主卡刷卡消费是否凭密码","maritalStatus":"婚姻状况","messageAuthCode":"手机验证码","presentAge":"现职年限（年）","spellOfNameF":"拼音 姓（大写）","spellOfNameS":"拼音 名（大写）","taxAnnualIncome":"当前税前年收入（万元）","telephone":"手机号","unitAddress":"单位地址","unitName":"现单位全称","unitNature":"单位性质","unitTelephone":"单位电话","vehicleSituation":"拥有车辆情况","zipCode":"邮政编码","education":"教育程度","unitNature":"单位性质","housingSituation":"住宅情况","areaList_dummy":"行业类别","job_dummy":"职务"});
regular.telephone={"fieldName":"注册手机号","regular":"/^1[3|4|5|7|8][0-9]\\d{8}$/","regularErrorInfor":"格式不正确！请输入11位数字","rf":1};
regular.messageAuthCode={"fieldName":"验证码","regular":"/^[0-9]{6}$/","regularErrorInfor":"格式不正确！请输入6位数字","rf":1};

//住宅电话
regular.homeTelephone2={"fieldName":"座机号","regular":"/^[0-9]{7,8}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
regular.homeTelephone1={"fieldName":"区号","regular":"/^[0-9]{3,4}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
required["homeTelephone1"]="住宅电话区号";
required["homeTelephone2"]="住宅电话座机";

//单位电话
regular.unitTelephone2={"fieldName":"座机号","regular":"/^[0-9]{7,8}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
regular.unitTelephone1={"fieldName":"区号","regular":"/^[0-9]{3,4}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
required["unitTelephone1"]="单位电话区号";
required["unitTelephone2"]="单位电话座机";

//直系联系人电话
regular.immediateTelePhone1={"fieldName":"区号","regular":"/^[0-9]{3,4}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
regular.immediateTelePhone2={"fieldName":"座机号","regular":"/^[0-9]{7,8}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
//required["immediateTelePhone1"]="直系联系人电话区号";
//required["immediateTelePhone2"]="直系联系人电话座机";

//其他联系人电话
regular.OrtherTelePhone1={"fieldName":"区号","regular":"/^[0-9]{3,4}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
regular.OrtherTelePhone2={"fieldName":"座机号","regular":"/^[0-9]{7,8}$/","regularErrorInfor":"格式不正确！请正确输入","rf":1};
//["OrtherTelePhone1"]="直系联系人电话区号";
//required["OrtherTelePhone2"]="直系联系人电话座机";

//单位和公司名称汉字限制
required["unitName"]="现单位全称";
regular.unitName={"unitName":"现单位全称","regular":"/^[a-zA-Z0-9\\u4E00-\\u9FA5()（）]+$/","regularErrorInfor":"请不要输入数字、特殊字符或空格","rf":1};

required["departmentName"]="部门名称";
regular.departmentName={"departmentName":"部门名称","regular":"/^[\\u4E00-\\u9FA5]+$/","regularErrorInfor":"格式不正确！请输入中文","rf":1};




//地址必填
required["CRaddressStreet"]="住宅地址";
required["unitAddressStreet"]="单位地址";


delete required["CRaddressDet"];
delete required["unitAddressDet"];



regular.unitAddressStreet={"unitAddressStreet":"公司路/街号","regular":"/^(?!-)(?!.*.?-$)[a-zA-Z0-9-\\u4E00-\\u9FA5]+$/","regularErrorInfor":"格式不正确！","rf":1};

regular.CRaddressStreet={"CRaddressStreet":"家庭路/街号","regular":"/^(?!-)(?!.*.?-$)[a-zA-Z0-9-\\u4E00-\\u9FA5]+$/","regularErrorInfor":"格式不正确！","rf":1};



//默认无车辆，隐藏车牌号输入框
delete required["CarNumber"];
$("#CarNumber").val("");
$("#CarNumber").parent().hide();
$("#CarNumber1").parent().hide();


//默认无住宅电话，隐藏输入框，隐藏确认页的的信息
delete required["homeTelephone1"];
delete required["homeTelephone2"];
$("#homeTelephone1").val("");
$("#homeTelephone2").val("");
$("#homeTelephone1").parent().parent().hide();
$("#homeTelephones").parent().hide();


//行驶证拍照默认不上传
delete required["driveLicenseUpload"];

function getCardInf(name){
	var reg = new RegExp("(^|&)" + name+ "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null){
		r  = (r[2]);
		r = decodeURIComponent(r);   
	}
	return r;
}
//返回前一页
function goToBack(pageNum){
	var	ShowCards = $("#ShowCards").val();
	var	customerCity = $("#CustomerCityfrom1").val();
	var idCard=$('#idCardfrom1').val();
	var telephone=$('#telephonefrom1').val();
	var messageAuthCode=$('#messageAuthCodefrom1').val();
	var cifName=$('#cifNamefrom1').val();
	window.location.href = "../../hxbank/WSCradapply.do?_locale=zh_CN&ShowCards="+ShowCards+"&telephone="+telephone+"&CardName=华夏信用卡金卡&CardImg=hxbank/cardImgcmgtquery.do?status=1&seq=["+ShowCards+"]"+"&TJPId="+$("#TJPId").val();
}
//跳转下一页
function goToNext(pageNum){
	homeTelephoneChange();
	vehicleSitChange();
	if(check("00"+pageNum)){
		go = $("#goNextBtn");
		go.attr("disabled","disabled");
		go.css("backgroundColor","gray");
		var pageSize = $("#pageSize").val();
		submitApplyInfo(pageNum,pageSize);	
	}else{
	}
}

var stay = 1;
function goToSubmit(pageNum){
	var pageSize = $("#pageSize").val();
	if(stay>0){
		submitApplyInfo(pageNum,pageSize);	
	}
}



//在确认页面点击修改回到修改页面
function gobackUpdate(pageId,currentPageId){
	$("#"+currentPageId).hide();
	$("#"+pageId).show();
}

function onLoadFunction(){
	$("#education").get(0).selectedIndex=-1;
	$("#unitNature").get(0).selectedIndex=-1;
	$("#housingSituation").get(0).selectedIndex=-1;
	$("#education").change(function(){
		if($("#education").val()=='请选择'){
			$("#education").get(0).selectedIndex=-1;
		}
	});
	$("#unitNature").change(function(){
		if($("#unitNature").val()=='请选择'){
			$("#unitNature").get(0).selectedIndex=-1;
		}
	});
	$("#housingSituation").change(function(){
		if($("#housingSituation").val()=='请选择'){
			$("#housingSituation").get(0).selectedIndex=-1;
		}
	});
	if($("#TJPId").val()!=''&&$("#TJPId").val()!=null){//是否有推荐人
		$("#TJPName1").show();
		$("#TJPRelationship1").show();
		$("#TJPName").closest('.form-section').addClass('form-section-active');
	}
	$("#CustomerCityfrom1").val(getCardInf("customerCity"));
	$(".upload").attr("style","width:0px;");
		var telephone = $("#telephonefrom1").val();
		var urlStr="../../hxbank/WapCreditCardApplySelect.do";			
		$.ajax({
				type: "POST",
				url: urlStr,
				data: {"telephone":telephone},
				success: function(msg){
					if($.trim(msg["maritalStatus1"]) == ""){
						if($.trim(msg["ShowCards"])=="0048"){
							$("#jinPeng1").show();
						}
						if(!msg["C4_RECNAME"]==""){
							$("#TJPName").val($.trim(msg["C4_RECNAME"]));
						}
					}else{
						if($.trim(msg["ShowCards"])=="0048"){
							$("#jinPeng1").show();
						}
						if(!msg["C4_RECNAME"]==""){
							$("#TJPName").val($.trim(msg["C4_RECNAME"]));
						}
						$("#ShowCards").val($.trim(msg["ShowCards"]));
						$("#maritalStatus").val($.trim(msg["maritalStatus1"]));
						$("#education").closest('.form-section').addClass('form-section-active');
						$("#education").val($.trim(msg["education1"]));
						$("#Email").closest('.form-section').addClass('form-section-active');
						$("#Email").val($.trim(msg["Email1"]));
						$("#unitName").closest('.form-section').addClass('form-section-active');
						$("#unitName").val($.trim(msg["unitName1"]));
						$("#unitNature").closest('.form-section').addClass('form-section-active');
						$("#unitNature").val($.trim(msg["unitNature1"]));
						$("#unitAddress").val($.trim(msg["unitAddress"]));
						$("#unitAddressCity").val($.trim(msg["unitAddressCity"]));
						$("#unitAddressCounty").val($.trim(msg["unitAddressCounty"]));
						$("#unitAddressStreet").closest('.form-section').addClass('form-section-active');
						$("#unitAddressStreet").val(msg["unitAddressStreet"].replace(/\s+/g,""));
						$("#unitTelephone1").closest('.form-section').addClass('form-section-active');
						$("#unitTelephone2").closest('.form-section').addClass('form-section-active');
						$("#unitTelephoneExt").closest('.form-section').addClass('form-section-active');
						$("#unitTelephone1").val($.trim(msg["unitno1"]).split("-")[0]);
						$("#unitTelephone2").val($.trim(msg["unitno1"]).split("-")[1]);
						$("#unitTelephoneExt").val($.trim(msg["unitno2"]));
						$("#companyZipCode").closest('.form-section').addClass('form-section-active');
						$("#companyZipCode").val($.trim(msg["companyZipCode1"]));
						$("#departmentName").closest('.form-section').addClass('form-section-active');
						$("#departmentName").val($.trim(msg["departmentName1"]));
						$("#presentAge").closest('.form-section').addClass('form-section-active');
						$("#presentAge").val($.trim(msg["presentAge1"]));
						$("#taxAnnualIncome").closest('.form-section').addClass('form-section-active');
						

						var income =msg["taxAnnualIncome1"]/10;
						  $("#taxAnnualIncome").val(income);
						$("#housingSituation").closest('.form-section').addClass('form-section-active');					
						$("#housingSituation").val($.trim(msg["housingSituation"]));
						$("#CRaddress").val($.trim(msg["CRaddress"]));
						$("#CRaddressCity").val($.trim(msg["CRaddressCity"]));
						$("#CRaddressCounty").val($.trim(msg["CRaddressCounty"]));
						$("#CRaddressStreet").closest('.form-section').addClass('form-section-active');
						
						$("#CRaddressStreet").val(msg["CRaddressStreet"].replace(/\s+/g,""));
						$("#job_dummy").closest('.form-section').addClass('form-section-active');
						$("#job_dummy").val(changeStr($.trim(msg["C1_CODUTY"])));
						$("#areaList_dummy").closest('.form-section').addClass('form-section-active');
						$("#areaList_dummy").val(changeStr($.trim(msg["C1_COCODE"])));
						$("#zipCode").closest('.form-section').addClass('form-section-active');
						$("#zipCode").val($.trim(msg["zipCode1"]));
						if(($.trim(msg["homeTelephone2"]))==""){
							$("#homeTelephoneSit").val("N");
						}else{
							$("#homeTelephoneSit").val("Y");
							$("#homeTelephone1").val($.trim(msg["homeTelephone1"]));
							$("#homeTelephone2").val($.trim(msg["homeTelephone2"]));
							$("#homeTelephone1").closest('.form-section').addClass('form-section-active');
							$("#homeTelephone2").closest('.form-section').addClass('form-section-active');
							$("#homeTelephone1").parent().parent().show();
						}
						if(($.trim(msg["CarNumber"]))==""){
							$("#vehicleSituation").val("3");
						}else{
							$("#vehicleSituation").val("1");
							$("#CarNumber").val($.trim(msg["CarNumber"]));
							$("#CarNumber").closest('.form-section').addClass('form-section-active');
							$("#CarNumber").parent().show();
						}
						if(($.trim(msg["jinPeng"]))!=""){
							$("#jinPeng").val($.trim(msg["jinPeng"]));
							console.log(msg["jinPeng"]);
						}
						
						$("#city_5").citySelectUA({
							unitAddress:$.trim(msg["unitAddress"]), 
							unitAddressCity:$.trim(msg["unitAddressCity"]),
							unitAddressCounty:$.trim(msg["unitAddressCounty"]),
							nodata:"none"
						});

						$("#city_4").citySelectCA({
							CRaddress:$.trim(msg["CRaddress"]), 
							CRaddressCity:$.trim(msg["CRaddressCity"]), 
							CRaddressCounty:$.trim(msg["CRaddressCounty"]), 
							nodata:"none"
						});
					}
					
				},
				error: function(msg){
					alert("系统响应超时！请重试或联系客服人员");
				}	
		})
}
$(function(){
	var idCard=$('#idCardfrom1').val();	
 	if(idCard.length==15){
		var birthday='19'+idCard.substr(6,2)+'-'+idCard.substr(8,2)+'-'+idCard.substr(10,2);
		var birthdayStr='19'+idCard.substr(6,2)+idCard.substr(8,2)+idCard.substr(10,2);
		$("#idCardBirthday").val(birthdayStr);
		var gendaInt=parseInt(idCard.substr(13,1));
		if(gendaInt%2==1){
			$("#idCardGenda option[value='M']").attr("selected", true);
		}else{
			$("#idCardGenda option[value='F']").attr("selected", true);
		}
		
	}else if(idCard.length==18){
		var birthday=idCard.substr(6,4)+'-'+idCard.substr(10,2)+'-'+idCard.substr(12,2);
		var birthdayStr=idCard.substr(6,4)+idCard.substr(10,2)+idCard.substr(12,2);
		$("#idCardBirthday").val(birthdayStr);
		var gendaInt=parseInt(idCard.substr(16,1));
		if(gendaInt%2==1){
			$("#idCardGenda option[value='M']").attr("selected", true);		
		}else{
			$("#idCardGenda option[value='F']").attr("selected", true);	
		}			
	}
})
