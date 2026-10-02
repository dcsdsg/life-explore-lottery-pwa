'use strict';
// 阅读入口独立于任务清单和个人记录；键为稳定任务 ID + 原阅读材料序号。
// 不镜像仍受版权保护的作品。inline 只收古典原文；guide 是本页原创观察提示。
const readingLink=(label,kind,url,source,note='')=>({label,kind,url,source,note});
const wikiReading=(label,page,note='')=>readingLink(label,'original','https://zh.wikisource.org/zh-hans/'+page,'维基文库',note);
const READING_KIND_LABELS={original:'原文',excerpt:'原文节选',guide:'导读 · 非原文',info:'地点资料 · 非作品原文',book:'书籍介绍 · 非全文'};
const READING_RESOURCES={
 'bjc_jietai:0':{
  expectedTitle:'戒台寺古树养护公告与现场戒坛说明',
  links:[readingLink('读古树复壮与养护资料','info','https://www.bjmtg.gov.cn/mtg11J008/ywdt/202503/13c1419f0437431387d05f574ea756ba.shtml','门头沟区文化和旅游局'),readingLink('读戒台寺背景与参观指南','info','https://www.bjmtg.gov.cn/bjmtg/c104897/202504/fdeac5d987f74895aac01a4c9071d21d.shtml','门头沟区政府')],
  guide:'从“分级、复壮、日常养护”三个词读起。到现场选一棵实际可看的松，记录保护牌、支撑和围栏；戒坛与受戒、传戒相关，具体建筑年代在现场再核对。',
  notice:'这里是公开工作资料和参观指南，不包含全部现场戒坛展签；修缮和开园须确认当天情况。'
 },
 'bjc_tanzhe:0':{
  expectedTitle:'门头沟区情沿革、寺院介绍与古树保护牌',
  links:[readingLink('读潭柘寺建筑与参观资料','info','https://s.visitbeijing.com.cn/attraction/117841','北京旅游网'),readingLink('读门头沟历史沿革','info','https://www.beijing.gov.cn/renwen/bjgk/mtggk/','首都之窗')],
  guide:'把寺院源流、现存殿堂和古树保护牌的年代画成三列。“先有潭柘寺，后有北京城”是地方记忆的说法，不能理解成北京此前没有聚落；古书中的龙潭故事也不能代替考古年代。',
  notice:'参观页的票价、时段是参考，不保证当天接待；完整古树信息仍以现场保护牌为准。'
 },
 'bjc_jietai:1':{
  expectedTitle:'朱自清《潭柘寺戒坛寺》',
  links:[wikiReading('直接读《潭柘寺戒坛寺》全文','潭柘寺戒壇寺')],
  guide:'注意作者看松与寺院空间的方法，再写你今天的观察。文章作于1934年，旅行交通、僧人接待和建筑状态不是今天的指南。'
 },
 'bjc_tanzhe:1':{
  expectedTitle:'朱自清《潭柘寺戒坛寺》',
  links:[wikiReading('直接读《潭柘寺戒坛寺》全文','潭柘寺戒壇寺'),readingLink('再读《帝京景物略》潭柘寺条','original','https://www.shidianguji.com/book/NA04568/chapter/1l3wrnvdmitkj','识典古籍')],
  guide:'选屋顶、竹、树、泉声之一做古今对照。看不见就写无法核对；旧游记后门和古洞路线不能作为今日穿山、越界依据。古书的神异叙述按传说来读。',
  notice:'两个入口提供对应文字，外站需联网；本页导读可离线，不自动下载作品全文。'
 },
 'bjc_literature:0':{
  expectedTitle:'巴金《随想录》',
  links:[readingLink('读《小狗包弟》原文','original','https://www.chinawriter.com.cn/n1/2018/1025/c419384-30361893.html','中国作家网','《随想录》中的一篇；公开网页阅读，无需先找整本书。')],
  guide:'先读这一篇就够了。留意作者怎样从一段私人记忆转向对自己的追问。到文学馆看手稿时，再问：写下经历，是保存事实、表达感受，还是承担责任？这是本页的阅读提示，不是巴金原文。'
 },
 'bjc_luxun:0':{
  expectedTitle:'鲁迅《野草·秋夜》',
  links:[wikiReading('读《秋夜》原文','秋夜_(魯迅)')],
  guide:'先圈出夜空、枣树、小青虫等意象。到旧居或展厅再观察空间：作品里的气氛并不等于故居的历史事实。'
 },
 'bjc_wansong:0':{
  expectedTitle:'鲁迅《在酒楼上》／《祝福》',
  links:[wikiReading('读《在酒楼上》原文','在酒樓上'),wikiReading('读《祝福》原文','祝福')],
  guide:'可先选一篇，比较人物说出的话与没有说出的事。它们是阅读与讨论的入口，不是万松老人塔所在地发生的故事。'
 },
 'bjc_lao_she:0':{
  expectedTitle:'老舍《四世同堂》',
  links:[readingLink('读《四世同堂》的时代与家国导读','guide','https://www.chinawriter.com.cn/n1/2019/0727/c404064-31259189.html','中国作家网')],
  notice:'此链接是作品导读，不是小说全文。可先读导读，再用授权纸书或电子书选读小说。'
 },
 'bjc_shijia:0':{
  expectedTitle:'凌叔华《古韵》',
  links:[readingLink('读“凌叔华与《古韵》”','guide','https://www.chinawriter.com.cn/n1/2017/0418/c404064-29219054.html','中国作家网')],
  notice:'此链接是译者谈《古韵》的文章，不是小说原文；不要把自传体小说逐项当成史实。'
 },
 'bjc_dongsi:0':{
  expectedTitle:'汪曾祺《胡同文化》',
  links:[readingLink('读《胡同文化》报刊选文','excerpt','https://paper.people.com.cn/rmrbhwb/html/2016-11/22/content_1729474.htm','人民日报海外版','报纸明确标注“有删节”，不是完整版本。')],
  guide:'读的时候区分建筑布局、生活细节与作者对文化性格的判断。走进今天的胡同时，可以寻找支持这些判断的细节，也记录与文章不同的变化。'
 },
 'bjc_dongyue:0':{
  expectedTitle:'蒲松龄《聊斋志异》',
  links:[wikiReading('读《聊斋志异·考城隍》','聊齋志異/第01卷#考城隍','第一卷开篇。文学中的城隍故事不是东岳庙史实。')],
  guide:'先看故事怎样借神灵与审判讨论人的行为。到现场看民俗说明时，分别记下小说想象、民间信仰与可核对的历史资料。'
 },
 'bjc_emperors:0':{
  expectedTitle:'司马迁《史记·五帝本纪》',
  links:[readingLink('读《五帝本纪》原文','original','https://ctext.org/shiji/wu-di-ben-ji/zhs','中国哲学书电子化计划','古文原典；页面上的现代翻译不属于本页收录内容。')]
 },
 'bjc_stones:0':{
  expectedTitle:'《纳兰词》任选一首',
  links:[wikiReading('读《长相思》来源页','長相思_(納蘭性德)')],
  inline:{title:'《长相思·山一程》',author:'清 · 纳兰性德',extent:'全词',text:'山一程，水一程，身向榆关那畔行，夜深千帐灯。\n风一更，雪一更，聒碎乡心梦不成，故园无此声。',source:'维基文库；古典原文，标点与简体呈现由本页整理',url:'https://zh.wikisource.org/zh-hans/長相思_(納蘭性德)'},
  guide:'先听词里的脚步、风雪与夜声，再看石刻怎样保存文字。这里选词作观察入口，不据此推定现场某块石刻刻的就是这首词。'
 },
 'bjc_guo:0':{
  expectedTitle:'《元史·郭守敬传》与馆方大都治水材料',
  links:[wikiReading('读《元史》郭守敬传','元史/卷164#郭守敬','向下到“郭守敬”小节，可先看水利六事与通惠河部分。')]
 },
 'bjc_architecture:0':{
  expectedTitle:'梁思成《中国建筑史》图版',
  links:[readingLink('读梁思成建筑研究的背景','guide','https://www.tsinghua.edu.cn/info/1925/75833.htm','清华大学')],
  notice:'这里提供学术背景介绍，不是《中国建筑史》图版或全文。图版请在授权版本中查看。'
 },
 'bjc_bells:0':{
  expectedTitle:'宋应星《天工开物·冶铸》',
  links:[wikiReading('读《冶铸》开篇原文','天工開物/冶鑄第八','该页为第八卷开篇，不是第八卷全部内容。'),wikiReading('读铸钟部分原文','天工開物/鐘')]
 },
 'sz_canli:1':{
  expectedTitle:'茅盾《春蚕》',
  links:[readingLink('读《春蚕》评论与背景','guide','https://www.chinawriter.com.cn/n1/2017/1214/c404064-29707630.html','中国作家网')],
  notice:'这是唐弢评《春蚕》的文章，不是小说原文。可先了解故事的问题，再用授权版本选读。'
 },
 'sz_fengqiao:0':{
  expectedTitle:'张继《枫桥夜泊》',
  links:[wikiReading('读《枫桥夜泊》来源页','楓橋夜泊')],
  inline:{title:'《枫桥夜泊》',author:'唐 · 张继',extent:'全诗',text:'月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。',source:'维基文库；古典原文，简体呈现由本页整理',url:'https://zh.wikisource.org/zh-hans/楓橋夜泊'},
  guide:'先列出声音、光线和水面的意象。现场不必复刻诗中的夜景；观察今天还能看见什么、已经改变了什么。'
 },
 'sz_shantang:0':{
  expectedTitle:'白居易《武丘寺路》',
  links:[wikiReading('读《武丘寺路》来源页','武丘寺路')],
  inline:{title:'《武丘寺路》',author:'唐 · 白居易',extent:'全诗',text:'自开山寺路，水陆往来频。\n银勒牵骄马，花船载丽人。\n芰荷生欲遍，桃李种仍新。\n好住湖堤上，长留一道春。',source:'维基文库；古典原文',url:'https://zh.wikisource.org/zh-hans/武丘寺路'}
 },
 'sz_changmen:1':{
  expectedTitle:'曹雪芹《红楼梦》第一回',
  links:[wikiReading('读《红楼梦》第一回','紅樓夢/第001回','可在页面内找“阊门”及甄士隐出场段落；小说叙述不是古城实测地图。')]
 },
 'sz_yipu:0':{
  expectedTitle:'文震亨《长物志》· 室庐、水石',
  links:[wikiReading('读《长物志》室庐篇','長物志_(四庫全書本)/卷01','本次直达卷一“室庐”；不是全书，也不含“水石”篇。')]
 },
 'sz_huanxiu:0':{
  expectedTitle:'计成《园冶》· 掇山',
  links:[readingLink('读《园冶·掇山》原文','original','https://www.gushicimingju.com/dianji/yuanzhi/19094.html','国学荟')]
 },
 'sz_canglang:0':{
  expectedTitle:'苏舜钦《沧浪亭记》',
  links:[wikiReading('读苏舜钦《沧浪亭记》全文','滄浪亭記_(蘇舜欽)')],
  inline:{title:'《沧浪亭记》开篇',author:'宋 · 苏舜钦',extent:'节选 · 不是全文',text:'予以罪废，无所归，扁舟南游，旅于吴中，始僦舍以处。时盛夏蒸燠，土居皆褊狭，不能出气，思得高爽虚辟之地，以舒所怀，不可得也。',source:'维基文库；古典原文节选',url:'https://zh.wikisource.org/zh-hans/滄浪亭記_(蘇舜欽)'},
  guide:'从开篇的逼仄与求舒展读起，再到现场找竹、水、窗与廊如何改变身体感受。全文入口在上面，不用只凭书名猜意思。'
 },
 'sz_canglang:1':{
  expectedTitle:'归有光《沧浪亭记》',
  links:[wikiReading('读归有光《沧浪亭记》全文','滄浪亭記_(歸有光)')]
 },
 'sz_ouyuan:1':{
  expectedTitle:'《论语》· 微子“耦而耕”相关章',
  links:[wikiReading('读《论语·微子》原文','論語/微子第十八','在章节内找十八之六。')],
  inline:{title:'《论语·微子》十八之六开头',author:'《论语》',extent:'节选 · 不是全章',text:'长沮、桀溺耦而耕，孔子过之，使子路问津焉。',source:'维基文库；古典原文节选',url:'https://zh.wikisource.org/zh-hans/論語/微子第十八'},
  guide:'“耦而耕”可先理解为两人并耕。继续读全章，会遇到隐居与参与世事的分歧；园名的联想不等于园主完全照搬了孔子的立场。'
 },
 'sz_silk:1':{
  expectedTitle:'沈从文《中国古代服饰研究》',
  links:[readingLink('读沈从文服饰研究导读','guide','https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36218.shtml','中国国家博物馆')],
  notice:'这是博物馆研究文章，不是原书全文或全部图版。'
 },
 'sz_kunqu:0':{
  expectedTitle:'汤显祖《牡丹亭》· 游园',
  links:[wikiReading('读《牡丹亭·惊梦》曲文','牡丹亭/驚夢','“游园”曲文在第十出《惊梦》前半；这是文字原典，不是演出视频。')]
 },
 'sz_taohuawu:1':{
  expectedTitle:'郑振铎《中国版画史》相关介绍',
  links:[readingLink('读郑振铎与《中国版画史图录》','guide','https://www.chinawriter.com.cn/n1/2023/0717/c404063-40036866.html','中国作家网')],
  notice:'这是版画史图录的相关介绍，不是图录全文。'
 },
 'sz_luzhi:0':{
  expectedTitle:'叶圣陶《多收了三五斗》',
  links:[readingLink('读叶圣陶在甪直的文学背景','guide','https://www.chinawriter.com.cn/n1/2018/0809/c404064-30217973.html','中国作家网')],
  notice:'这是叶圣陶与甪直的背景文章，不是《多收了三五斗》原文。'
 },
 'sz_luzhi:1':{
  expectedTitle:'叶圣陶《倪焕之》',
  links:[readingLink('读叶圣陶与甪直的背景文章','guide','https://www.chinawriter.com.cn/n1/2018/0809/c404064-30217973.html','中国作家网')],
  notice:'这里是作家与地点的背景材料，不是《倪焕之》原文。'
 }
};
function readingResourcesFor(q,index){
 const item=q.culture.reading[index],entry=READING_RESOURCES[q.id+':'+index];
 // 标题有变化时退回地点资料，避免序号调整后把链接配给另一部作品。
 if(entry&&entry.expectedTitle===item.title)return entry;
 return {
  links:q.culture.sources.slice(0,2).map(s=>readingLink('读地点资料：'+s.title,'info',s.url,'任务资料出处')),
  notice:'目前提供的是相关地点与历史资料，并非上面材料的作品全文、完整展签或演出视频。可先读本页观察提示；原书、现场材料仍需另外查阅。'
 };
}
