const aCity = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外"
}

function isCardID(sId) {
  if (!sId) {
    return '请输入身份证号'
  }
  let iSum = 0;
  if (!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
  sId = sId.replace(/x$/i, "a");
  if (aCity[parseInt(sId.substr(0, 2))] == null) return "身份证地区非法";
  let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
  let d = new Date(sBirthday.replace(/-/g, "/"));
  if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
  for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) return "身份证号非法";
  return true;
}


// 手机号校验
function isTelOk(phoneNum) {

  let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  if (!reg.test(phoneNum)) return "手机号格式错误"
  return true
}

function isChines(name) {
  if (!name) {
    return '请输入姓名'
  }
  let regex = /[\u4e00-\u9fa5]/;
  if (!regex.test(name)) return '姓名必须为中文';
  return true;
}

function isQQ(qq) {
  var filter = /^\s*[.0-9]{5,11}\s*$/;
  if (!filter.test(qq)) {
    return false;
  } else {
    return true;
  }
}

//验证邮箱格式
function isEmail(str) {
  if (str.charAt(0) == "." || str.charAt(0) == "@" || str.indexOf('@', 0) == -1 ||
    str.indexOf('.', 0) == -1 || str.lastIndexOf("@") == str.length - 1 ||
    str.lastIndexOf(".") == str.length - 1 ||
    str.indexOf('@.') > -1)
    return false;
  else
    return true;
}
function checkPassword(password) {
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
  if (!reg.test(password)) {
    return "密码包含 数字,英文,字符中的两种以上，长度8-20";
  } else {
    return true
  }
}
export {
  isChines,
  isTelOk,
  isCardID,
  isQQ,
  isEmail,
  checkPassword
}