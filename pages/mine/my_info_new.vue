<template>
	<view>
		<view>
			<view class="infobox">
				<view class="rzinfo-top d-left">
					<image src="https://shop.pangu.mobi/static/mobile/myinfo_rz_icon.png" class="top-icon"></image>
					<view class="top-p">认证信息</view>
				</view>
				<view class="rzinfo-tip d-center">
					<span>*</span>
					<view class="tip-p">您需要确保本人电话，身份证，银行卡号无误，所绑定银行卡仅用户接受佣金及奖励，安全可靠。</view>
				</view>
				<view class="rzinfo-con">
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>真实姓名</view>
							<view class="spec">*</view>
						</view>
						<input placeholder="请输入您的真实姓名" placeholder-style="color:#d0d0d0; font-size: 30rpx;" v-model="name" :disabled="disabled"/>
					</view>
					
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>身份证号</view>
							<view class="spec">*</view>
						</view>
						<input placeholder="请输入您的身份证号" placeholder-style="color:#d0d0d0; font-size: 30rpx;" v-model="idnum" :disabled="disabled"/>
					</view>
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>合伙人城市</view>
							<view class="spec">*</view>
						</view>
						<view class="area" @tap="getLocation()" v-if="zd">{{areatext}}</view>
						<view class="area" @tap="popupShow()" v-else>{{areatext}}</view>
						<!-- <view class="area1" @tap="popupShow()" v-else>请选择地址</view> -->
					</view>
				</view>
			</view>
			<view class="infobox yh">
				<view class="rzinfo-top d-left">
					<image src="https://shop.pangu.mobi/static/mobile/myinfo_yh_icon.png" class="top-icon"></image>
					<view class="top-p">银行账号<span>(银联借记卡)</span></view>
				</view>
				<view class="rzinfo-con">
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>开户行</view>
							<view class="spec">*</view>
						</view>
						<view class="khh" v-if="disabled">{{khh}}</view>
						<picker @change="bindPickerChange" :value="index" :range="array" :disabled="disabled" v-else>
							<view class="khh" v-if="khh!='请选择开户行'">{{khh}}</view>
							<view class="uni-input" v-else>{{array[index]}}</view>
						</picker>
					</view>
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>银行账号</view>
							<view class="spec">*</view>
						</view>
						<input placeholder="请输入银行账号" type="number" placeholder-style="color:#d0d0d0; font-size: 30rpx;" v-model="yhnum" :disabled="disabled"/>	
					</view>
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>预留手机号</view>
							<view class="spec">*</view>
						</view>
						<!-- @blur="fun()" -->
						<input placeholder="请输入您的11位电话号码" type="number" placeholder-style="color:#d0d0d0; font-size: 30rpx;" v-model="phone" :disabled="disabled"/>
					</view>
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>分行/支行</view>
							<view class="spec">*</view>
						</view>
						<input placeholder="请输分行/支行" placeholder-style="color:#d0d0d0; font-size: 30rpx;" v-model="fhzh" :disabled="disabled"/>
					</view>
					<view class="info-box d-between">
						<view class="info-box-item d-left">
							<view>账户名</view>
							<view class="spec">*</view>
						</view>
						<input placeholder="真实姓名" placeholder-style="color:#d0d0d0; font-size: 30rpx;" style="color:#d0d0d0;" v-model="name" :disabled="disabled1"/>
					</view>
					
					<view class="info-box tip">
						以上银行账户用于接收佣金及奖励，安全可靠。
					</view>
				</view>
			</view>
			<view class="zc d-left" v-if="submitbtn">
				<image src="https://shop.pangu.mobi/static/mobile/check.png" class="checkimg" v-if="checked" @tap="check"></image>
				<image src="https://shop.pangu.mobi/static/mobile/checked.png" class="checkimg" v-else @tap="check"></image>
				<view class="zc-con">我同意<span @tap="zcPopupShow()">分销商城佣金说明/分销商城账号隐私政策</span></view>
			</view>
			<view class="btn" @tap="infoconfirmpopupshow()" v-if="submitbtn">提交</view>
			<view class="btn" @tap="changeinfo()" v-else>修改资料</view>
			<!-- 同意政策弹窗 -->
			<view class="zcjg" v-show="jg">
				请点击同意须知
			</view>
			<!-- 身份信息已被其他账户绑定 -->
			<view class="zcjg new" v-show="already">
				身份信息已被其他账户绑定
			</view>
		</view>
		
		<!-- 地址弹窗 -->
		<view class="popup-wrap" v-if="popupshow">
			<pca-picker limitRegion="city" :active.sync="active" @change="change" :defaultValue="defaultValue" @getChild="getChild"></pca-picker>
		</view>
		<!-- 政策弹窗 -->
		<view class="popup-wrap zc" v-if="zcpopupshow">
			<view class="mask" @tap="zcpopupHide()"></view>
			<view class="zcpopup">
				<scroll-view class="scroll-box" scroll-y="true">
					<view class="notice-box">
						<view class="notice-box-tit d-center">
							<view>*</view>
							<view>盘古宝账号服务协议</view>
						</view>
						<view class="notice-con">
		欢迎您注册、使用盘古宝账号！本协议系您与盘古网络集团有限公司（以下简称“盘古网络”）就盘古宝帐号的注册和使用而订立的。在使用盘古宝账号服务之前，请您务必审慎阅读并充分理解《盘古宝账号服务协议》（以下简称“本协议”)，特别是限制或免除责任的相应条款、法律适用和争议解决条款。限制或免除责任的相应条款以加粗形式提示您注意。未成年人应在法定监护人的陪同下阅读。您注册后，即成为盘古宝用户，本协议为在线协议，您同意本协议并注册成功即表示同意本协议中的所有条款。您应保证所填写个人信息的真实性、合法性、准确性，否则可能无法使用服务或在使用过程中受到限制。您注册登录即表示您确认对本协议全部条款含义已充分理解并完全接受。您成功注册盘古宝账号并完善个人信息后即成为盘古宝合伙人。您同意，我们有权在必要的时候修改本协议条款并按法律规定公示，您可以在相关页面查阅最新版本的协议条款。 
		 一、账号使用规则
		（一)账号注册
		1、如果您为盘古宝的新用户，使用盘古宝平台前，您需要注册获取盘古宝账号。在使用盘古宝账号登录该平台、使用该平台提供的产品或服务时，除遵守本协议约定外，还应遵守该等平台公布的服务协议、隐私政策、用户授权协议、规则以及有关正确使用平台服务的说明和操作指引等。为保障盘古宝账号的正常运行，您在注册盘古宝账号服务时需要提供一些必要的信息。您须保证所提供的注册信息真实、准确、完整，否则，您将无法使用盘古宝账号服务或在使用过程中受到限制。对于因您提供的信息不真实、不准确或不完整导致的损失由您承担。
		2、我们有权根据您所提供注册信息的真实性、准确性、完整性以及是否符合法律法规规定及盘古宝账号规定的其它条件，决定您的注册成功与否。如您提供的注册信息存在虚假信息或冒用他人信息等情况，盘古网络作为本协议服务的提供方有权停止该账号的继续使用。
		3、您在使用盘古宝账号的过程中，所提供的注册信息发生变动，应及时进行变更。
		4、未成年人在注册使用盘古宝账号的服务前，应事先取得监护人的同意。监护人的同意包括但不限于口头的、书面的或者其它形式。监护人应承担未成年人在网站隐私保护的首要责任，且未成年人及其监护人应承担使用本服务而导致的一切后果。
		5、我们与用户一同致力于个人信息的保护，保护用户个人信息是盘古网络的一项基本原则。关于我们如何收集、使用、储存和分享您的个人信息，请仔细阅读和充分理解《盘古宝账号隐私政策》，该隐私政策与本协议具有同等法律效力，您同意本协议即表示能同意该隐私政策的全部内容。  
		（二）账号安全 
		 1、盘古宝账号密码由您自行设定。您应妥善保管您的盘古宝账号与密码，并对使用此盘古宝账号实施的所有活动及其后果承担责任。
		2、您须采取必要措施保护您的号码安全，包括但不限于妥善保管盘古宝账号与密码、安装防病毒木马软件、定期更改密码等措施。
		3、除前述各条款约定外，您还须妥善保管与盘古宝账号及其密码相关的任何数字证书、手机动态口令或验证码、账户绑定的手机号码等一切信息和设备。如您更换、暂停或终止使用上述信息或设备，或遗失或泄露前述信息或设备的，您应及时采取必要措施，以减少可能发生的损失。您知晓并同意，因上述原因所致损失需由您本人承担。
		（三）佣金计算及提取方式
		被推荐客户与盘古网络或盘古网络关联方（包括盘古网络子公司、分公司、子公司的分公司等）签订服务协议并结清合同款项，即为成功签约。推荐客户的合伙人在被推荐客户成功签约后，盘古网络或盘古网络关联方根据被推荐客户的合作金额，按照一定比例给合伙人发放佣金。
		成功签约后10个工作日，由盘古网络或盘古网络关联方的账户向合伙人在盘古宝中绑定的银行账户进行线下转款完成支付，合伙人即可提取。
		（四）账号注销  
		您可通过如下方式注销盘古宝账号：
		如您需要注销盘古宝账号，您可以通过本协议第六条我们预留的电子邮箱联系我们的工作人员进行处理。我们在此善意地提醒您，如您注销盘古宝账号，您将同时无法再通过此账号登录、使用已接入盘古宝账号，也将无法找回您在盘古宝中的任何内容或信息。您在注销盘古宝账号前，请您确认已妥善处理了您盘古宝账号内的所有问题(包括资产、账户和交易状态等）。您一旦注销盘古宝账号，您在盘古宝中的优惠券、积分、资格、订单、佣金等视为您自行放弃，将无法继续使用。您理解并同意，我们无法协助您重新恢复前述服务。注销盘古宝账号并不代表该盘古宝账号注销前的账户行为和相关责任得到豁免或减轻。注销盘古宝账号后，您该账号内的所有信息将被清空，我们将不会再收集、使用或共享与该账户相关的个人信息，但之前的信息如有法律法规要求，我们将按要求进行保存，且在该依法保存的时间内有权机关仍有权依法查询。  
		二、用户行为规范
		（一）用户在使用盘古宝账号过程中应遵守法律法规之规定，以及本协议及其他单独协议之约定。除此之外，您还应禁止从事以下行为：
		1、恶意登录、注册，恶意使用系统功能及服务。干扰或破坏盘古宝账号服务或盘古宝账号相关联的服务器和网络，或不遵守盘古宝账号服务的规定；
		2、恶意诋毁或损害盘古宝账号声誉、利用盘古宝账号用户身份从事违反国家法律法规的活动等行为；
		3、发布、传送、传播、存储危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；
		4、发布、传送、传播、存储侵害他人知识产权、商业秘密等合法权利的内容；
		5、恶意虚构事实、隐瞒真相以误导、欺骗他人；
		6、发布、传送、传播广告信息及垃圾信息；
		7、将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其它计算机代码、档案和程序等资料，加以上传、张贴、发送电子邮件或以其它方式传送；     
		8、违反任何相关的中国法律、行政法规、规章、条例等具有法律效力的规范。  
		（二）如果我们发现或收到他人举报您发布的信息违反本条约定，我们有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，我们有权视用户的行为性质，采取包括但不限于暂停或终止服务，限制、冻结或终止账号使用等措施并追究法律责任。  
		三、免责条款 
		 您理解并同意，我们在以下情况下不承担责任（包括但不限于）：  
		（一）我们不对盘古宝账号服务提供任何形式的保证，包括但不限于本服务符合您的需求，本服务不受干扰、及时提供或免于出错。
		（二）我们的合作单位所提供的服务内容及品质由该合作单位自行负责。
		（三）我们不保证为向会员提供便利而设置的外部链接的准确性和完整性，同时对于该等外部链接指向的不由我们实际控制的任何网页上的内容，我们不承担任何责任。 
		（四）对于本协议第三条造成的服务变更、中断或终止，我们不承担责任。
		（五)因以下情况没有正确执行您提交的盘古宝账号用户操作指令而造成损失的，我们不承担任何责任：
		 1、指令信息不明、存在乱码或不完整等；
		 2、您所拥有的产品或服务发生失效、终止等情况；
		 3、其他盘古宝账号无过失的情况。 
		（六）对于受到计算机病毒、木马或其他恶意程序、黑客攻击所造成的损失。
		（七）您须安全使用账号，妥善保存盘古宝账号和密码，对您保管不善造成的损失，我们不承担责任。 
		（八）如果您在共享环境下或在电脑被远程监控的情况下登录盘古宝账号，由此造成的损失，我们不承担责任。 
		（九）盘古宝账号不允许您使用他人身份信息注册，否则，因此产生的法律责任将由您本人承担，给他人造成损失的，您应给予赔偿。
		（十）如您使用他人账号，须事先获得他人同意。一旦输入正确的账号和密码，我们即视您为已获得他人同意。您与他人之间因此产生的任何纠纷与盘古宝账号或盘古网络无关，对您或他人的损失，我们不承担责任，并且如给我们造成损失，我们将保留追索的权利。
		（十一）如您将您的账号出借给他人使用，一旦他人输入正确的账号和密码，我们即视他人已获得您的同意。您与他人之间因此产生的任何纠纷与盘古宝账号或盘古网络无关，对您或他人的损失，我们不承担责任，并且如给我们造成损失，我们将保留向您追索的权利。
		（十二）如果您将账号详细信息输入其他任何服务系统而不是输入盘古宝账号安全登录系统，由此造成的损失，我们不承担责任。
		（十三）您通过移动通讯设备登录相关网站和使用相关服务，因使用移动通讯设备过程中出现的信息的不完整、丢失或被第三方拦截等不可归责于盘古宝账号的情形，我们不承担责任。
		（十四）因无法预见、无法避免且无法克服的不可抗力事件，导致盘古宝账号在本协议项下的义务无法履行或无法按时履行，我们将在法律允许的范围内免责。
		（十五）如果盘古宝账号存在投入使用时的科学技术水平尚不能发现的缺陷，由此造成的损失，我们不承担责任。  
		四、服务的变更、中断或终止
		您理解，盘古宝账号需要定期或不定期对提供服务的系统或相关设备进行检修或者维护，或对盘古宝账号的系统进行升级、改造。如因此类情况而造成服务在合理时间内的中断，我们无需为此承担任何责任。但我们将尽可能事先进行通告并根据情况在相应服务页面提前作出通知。
		（一）如发生下列任何一种情形，我们有权不经通知而中断或终止向您提供本协议项下的服务而无需对您或任何第三方承担任何责任：
		 1、根据法律法规规定您应提交真实信息，而您提供的个人信息不真实、或与注册时的信息不一致又未能提供合理证明；
		 2、您违反相关法律法规或本协议的约定；
		 3、按照法律法规或主管部门的要求；
		 4、出于安全的原因或其它必要的情形。
		（二）您有责任自行备份存储在本服务中的数据。如果您的服务被终止，我们可以从服务器上永久地删除您的数据，但法律法规另有规定的除外。服务终止后我们没有义务向您返还数据。  
		五、法律适用及管辖  
		本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中国大陆法律（不含冲突法）；如法律无相关规定的，参照商业惯例或行业惯例。为执行本协议或与本协议有关的一切争议（包括盘古宝账号隐私政策引起的争议），均应首先由该争议所涉协议主体协商解决；协商不成的，任何一方均有权就相关争议向沈阳市和平区人民法院（本协议为线上协议，协议签订地、履行地、实际联系地为沈阳市和平区）提起诉讼。 
		 六、如何联系我们 
		 如您对本协议的相关内容，盘古宝账号相关服务有任何问题、意见或建议，可通过以下方式联系我们：
		 1、发送电子邮件到我们的邮箱：advice@panguweb.cn
		 2、以书面形式寄送至以下地址：辽宁省沈阳市和平区三好街100号华强广场A座22层
		 本版更新时间：2020.09.25
		 本版生效时间：2020.09.25

						</view>
					</view>
					<view class="notice-box">
						<view class="notice-box-tit d-center">
							<view>*</view>
							<view>盘古宝账号隐私政策</view>
						</view>
						<view class="notice-con">
		盘古网络集团有限公司(以下称“我们”)尊重并保护用户（以下称“您”）的隐私和个人信息。您使用我们的产品及服务时，我们将按照《盘古宝账号隐私政策》（以下称“本政策”)收集、存储、使用及对外提供您的个人信息。我们希望通过本政策向您说明在您使用我们的服务时，我们对个人信息收集的范围、对个人信息如何保存、使用、保护等，以及我们为您提供的访问、更新、删除和保护这些信息的方式。我们将按照法律法规要求，遵循业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
		本政策适用于我们向您提供的盘古宝小程序的产品和服务，但不适用于盘古宝小程序中由第三方向您提供的产品或服务，也不适用于我们已另行设置独立隐私政策的产品或服务。本政策与盘古宝服务关系紧密，本政策具有合同效力。在使用我们的服务前，我们请您务必仔细阅读并充分理解本政策全部内容。一旦您开始使用我们的产品或服务，将被视为对本政策内容的接受和认可，并同意接受本政策的约束。
		为说明盘古宝会如何收集、使用和存储您的个人信息及您享有何种权利，我们将通过本文件向您阐述相关事宜，其中要点如下：
		1)个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。如昵称、头像、真实姓名、出生日期、登录手机号、身份证件号码、其他证件类型及证件号码、性别、国籍（地区）、职业、个人生物识别信息、常住地、家庭地址/家乡、邮寄地址、通信通讯联系方式、通信记录和内容、账号密码、财产信息、征信信息、行踪轨迹、住宿信息、健康生理信息、交易信息、银行卡号、开户行、银行预留手机号、微信号、支付宝账号、QQ号、电子邮箱等。您保证您提供的个人信息是真实、合法、完整、有效的信息。*
		2)我们将逐一说明我们收集的您的个人信息类型及其对应的用途，以便您了解我们针对某一特定功能所收集的具体个人信息的类别、使用理由及收集方式。
		3)当您使用一些功能时，我们会在获得您的同意后，收集您的一些敏感信息，例如您在使用从通讯录获取推荐客户信息的功能时，我们会收集到您所选手机号；您在使用推荐客户功能，填写客户信息时，我们会收集到您推荐客户的姓名、名称、手机号等信息。除非按照相关法律法规要求必须收集，拒绝提供这些信息仅会使您无法使用相关特定功能，但不影响您正常使用盘古宝的其他功能。  
		4)目前，盘古宝一些功能会向相关监管机构授权的第三方提供信息用于信息真实性验证或服务提供，对此您予以充分理解并完全同意，如当您使用到某些功能触发盘古宝短信发送时，为使您能成功收到相关短信，我们会将您的手机号共享至第三方短信运营商；当您使用身份证扫描功能上传证件照时，为验证您上传证件的有效性，我们会将身份证信息共享至第三方进行验证；当您使用认证功能或修改个人信息时，为验证您所填个人信息的正确性，我们会将您的姓名、手机号、身份证和银行卡号共享至第三方进行校验。我们会将对外提供信息的行为进行风险评估，确认以上第三方机构提供的验证服务合法合规。
		5)目前，盘古宝不会主动从第三方获取您的个人信息。如未来为业务发展需要从第三方间接获取您的个人信息，我们会在获取前向您明示您个人信息的来源、类型及使用范围，如盘古宝开展业务需进行的个人信息处理活动超出您原本向第三方提供个人信息时的授权同意范围，我们将在处理您的该等个人信息前，向您明示并征得您的同意；此外，我们会严格遵守相关法律法规的规定，不从非法渠道间接获取您的个人信息。  
		6)您可以通过本指引所列途径访问、更正、删除您的个人信息，也可以注销帐号、投诉举报以及设置隐私功能。
		如您想了解更加详尽的信息，请根据以下索引阅读相应章节： 
		 1.我们如何收集信息2.信息的存储3.信息安全4.我们如何使用信息5.对外提供6.您的权利 7.变更8.未成年人保护 9.联系我们 
		1.我们如何收集信息
		在您使用盘古宝服务的过程中，盘古宝会按照如下方式收集您在使用服务时主动提供或因为使用服务而产生的信息，用以向您提供服务、优化我们的服务以及保障您的帐号安全： 
		1.1当您使用注册功能时，我们会收集您的姓名、手机号码，收集这些信息是为了快速完成盘古宝注册，若不提供或不同意收集这类信息，您可能无法正常使用我们的个人信息认证、短信通知等服务。 
		1.2为保障您的账号安全，我们会收集、汇总、记录的信息，包括日志信息、操作系统、设备型号、系统版本、设备厂商以及手机常用属性信息，这类信息是为提供服务必须收集的基础信息。如您不同意我们记录前述信息，可能无法注册及使用盘古宝账号。
		 1.3当您使用实名认证功能时，我们会收集您的证件类型、证件号码、常住地、开户行、银行卡号、账户名、刷脸认证等信息，并可能通过验证账号/卡密码等方式对有关信息进行有效性核验。收集这些信息是为了完善个人信息，若不提供或不同意收集这类信息，您可能无法正常使用我们的客户推荐功能及佣金发放服务。 
		 1.4当您使用证件上传功能时，我们会收集您的证件照图片，收集这些信息是由于盘古宝发放的佣金统一由公司按税法规定预缴税款，在缴纳税款时需收集兼职销售员个人证件照图片，若不提供或不同意收集这类信息，您推荐客户成交后所获得的佣金无法正常发放。 
		 1.5当您使用客户推荐功能时，我们会收集您所填写的客户名称、客户姓名、客户手机，收集这些信息是为完成客户推荐以及查看客户购买状态等，若不提供或不同意收集这类信息，您将无法正常推荐客户。
		 1.6当您使用盘古宝服务时，为保障您正常使用我们的服务，维护我们服务的正常运行，改进及优化我们的服务体验以及保障您的帐号安全，我们会收集您的操作系统、登陆IP地址、服务日志信息（如您修改个人信息、登录操作）等日志信息，这类信息是为提供服务必须收集的基础信息。 
		 1.7当您使用盘古宝服务时，为改进及优化我们的服务体验，给您提供更精确的服务，我们会申请收集您的位置信息，您可自行选择是否授权，且后期可在收集设置中自行打开或关闭该授权。另外，根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意： 
		1）与国家安全、国防安全等国家利益直接相关的； 
		2）与公共安全、公共卫生、公众知情等重大公共利益直接相关的； 
		3）与犯罪侦查、起诉、审判和判决执行等直接相关的；
		4）出于维护您或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；  
		5）所收集的个人信息是您自行向社会公众公开的；
		6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；  
		7）根据您要求签订和履行合同所必需的； 
		8）用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障； 
		9）为开展合法的新闻报道所必需的；
		10)出于公共利益开展统计或学术研究所必要，且其对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；  
		11)法律法规规定的其他情形。请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。请您注意，目前盘古宝不会主动从第三方获取您的个人信息。如未来为业务发展需要从第三方间接获取您个人信息，我们会在获取前向您明示您个人信息的来源、类型及使用范围，如盘古宝开展业务需进行的个人信息处理活动超出您原本向第三方提供个人信息时的授权同意范围，我们将在处理您的该等个人信息前，向您明示并征得您的同意；此外，我们会严格遵守相关法律法规的规定，不从非法渠道间接获取您的个人信息。  
		2.信息的存储 
		2.1信息存储的地点我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。 
		2.2信息存储的期限
		一般而言，我们仅为实现目的所必需的期限内保留您的个人信息，当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并在合理的期限内删除您的个人信息或进行匿名化处理。 
		 3.信息安全
		我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。例如，我们会使用加密技术(例如，SSL）、匿名化处理等手段来保护您的个人信息。我们通过不断提升的技术手段加强安装在您设备端的软件的安全能力，尽最大努力防止您的个人信息泄露。例如，我们为了安全传输会在您设备本地完成部分信息加密的工作；对安装的软件发布前进行恶意代码检测、漏洞检测和修复等。我们建立专门的管理制度、流程和组织以保障信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审计。若发生个人信息泄露等安全事件，我们会启动应急预案，防止该等安全事件进一步扩大，并以推送通知、公告等形式告知您。 
		 4.我们如何使用信息
		4.1 实现本隐私政策中“我们如何收集个人信息”所述目的。
		4.2为了保障服务的稳定性和安全性，我们会将您的个人信息用于身份验证、安全防范、诈骗检测、预防或禁止非法活动、降低风险、存档和备份用途。
			4.3 根据法律法规或监管要求向相关部门进行报告。
			4.4我们会采取脱敏、去标识化等方式对您的个人信息进行综合统计、分析加工，以便为您提供更加准确、个性、流畅及便捷的服务，或帮助我们评估、改善或设计服务及运营活动。
			4.5当我们要将信息用于本隐私政策未载明的其他用途时，会按照法律法规及国家标准的要求以确认协议、具体场景下的文案确认动作等形式再次征得您的同意。
		征得授权同意的例外
		根据相关法律法规规定，以下情形中收集您的信息无需征得您的授权同意：
		1）与国家安全、国防安全直接相关的；
		2）与公共安全、公共卫生、重大公共利益直接相关的；
		3）与犯罪侦查、起诉、审判和判决执行等直接相关的；
		4）出于维护信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；
		5）所收集的个人信息是您自行向社会公众公开的；
		6）从合法公开披露的信息中收集信息的，如合法的新闻报道、政府信息公开等渠道；
		7）根据您的要求签订和履行合同所必需的；
		8）用于维护盘古宝账号服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；
		9）法律法规规定的其他情形。
		4.6我们可能将通过某些功能所收集的信息用于我们的其他服务。例如，我们可能将您在使用我们某一功能或服务时我们收集的信息，在另一功能或服务中用于向您提供特定内容，包括但不限于展示广告（您可以在关于广告页面中了解更多）、对您阅读过的内容进行信息安全类提示、基于特征标签进行间接人群画像并提供更加精准和个性化的服务和内容等。为了确保服务的安全，帮助我们更好地了解我们应用程序的运行情况，我们可能记录相关信息，例如，您使用应用程序的频率、崩溃数据、总体使用情况、性能数据以及应用程序的来源等。我们尽可能不会主动将我们存储在分析软件中的信息与您在应用程序中提供的个人身份信息相结合，若存在信息结合的，请您务必立即通知我们处理。如我们使用您的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的同意。由于信息处理的复杂性，您充分理解并同意若未及时向您告知并征得您同意的，我们可在使用您上述个人信息后再次向您告知并征得您的同意。 
		 5.对外提供
		5.1 为验证信息或提供服务
		目前，盘古宝一些功能会向相关监管机构授权的第三方提供信息用于信息真实性验证或提供服务，对此您予以充分理解并完全同意，如当您使用到某些功能触发盘古宝短信发送时，为使您能成功收到相关短信，我们会将您的手机号共享至第三方短信运营商；当您使用身份证扫描功能上传证件照时，为验证您上传证件的有效性，我们会将身份证信息共享至第三方进行验证；当您使用认证功能或修改个人信息时，为验证您所填个人信息的正确性，我们会将您的姓名、手机号、身份证和银行卡号共享至第三方进行校验。我们会对外提供信息的行为进行风险评估，确认以上第三方机构提供的验证服务合法合规。
		5.2共享
		5.2.1我们承诺对您的信息进行严格保密，我们不会与盘古网络及其关联公司以外的第三方公司、组织和个人共享您的个人信息，除非存在以下一种或多种情形：
			1）您自行提出要求的；
			2）事先已征得您的明确授权同意；
			3）根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供；
			4）在法律法规允许的范围内，为维护我们、我们的关联公司、您或社会公众利益、财产或安全免遭损害而有必要提供；
			5）只有共享您的个人信息，才能实现我们的产品与/或服务的功能或提供您需要的服务；
			6）应您需求为您处理您与他人的纠纷或争议；
			7）符合与您签署的相关协议(包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；
			8）基于学术研究而使用；
			9）基于符合法律法规的社会公共利益而使用。
			5.2.2当您投诉他人或被他人投诉时，为了保护您及他人的合法权益，我们可能会将您的姓名及有效证件号码、联系方式、投诉相关内容提供给消费者权益保护部门及监管机关，以便及时解决投诉纠纷，但法律法规明确禁止提供的除外。
			5.3转让
			转让是指将个人信息控制权向其他公司、组织或个人转移的过程。原则上我们不会将您的个人信息转让，但以下情况除外：
			1）您自行提出要求的；
			2）事先已征得您的明确授权同意；
			3）如我们进行兼并、收购、重组、分立、破产、资产转让或类似的交易，而您的个人信息有可能作为此类交易的一部分而被转移，我们会要求新持有人继续遵守和履行该隐私政策的全部内容（包括使用目的、使用规则、安全保护措施等），
		否则我们将要求其重新获取您的明示授权同意；
			4）法律法规等规定的其他情形。
		如具备上述事由确需转让的，我们会在转让前向您告知转让的信息的目的、类型（如涉及您
		的个人敏感信息的，我们还会向您告知涉及的敏感信息的内容)，并在征得您的授权同意后再转让，但法律法规另有规定的或本政策另有约定的除外。
			5.4公开披露
			我们仅会在以下情形，公开披露您的个人信息：
			1）在您明确同意或主动选择情况下，我们可能会公开披露您所指定的个人信息；
			2）根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您个人信息的情况下，我们可能会依据所要求公开披露您的个人信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。
		5.5例外情形
		根据相关法律法规及国家标准，以下情形中，我们可能会共享、转让、公开披露您的个人信息无需事先征得您的授权同意: 
		1）与国家安全、国防安全直接相关的；
		2）与公共安全、公共卫生、重大公共利益直接相关的；
		3）与犯罪侦查、起诉、审判和判决执行等直接相关的； 
		4）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
		5）个人信息主体自行向社会公众公开的个人信息；  
		6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
		7）法律法规规定的其他情形。 
		6.您的权利
		在您使用盘古宝期间，为了您可以更加便捷地访问、更正、删除您的个人信息，同时保障您撤回对个人信息使用的同意及注销帐号的权利，我们在产品设计中为您提供了相应的操作设置，您可以参考下面的指引进行操作。此外，我们还设置了投诉举报渠道，您的意见将会得到及时的处理。  
		6.1访问个人信息 
		访问[姓名、手机号、证件类型、证件号、身份类型、开户行、银行账号、账户名]等基本信息：
		1）进入盘古宝后，点击“我的”；
		2）点击我的资料；
		3）进行信息查询访问。 
		6.2更正个人信息 
		更改[姓名、证件类型、证件号、合伙人城市、开户行、银行账号、账户名]：
		1）进入盘古宝后，点击“我的”；
		2）点击我的资料；
		3）更改信息。 
		6.3注销帐号  
		如您需要注销盘古宝账号，您可以通过第9节条我们预留的电子邮箱联系我们的工作人员进行处理 （当您注销帐号后，我们将删除或匿名化处理您的个人信息） 。
		6.4在以下情形下，我们可能无法响应您的请求：
		1）与国家安全、国防安全有关的；
		2）与公共安全、公共卫生、重大公共利益有关的；
		3）与犯罪侦查、起诉和审判等有关的；
		4）有充分证据表明您存在主观恶意或滥用权利的；
		5）响应您的请求将导致其他个人、组织的合法权益受到严重损害的；
		6）涉及商业秘密的。
		7.变更
		在相关法律法规发生变化或我们服务发生变动等情形下，我们如需对本政策内容做出修改，将会在您登陆时以推送通知、弹窗等形式向您提示变更后的条款。您如不同意新的修改内容，请及时与我们联系或立即停止使用本政策约定的服务，如您选择继续使用相关服务，则视为您完全同意并接受新的修改内容。如客观情况及经营方针变化导致我们需中断或停止相关服务的，我们将及时进行通知，请您对此表示理解和认同。 
		8.未成年人保护
		8.1 我们非常重视对未成年人个人信息的保护。根据相关法律法规的规定，若您是18周岁以下的未成年人，在使用盘古宝服务前，应事先取得您的家长或法定监护人的口头的、书面的或其他形式同意。我们将根据国家相关法律法规的规定保护未成年人的信息。
		8.2 我们不会主动直接向未成年人收集其个人信息。对于经监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、监护人同意或者保护未成年人所必要的情况下使用或披露此信息。
			8.3 如果有事实证明未成年人并未取得监护人同意的情况下注册使用了我们的产品与/或服务，我们会与相关监护人协商，并设法尽快删除相关个人信息。
			8.4 对于可能涉及的不满14周岁的儿童个人信息，我们进一步采取以下措施予以保障：
			1）对于收集到的儿童个人信息，我们除遵守本隐私政策关于用户个人信息的约定外，还会秉持正当必要、知情同意、目的明确、安全保障、依法利用的原则，严格遵循《儿童个人信息网络保护规定》等法律法规的要求进行存储、使用、披露，且不会超过实现收集、使用目的所必须的期限，到期后我们会对儿童个人信息进行删除或匿名化处理。我们会指定专人负责儿童个人信息保护事宜。
		2）儿童或其监护人有权随时访问和更正儿童个人信息，还可以向我们提出更正和删除的请求。
		若您是未成年人的监护人，当您对您所监护的未成年人的个人信息有相关疑问时，请通过第9节中的联系方式与我们联系。  
		9.联系我们
		当您有其他的投诉、建议、未成年人个人信息相关问题时，您也可以将问题发送至：advice@panguweb.cn我们将尽快审核所涉问题，并在成功验证您的用户身份后的15天内予以回复。
						</view>
					</view>
				</scroll-view>
				<view class="zc-btn" @tap="zcpopupHide()">确定</view>
			</view>
		</view>
		<!-- 完善信息弹窗 -->
		<view class="popup-wrap" v-if="infopopup">
			<view class="mask" @tap="wsinfopopupHide()"></view>
			<view class="infopopup">
				<image src="https://shop.pangu.mobi/static/mobile/popup_top.png" class="infopopup-bg" mode="widthFix"></image>
				<view class="infopopup-inner one">
					<view class="info-title">温馨提示</view>
					<view class="info-tip">您还未完善个人信息<br />完善后即可使用推荐<br />查看佣金等功能</view>
					<view class="options d-center">
						<view class="op-btn" @tap="zdgetlocation()">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 确认信息弹框 -->
		<view class="popup-wrap" v-if="infoconfirmpopup">
			<view class="mask" @tap="wsinfopopupHide()"></view>
			<view class="infopopup infocon">
				<view class="infopopup-inner one">
					<view class="info-title">温馨提示</view>
					<view class="info-tip">
						本人核对个人信息无误<br />如因账号信息错误所引起的全部后果<br />均由本人承担
					</view>
					<view class="options d-center">
						<view class="op-btn" @tap="submit()">确定</view>
						<view class="op-btn" @tap="infoconfirmpopuphide()">取消</view>
					</view>
				</view>
				<!-- <image src="https://shop.pangu.mobi/static/mobile/popup_top.png" class="infopopup-bg" mode="widthFix"></image>
				<view class="infopopup-inner one">
					<view class="info-title">温馨提示</view>
					<view class="info-tip">
						本人核对个人信息无误<br />如因账号信息错误所引起的全部后果<br />均由本人承担
					</view>
					<view class="options d-center">
						<view class="op-btn" @tap="submit()">确定</view>
						<view class="op-btn" @tap="infoconfirmpopuphide()">取消</view>
					</view>
				</view> -->
			</view>
		</view>
		<!-- 已经完善过的信息==提示框 -->
		<!-- 微信 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="popup-wrap" v-if="alreadyconfirmpopup">
			<view class="mask" @tap="wsinfopopupHide()"></view>
			<view class="infopopup">
				<image src="https://shop.pangu.mobi/static/mobile/popup_top.png" class="infopopup-bg" mode="widthFix"></image>
				<view class="infopopup-inner already">
					<view class="info-title">温馨提示</view>
					<view class="info-tip">
						1.信息已在百度小程序中绑定，若需进行个人信息同步？请点击[是]<br />
						2.若百度小程序绑定信息非本人操作，请点击[否]后，撰写邮件发送至advice@panguweb.cn
					</view>
					<view class="options d-center">
						<view class="op-btn" @tap="mergeInfo()">是</view>
						<view class="op-btn" @tap="alreadyconfirmpopuphide()">否</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 百度 -->
		<!-- #ifdef MP-BAIDU -->
		<view class="popup-wrap" v-if="alreadyconfirmpopup">
			<view class="mask" @tap="wsinfopopupHide()"></view>
			<view class="infopopup">
				<image src="https://shop.pangu.mobi/static/mobile/popup_top.png" class="infopopup-bg" mode="widthFix"></image>
				<view class="infopopup-inner already">
					<view class="info-title">温馨提示</view>
					<view class="info-tip">
						1.信息已在微信小程序中绑定，若需进行个人信息同步？请点击[是]<br />
						2.若微信小程序绑定信息非本人操作，请点击[否]后，撰写邮件发送至advice@panguweb.cn
					</view>
					<view class="options d-center">
						<view class="op-btn" @tap="mergeInfo()">是</view>
						<view class="op-btn" @tap="alreadyconfirmpopuphide()">否</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 入群弹窗 -->
		<view v-if="rqpopup">
			<view class="mask1" @tap="closeRqparty()"></view>
			<view class="popup">
				<view @tap="closeRqparty()" class="close-wrap wx">
					<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/gb.png" mode="aspectFit"></image>
				</view>
				<image class="pop-img-wx" src="https://shop.pangu.mobi/static/mobile/wx_kf_popup.jpg" mode="widthFix"></image>
				<view class="wx-contact-btn" @tap="saveNewImg()"></view>
			</view>
		</view>
		<!-- 百度完善信息后弹窗 -->
		<view v-if="bdfinishinfopopup">
			<view class="mask1" @tap="closeBdPopup()"></view>
			<image class="pop-img-wx-bd" src="https://shop.pangu.mobi/static/mobile/bd-pic1.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import pcaPicker  from '../../components/pca-picker/pca-picker.vue'
	export default{
		data(){
			return{
				submitbtn:true,
				popupshow:false,
				active:false,
				defaultValue:{
					provinceCode: '',//省code
					citiesCode: '',//市code
				}, 
				areatext:'请选择地址',
				name:'',
				phone:'',
				idnum:'',
				khh:'请选择开户行',
				fhzh:'',
				yhnum:'',
				name1:'',
				checked:true,
				jg:false,
				zcpopupshow:false,  //政策弹窗
				infopopup:false,   //提示填写信息弹窗
				infoconfirmpopup:false,   //提交信息弹窗
				infolist:[],   //修改资料时返回的数据
				disabled:false,
				addinfo:'',
				disabled1:true,
				already:false,
				alreadyconfirmpopup:false,   //合并信息弹窗
				array: ['请选择开户行','中国工商银行', '招商银行', '中国农业银行', '中国建设银行','中国银行','中国民生银行','中国光大银行','中信银行','交通银行','兴业银行','上海浦东发展银行','中国人民银行','华夏银行','深圳发展银行','广东发展银行','国家开发银行','中国邮政储蓄银行','中国农业发展银行','盛京银行','平安银行'],
				index: 0,
				latitude:'',   //纬度   
				longitude:'',   //经度  
				zd:true,
				getagain:false,
				rqpopup:false,
				bdfinishinfopopup:false
			}
		},
		components: {
			pcaPicker
		},
		onLoad(options){
			console.log(options)
			this.addinfo=options.addinfo
			console.log(this.addinfo)
			if(uni.getStorageSync('status')==22){
				this.disabled=false
			}
			this.addinfo=options.addinfo
			if(this.addinfo){
				this.infopopup=true
			}
			if(uni.getStorageSync('status')==11){
				uni.request({
					url:this.$burl+'/change_info',
					data:{
						user_id:uni.getStorageSync('user_id')
					},
					success:(res)=>{
						uni.setStorageSync('re_code', res.data.re_code);
						if(res.data.re_code==0){
							this.infolist=res.data.data
							this.name=res.data.data.name
							// this.name1=res.data.data.bank_name
							this.khh=res.data.data.account_bank
							this.areatext=res.data.data.address
							this.yhnum=res.data.data.bank
							this.fhzh=res.data.data.branch
							this.idnum=res.data.data.card
							this.phone=res.data.data.phone
							this.submitbtn=false
							this.disabled=true
						}else{
							this.submitbtn=true
							this.disabled=false
						}
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			}else{
				if(!this.addinfo){
					this.getLocation()
				}
			}
		},
		methods:{
			// 保存图片
			saveNewImg(){
				let that=this
				let imgSrc = 'https://shop.pangu.mobi/static/mobile/wx_kf_img.png';
				uni.downloadFile({
				    url: imgSrc,
					success: function (res) {
						console.log(res);
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
						    filePath: res.tempFilePath,
						    success: function (data) {
								uni.showToast({
									title: '保存成功',
								    icon: 'success',
								    duration: 2000
								})
						    },
						})
				    },
				    fail(res){
					    console.log(res)
				    }
				})
			},
			// 点击广告位加入合伙人群
			goJoinParty(){
				this.rqpopup=true
			},
			// 关闭入群弹窗
			closeRqparty(){
				this.rqpopup=false	
				uni.reLaunch({
					url: '../mine/my_index'
				});
			},
			getChild(e){
				this.popupshow=false
				this.areatext=e
			},
			zdgetlocation(){
				this.infopopup=false,
				this.getLocation()
			},
			// 获取地址
			getLocation(){
				if(this.disabled!=true){
					let that=this;
					uni.getLocation({
						type: 'gcj02',
						success:res=>{
							console.log(res)
							that.latitude=res.latitude,
							that.longitude=res.longitude
							uni.request({
								url:that.$burl+'/get_location',
								data:{
									lat:that.latitude,
									lng:that.longitude
								},
								success:res=>{
									console.log(res)
									that.areatext=res.data.data.province+'-'+res.data.data.city,
									that.zd=false
								}
							})
						},
						fail:res=>{
							uni.showToast({
								title:'获取位置失败，请手动选择',
								icon:'none'
							}),
							that.zd=false
						}
					})
				}
			},
			// 选择银行
			bindPickerChange: function(e) {
				console.log(this.array[e.target.value])
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.khh = this.array[e.target.value]
			},
			// 选择地址弹出框
			popupShow(){
				if(this.disabled==true){
					this.popupshow=false,
					this.active=false
				}else{
					this.popupshow=true,
					this.active=true
				}
			},
			// 隐藏选择地址弹出框
			popupHide(){
				this.popupshow=false
			},
			// 选择地址
			change(e){
				console.log(e)
				this.areatext=e[0].name+'-'+e[1].name,
				this.popupshow=false
			},
			// 政策弹窗
			zcPopupShow(){
				this.zcpopupshow=true
			},
			// 政策弹窗关闭
			zcpopupHide(){
				this.zcpopupshow=false
			},
			// 完善信息弹窗消失
			infopopuphide(){
				this.infopopup=false
			},
			// 是否合并信息弹窗消失
			alreadyconfirmpopuphide(){
				this.alreadyconfirmpopup=false
			},
			//点击提交时弹窗
			infoconfirmpopupshow(){
				let that=this;
				if(!/^[\u4e00-\u9fa5]{2,4}$/.test(that.name)){
					uni.showToast({title:"请输入正确的姓名！", icon:"none"})
				}else if(!/^1(3|4|5|7|8)\d{9}$/.test(that.phone)){
					uni.showToast({title:"请输入正确的手机号码！", icon:"none"})
				}else if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(that.idnum)){
					uni.showToast({title:"请输入正确的身份证号！", icon:"none"})
				}else if(!/^([1-9]{1})(\d{15}|\d{18}|\d{16}|\d{17})$/.test(that.yhnum)){   //19位
					uni.showToast({title:"请输入正确的银行卡号！", icon:"none"})
				}else if(!/^[\u4e00-\u9fa5]{2,4}$/.test(that.name)){
					uni.showToast({title:"请输入正确的姓名！", icon:"none"})
				}else if(that.khh=='请选择开户行'){
					uni.showToast({title:"请选择开户行！", icon:"none"})
				}else if(that.fhzh.length==0){
					uni.showToast({title:"请选择分行/支行！", icon:"none"})
				}else if(that.checked){
					that.jg=true   //弹窗
					setTimeout(function(){  
						that.jg=false   //弹窗消失
					},3000)
				}else{
					this.infoconfirmpopup=true
				}
			},
			// 确认信息弹窗消失
			infoconfirmpopuphide(){
				this.infoconfirmpopup=false
			},
			// 勾选协议
			check(){
				this.checked=!this.checked
			},
			// 提交
			submit(){
				let that=this;
				this.infoconfirmpopup=false
				uni.showLoading({
					title: '信息核对中',  
					mask:true  
				});
				// 已注册
				if(uni.getStorageSync("status")==11){
					uni.request({
						url:that.$burl+'/info',
						data:{
							user_id:uni.getStorageSync('user_id'),
							name:that.name,
							phone:that.phone,
							card:that.idnum,
							address:that.areatext,
							account_bank:that.khh,
							bank:that.yhnum,
							branch:that.fhzh,
							bank_name:that.name,
							type:uni.getStorageSync("type")
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success:(res)=>{
							console.log('==========================')
							console.log(res)
							uni.hideLoading()
							if(res.data.re_code==4103){
								uni.showToast({title:'姓名、身份证、开户行手机号、银行卡号四项信息不匹配！', icon:"none"})
							}else if(res.data.re_code==4003){
								that.already=true   // 身份信息已被其他账户绑定---弹窗
								setTimeout(function(){  
									that.already=false   // 弹窗消失
								},3000)
							}else if(res.data.status==123){      // 信息已经在其他终端完善
								that.alreadyconfirmpopup=true    // 合并消息弹窗
							}else{
								uni.showToast({title:res.data.msg, icon:"none"})
								setTimeout(function(){
									uni.setStorageSync('re_code', res.data.re_code);
									uni.setStorageSync('status',res.data.status)
									that.submitbtn=false
									that.disabled=true
									// if(that.addinfo==2){
									// 	that.rqpopup=true
									// }else{
									// 	uni.reLaunch({
									// 	    url: '../mine/my_index'
									// 	});
									// }
									// #ifdef MP-WEIXIN
									that.rqpopup=true
									// #endif
									// #ifdef MP-BAIDU
									// uni.navigateTo({
									// 	url:'./bd_gfkf'
									// })
									that.bdfinishinfopopup=true
									// #endif
								},1000)
								
							}
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				}else{    //未注册
					uni.request({
						url:that.$burl+'/info',
						data:{
							user_id:uni.getStorageSync('user_id'),
							name:that.name,
							phone:that.phone,
							card:that.idnum,
							address:that.areatext,
							account_bank:that.khh,
							bank:that.yhnum,
							branch:that.fhzh,
							bank_name:that.name,
							type:uni.getStorageSync("type"),
							is_perfect:1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success:(res)=>{
							console.log('--------------------------')
							console.log(res)
							uni.hideLoading()
							if(res.data.re_code==4103){
								uni.showToast({title:'姓名、身份证、开户行手机号、银行卡号四项信息不匹配！', icon:"none"})
							}else if(res.data.re_code==4003){
								that.already=true   // 身份信息已被其他账户绑定---弹窗
								setTimeout(function(){  
									that.already=false   // 弹窗消失
								},3000)
							}else if(res.data.status==123){      // 信息已经在其他终端完善
								that.alreadyconfirmpopup=true    // 合并消息弹窗
							}else{
								uni.showToast({title:res.data.msg, icon:"none"})
								setTimeout(function(){
									uni.setStorageSync('re_code', res.data.re_code);
									uni.setStorageSync('status',res.data.status)
									that.submitbtn=false
									that.disabled=true
									// #ifdef MP-WEIXIN
									that.rqpopup=true
									// #endif
									// #ifdef MP-BAIDU
									that.bdfinishinfopopup=true
									// #endif
								},1000)
								
							}
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				}
			},
			// 关闭百度完善信息弹窗
			closeBdPopup(){
				this.bdfinishinfopopup=false
				uni.reLaunch({
					url: '../mine/my_index'
				});
			},
			// 合并信息，
			mergeInfo(){
				let that=this;
				this.alreadyconfirmpopup=false
				uni.showLoading({
					title: '信息完善中',  
					mask:true  
				});
				uni.request({
					url:that.$burl+'/merge',
					data:{
						user_id:uni.getStorageSync('user_id'),
						name:that.name,
						phone:that.phone,
						card:that.idnum,
						address:that.areatext,
						account_bank:that.khh,
						bank:that.yhnum,
						branch:that.fhzh,
						bank_name:that.name,
						type:uni.getStorageSync("type")
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					success:(res)=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.re_code==0){
							uni.showToast({title:res.data.msg, icon:"none"})
							setTimeout(function(){
								uni.setStorageSync('re_code', res.data.re_code);
								uni.setStorageSync('status',res.data.status)
								uni.setStorageSync('user_id',res.data.user_id)
								that.submitbtn=false
								that.disabled=true
								uni.reLaunch({
								    url: '../mine/my_index'
								});
							},1000)
						}
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			// 修改信息
			changeinfo(){
				this.submitbtn=true
				this.disabled=false
				this.getLocation()
			}
		},
	}
</script>

<style>
	.popup_top{ width:100%;}
	.d-left{display: flex;justify-content:left;align-items:center;}
	.d-right{display: flex;justify-content:flex-end;align-items:center;}
	.d-between{display: flex; justify-content: space-between;align-items:center;}
	.d-center{display: flex;justify-content: center;align-items: center;}
	.infobox{ width:707rpx; padding:27rpx 0; margin:auto; margin-top:41rpx; background: url(../../static/myinfobg.png) no-repeat; background-size: 100% 100%;}
	.rzinfo-top{ padding:25rpx 0 0 41rpx;}
	.top-icon{width:44rpx; height: 44rpx;}
	.top-p{ color:#fb1e14; font-size:35rpx; margin-left:17rpx; font-weight: bold;}
	.top-p span{ font-size: 17rpx; font-weight: normal;}
	.rzinfo-tip{width:97%; height: 94rpx; margin:auto; margin-top:26rpx; background: #fafafa;}
	.rzinfo-tip span{ color:#949494; font-size:20rpx; margin-right: 9rpx; margin-top:-25rpx;}
	.rzinfo-tip .tip-p{width:571rpx; color:#949494; font-size: 20rpx; line-height: 35rpx;}
	.rzinfo-con{ width:90%; margin:auto; margin-top:44rpx;}
	.info-box{ padding: 26rpx 0; border-bottom:1rpx solid #f7f7f7;}
	.info-box:last-child{ border:none;}
	.infobox.yh .info-box:last-child{ border-bottom:1rpx solid #f7f7f7;}
	.info-box-item{ width:35%; padding-left:27rpx; color:#0c0c0c; font-size: 30rpx;}
	.spec{ color:#f52f0e;}
	.info-box input{ width:51%; text-align: right; color:#d0d0d0; font-size: 30rpx; padding-right: 24rpx; color:black;}
	.info-box .area{ font-size: 30rpx; padding-right: 24rpx; /* color:black; */}
	.info-box .area.kong{ font-size: 30rpx; padding-right: 24rpx; color:#d0d0d0;}
	.info-box .area1{ font-size: 30rpx; padding-right: 24rpx; color:#d0d0d0;}
	.info-box.tip{ color:#949494; font-size: 19rpx; padding-left:27rpx;}
	.infobox.yh .top-icon{width: 52rpx; height: 40rpx;}
	.zc{ width:90%; margin:auto;}
	.zc-con{ color: #0c0c0c; font-size:24rpx;}
	.zc-con span{ color: #fb1e14;}
	.btn{ width:50%; height: 85rpx; margin:auto; border-radius:50rpx; background: #fb1e14; color:white; text-align: center; line-height: 85rpx; font-size: 30rpx; font-weight: bold; margin-top:56rpx; margin-bottom:74rpx; padding: constant(safe-area-inset-bottom); padding: env(safe-area-inset-bottom);}
	.yc{ overflow: hidden; height: 100vh;}
	/* 弹窗 */
	.mask{ width:100%; height: 100%; background: rgba(0,0,0,.2); position: fixed; top:0; left:0; z-index:111;}
	.zcpopup{ position: fixed; top:14%; padding-top:40rpx; width: 80%; height:830rpx; left:10%; background: white; z-index:1111; border-radius:10rpx;}
	.popup-title{ color: #0c0c0c; font-size: 30rpx; text-align: center; padding-top:40rpx;}
	.scroll-box{ width:100%; height:690rpx;}
	.scroll-box .notice-box-tit view{ color:#fb2711; font-size: 32rpx; font-weight: bold;}
	.scroll-box .notice-con{ color: black; font-size: 25rpx; text-indent: 60rpx; line-height: 40rpx; padding-top:29rpx; width:80%; margin:auto; white-space: pre-wrap;}
	.notice-box:last-child{ margin-top: 40rpx;}
	.notice-box:last-child .notice-con{ padding-bottom:20rpx; white-space: pre-wrap;}
	.zc-btn{ position: absolute; bottom:0; height:90rpx; line-height:90rpx; width: 100%; text-align: center; font-weight:bold; color: #fb2711; font-size: 31rpx; border-top:1rpx solid #b2b2b2;}
	.infopopup{ width:80%; height: 749rpx; position:fixed; left:10%; top:18%; z-index:111;}
	.infopopup-bg{ width:100%; height:100%;}
	.infopopup-inner{ width: 100%;background: white;margin-top: -2rpx;boder-bottom-radius: 20rpx;border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;position: relative;top: 0;padding-top: 50rpx;}
	.info-title{ color: #f6621f; font-size: 45rpx; text-align: center;}
	.info-tip{ text-align:center; color: #666666; font-size: 30rpx; margin-top: 22rpx;}
	.infopopup-inner.already .info-tip{ width:87%; margin:auto; color: #666666; font-size: 25rpx; margin-top:35rpx; line-height: 43rpx; text-align:left;}
	.infopopup-inner.already .options{ margin-top:74rpx;}
	/*  #ifdef  MP-BAIDU  */
	.infopopup-inner.already .options{ margin-top:30rpx;}
	/*  #endif  */
	.infopopup-inner.one .options{ margin-top:49rpx;}
	.options{ podition:absolute; bottom:0; border-top:1rpx solid #e5e5e5; height: 107rpx; margin-top:71rpx;}
	.op-btn{ width: 50%; border-right: 1rpx solid #e5e5e5; line-height: 107rpx; text-align: center; font-size: 38rpx; color: black;}
	.op-btn:last-child{ border:none;}
	/* 选择同意政策弹出警告 */
	.zcjg{ width: 50%; height: 161rpx; position:fixed; top:20%; left:25%; background:url(../../static/agreenoticebg.png) no-repeat; background-size: 100% 100%; color:white; font-weight: bold; font-size:36rpx; text-align: center; line-height:197rpx; z-index:111;}
	.zcjg.new{ width: 64%; height: 206rpx; position:fixed; top:20%; left:18%; background:url(../../static/agreenoticebg.png) no-repeat; background-size: 100% 100%; color:white; font-weight: bold; font-size:36rpx; text-align: center; line-height:252rpx; z-index:111;}
	.content {display: flex; flex-direction: column; align-items: center; justify-content: center;}
	.logo {height: 200upx; width: 200upx; margin-top: 200upx; margin-left: auto; margin-right: auto; margin-bottom: 50upx;}
	.text-area {display: flex; justify-content: center;}
	.title {font-size: 36upx; color: #8f8f94;}
	.checkimg{ width:40rpx; height:40rpx; margin-right: 10rpx;}
	
	.infocon{ width:80%; height: 715rpx; background: url(../../static/completeinfobg.png) no-repeat; background-size: 100% 100%;}
	.infocon .infopopup-inner{ top:45%;}
	
	.mask1{ width:100%; height: 100%; background: rgba(0,0,0,.7); position: fixed; top:0; left:0; z-index:1111;}
	.popup{ width:80%; position:fixed; left:10%; top:14%; z-index:111111;}
	.pop-img-wx-bd{ width:80%; position: fixed; top: 50%;left: 50%;transform: translate(-50%,-50%); z-index:1111111;}
	/* ..close-btn1{ width:20rpx; height:20rpx; position: fixed; top:22%; right:13%; z-index:1;} */
	.rqimg{ width:80%; position: fixed; top:20%; left:10%;}
	.button-save{ width:80%; height: 100rpx; background: red; color: white; position: fixed; bottom:5%; right:10%; z-index:1; text-align: center; line-height: 100rpx;}
	.content-box-wx{ width: 625rpx; margin: 250rpx auto 30rpx; position: relative;}
	.pop-img-wx{ width:100%;}
	.wx-contact-btn{ position:absolute; bottom:98rpx; right:50rpx; width:290rpx; height: 60rpx;}
	.close-wrap{ width:70rpx; height:70rpx; position:absolute; top:-108rpx; right:14rpx;}
	.close-wrap.wx{ top:1rpx; right:0; z-index:1;}
	.close-btn{width: 25rpx;height: 25rpx; padding-top:21rpx; display:block; margin:auto;}
</style>
