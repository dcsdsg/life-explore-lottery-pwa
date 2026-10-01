# 生活探索抽签机 PWA

纯前端、可安装、可离线使用的生活探索抽签应用。

## 城市探索任务表（独立页面）

原抽签机仍使用仓库首页；新增任务表位于 `city-quests/`，不替换原首页，不共用抽签机个人数据库。

- [城市探索任务表](https://dcsdsg.github.io/life-explore-lottery-pwa/city-quests/)
- [苏州16条详篇](https://dcsdsg.github.io/life-explore-lottery-pwa/city-quests/?city=suzhou)
- [秦皇岛6条简篇](https://dcsdsg.github.io/life-explore-lottery-pwa/city-quests/?city=qinhuangdao)

北京30条、苏州16条、秦皇岛6条；一键完成与撤销、可选清单、本地手记、导出恢复和离线正文。苏州从文昌路站估往返，秦皇岛住宿点未知，只估现场时间。两页分别安装；任务表手机安装仍需真机验收。详细说明见 [任务表维护说明](city-quests/维护说明.md)。

## 数据说明

- 抽签记录、手账与压缩照片保存在当前浏览器的 IndexedDB 中。
- 数据不会上传到服务器，也不会跨设备同步。
- 清除浏览器网站数据或卸载应用可能会删除本地记录。
- 手账标题右侧的“备份”会导出包含照片的 JSON 文件；“恢复”可从该文件覆盖恢复当前设备数据。

## 本地预览

PWA 需要通过 HTTP 服务访问，不能直接双击 `index.html` 测试离线安装功能。

```powershell
npx serve .
```

然后打开终端显示的本地地址。

## GitHub Pages

在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，来源设为 `main` 分支和 `/ (root)`。
