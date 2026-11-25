# ExRAIL Research Demo

实验室机器人研究展示网站初版。包含系统首页、Perception / Memory / Navigation 三个详情页、中英文切换、论文筛选及视频弹窗，适配桌面与手机。

## 本地预览

直接用浏览器打开 `index.html`，或在本目录启动静态服务：

```bash
cd /Users/cy/phd_ws/ExRAIL_Demo
python3 -m http.server 4173 --bind 127.0.0.1
```

访问 <http://127.0.0.1:4173>。无需安装依赖或运行构建。

## 修改内容

所有研究内容、负责人及媒体路径集中在 `data.js`：

| 字段 | 内容 |
| --- | --- |
| `people` | 姓名、头像、个人主页、研究介绍 |
| `media` | 首页与详情页的视频、封面 |
| `papers` | 论文题目、arXiv、介绍、输入输出及模块归属 |
| `modules` | 模块介绍、输入、处理、输出及工作原理 |

中文与英文文案分别放在 `zh`、`en` 中。页面默认英文，可在右上角切换，浏览器会记住选择。

### 补充视频

将录制好的 MP4 放入 `material/`，然后修改 `data.js` 中对应的 `media` 条目。例如：

```js
memory: {
  video: './material/memory.mp4',
  poster: './assets/memory.svg'
}
```

`system`、`perception`、`memory`、`navigation` 对应首页视频；`perceptionDetail`、`memoryDetail`、`navigationDetail` 对应详情页的补充视频。

目前仅 `perception` 接入实际录像。其他视频设置为 `null` 时显示概念示意与待更新标记，不会产生空播放器。感知视频封面从原始录像第 3 秒提取。

首页已有视频会静音、循环、行内自动播放，可以暂停；点击视频会在弹窗中接续当前播放位置，关闭后恢复此前正在播放的预览。详情页继续采用点击播放。

### 页面与样式

- `index.html`：页面入口与视频弹窗容器。
- `app.js`：页面渲染、模块路由、语言切换、论文筛选与视频交互。
- `styles.css`：颜色、排版、响应式布局及减少动画偏好支持。
- `assets/`：本地头像、论文插图、硬件照片、示意图与字体。来源见 [assets/SOURCES.md](assets/SOURCES.md)。

模块使用 `#/perception` 等 hash 路由，资源使用相对路径，方便后续部署到 GitHub Pages 的仓库子路径。当前尚未创建远程仓库或部署。

## 内容说明

- 感知硬件图片来自 RAG-3DSG 论文，当前感知方案采用用户提供的 multi-fastlio 与 LiDAR 修正深度配置。
- Memory 按 JITOMA、RAG-3DSG、PORTER 分别展示；概览中的输入输出是研究方法的模块级整理。
- Navigation 根据 PSG-Nav 摘要整理，负责人按论文第一作者选 Rufeng Chen。
- 首页三维场景、记忆图及导航路径是概念示意；实际实验演示通过视频呈现。
- 全部展示资源随站点保存在本地；运行页面无需连接字体或图片 CDN。外部论文及个人主页链接仍指向原站点。

## 设计约定

Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.

用标题、留白与布局表达层次，避免装饰性小字、坐标与重复提示；保留必要且易读的研究信息。后续修改遵循 [AGENTS.md](AGENTS.md)。总览页的三个红点均从模块流向 System。
