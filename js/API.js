/**
 * Created by Administrator on 2016/9/3.
 */

// 判断设备
var ios = false;

if (navigator.userAgent.match(/(iPhone|iPad|ios)/i)) {
	ios = true;
}

var Swr_API = function () {

	// 获取作用域
	var $scope = angular.element(document.querySelector('[ng-controller="appScope"]')).scope();
	var t = this;

	/*上传平台信息
	* fn_Name: LoadUpSystemInfo
	* 参数:
	*TSystemInfo =
	* SystemType: int;//（系统类型）：
	* 例如：0: Windows, 1: MAC OS，2: iOS，3: Android
	* SystemVersion： string; //（系统版本）,系统字符串格式，
	* //例如：XP、Win7、Win8、Win10、Mac OS10.8、iOS7、iOS8、iOS9、iOS10、Android 4.0、Android 4.3、Android 5.0
	* Lang: TLanguage;//语言类参数
	* ConnectType: byte;
	* //从低位到高位顺序依次为：USB、BT2.0、BT4.0、耳机
	* //数据位：0表示没有，1表示有
	* 如：1表示USB,2表示BT2.0，4表示BT4.0，8表示耳机
	* //其中，语言类结构体
	* TLanguage =
	* DefaultLangID: string; //默认语言代码。例如：EN
	* Languages: array of Dic; 
	* //支持的语言代码列表（字符串数组），例如："EN"："English","CHS":"中文"，其中语音全称要用原语言显示
	* //目前使用的语言及代码
	* 简体中文-中文（CHS）、英语-English（EN）、俄语-русский（RU）、墨西哥的西班牙语-Español（ESP）、法语-français（FRA）、波兰语-Polskie（PLK）、土耳其语-Türk（TR）、乌克兰语-український（UK）、希腊语-ελληνικά（GR）、阿尔巴利亚语-shqiptar（ALB）、葡萄牙语-português（PT）
	* */
	this.LoadUpSystemInfo = function (a) {
		var data = a[0];
		$scope.System_Info = data;
		$scope.$apply();
	};

	/*上传当前搜索到的设备
	* fn_Name: UpdateDevice
	* 参数:
	* TDevices = array of Device； //已扫描到的设备数组
	* TDevice =
	* Status：int;  //设备的连接状态，0：未连接，1已连接
	* Name: string;  // 设备名称，20type
	* DeviceID:  string; //设备的唯一标识  30type
	* */
	this.UpdateDevice = function (a) {

		var data = a[0];

		$scope.deviceController.Linked = [];
		$scope.deviceController.unLinked = [];

		for (var i = 0; i < data.length; i++) {
			console.log(data[i].Status);
			if (data[i].Status == 0) {
				$scope.deviceController.unLinked.push(data[i]);
			} else {
				$scope.deviceController.Linked.push(data[i]);
			}
		}

		$scope.$apply();
	};

	/*设备已断开
	* fn_Name:  DisconnectDeviceStatus
	* 参数:  DeviceID: string
	* */
	this.DisconnectDeviceStatus = function (ID) {

	};

	/* 上传设备信息
	 * fn_Name:  LoadUpDeviceInfo
	 * 参数:
	 * DeviceInfos =  array of TDeviceInfo;
	 * TDeviceInfo = DeviceType: int;  // 设备类型，0: Easy, 1: Smart, 2: EasyPro, 3: SmartPro, 4: USB传感器, 5:无线显示模块, 6: SenseDisc
	 * DeviceID: string; //设备的UUID，字符串格式，30byte
	 * FirmwareVersion: string; //固件版本，如：160219EA
	 * BatteryPower: int;0~100，//电池的电量百分比,-1表示无电池
	 * DeviceTime: string; //设备的时间，按照默认的时间格式显示，无显示时间则设置为空
	 * BTName: string; // 蓝牙名称，例如：BT0013，无蓝牙则设置为空
	 * SensorInfos:TSensorInfos; 每个设备对应的传感器信息
	 *
	 * TSensorInfos = array of TSensorInfo;
	 * TSensorInfo =
	 * Channel: int;  //虚拟通道号  1~16
	 * Socket: int;   //物理通道号  1~16
	 * SensorID: int; //传感器ID，1~255
	 * SensorName: string;  //已设置语言的传感器名称
	 * SensorUnit: string;   //已设置语言的传感器单位
	 * RangeMax: float;     //量程最大值
	 * RangeMin: float;     //量程最小值
	 * Decimals: array of Byte;    //每个量程的小数位数（0~4），例如双量程微力，高量程显示2位显示小数，低量程显示3位小数
	 * */
	this.LoadUpDeviceInfo = function (a) {

		var data = a[0];

		for (var i = 0; i < data.length; i++) {
			$scope.Device_Info.content.push(data[i]);
		}
		console.log($scope.Device_Info.content);
		$scope.$apply();
	};

	/*上传传感器信息
	* fn_Name: LoadUpSensorInfo
	* 参数:
	* SensorInfos: TSensorInfos
	* PC：断开前面一个通道传感器时，通道空留
	* iOS：断开前面一个通道时，通道重新排列
	* */
	this.LoadUpSensorInfo = function (a) {

		var data = a[0];

//		for (var i = 0; i < data.length; i++) {
//			$scope.Serson_Info.content.push(data[i]);
//		}

		if(coll_start){
            
			if (ios) {
				testobject.StartCollectTime(0, 7);
			} else {
				testobject.StartCollect(0, 7);
			}
		}
		$scope.$apply();
	};

	/*上传数据
	* fn_Name: LoadUpData
	* 参数:
	* DataItems:array ofTDataItem
	* TDataItem =
	* SimilarSensorIdx: int;   // 同类传感器序号？备用
	* Channel: int;  //虚拟通道号，1~16
	* ID: int;   //传感器ID号，1~255
	* Time: int64;  //时间us
	* Value: float;  //数值
	* Decimal: byte;  //数值显示的小数位数
	* Upside: boolean;  //0：下降沿，1:上升沿
	* */
	this.LoadUpData = function (a) {
		setTimeout(on(a[0]), 1);
	};
};

var cache = function () {

	var t = this;
	// 缓存 cache
	var _cache = [];

	// 缓存处理对象
	this.API = new Swr_API();

	// 返回cache
	this.showCache = function () {
		console.log(_cache);
	};

	// 添加到缓存
	this.pushToCache = function (functionName, data) {
		setTimeout(t.API[functionName](data), 1);
	};

	// 弹出数据
	this.popCache = function () {
		_cache.splice(0, 1);
	};

};

