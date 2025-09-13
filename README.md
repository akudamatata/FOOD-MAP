# FOOD-MAP - Vercel部署版本

这是一个地理位置分析系统，已经修改为可以在Vercel上免费部署的版本。

## 项目特性

- IP地理定位查询
- 高德地图集成
- 美团API代理服务
- 响应式Web界面

## 部署到Vercel

### 1. 准备工作

确保你有以下账号：
- GitHub账号
- Vercel账号（可以用GitHub登录）

### 2. 上传代码到GitHub

1. 在GitHub上创建新仓库或使用现有仓库
2. 将修改后的代码推送到GitHub仓库

### 3. 在Vercel上部署

1. 访问 [Vercel官网](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的GitHub仓库 `FOOD-MAP`
5. 配置项目设置：
   - Framework Preset: 选择 "Other"
   - Build Command: `npm run build`
   - Output Directory: 留空
   - Install Command: `npm install`
6. 添加环境变量（可选）：
   - `AMAP_KEY`: 你的高德地图API密钥
7. 点击 "Deploy"

### 4. 环境变量配置

在Vercel项目设置中添加以下环境变量：

```
AMAP_KEY=你的高德地图API密钥
```

如果不设置，系统会使用默认的API密钥。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

访问 http://localhost:3000

## 项目结构

```
FOOD-MAP/
├── index.html          # 前端页面
├── server.js           # Node.js后端服务
├── package.json        # 项目配置
├── vercel.json         # Vercel部署配置
├── gps.env            # 环境变量文件
└── node_modules/       # 依赖包
```

## API接口

- `/api/ip-loc` - IP地理定位
- `/api/latlng-loc` - 经纬度定位
- `/api/amap/geocode` - 地理编码
- `/api/amap/regeocode` - 逆地理编码

## 技术栈

- 前端：HTML, CSS, JavaScript
- 后端：Node.js, Express
- 地图：高德地图API
- 部署：Vercel

## 注意事项

1. 确保所有API密钥都通过环境变量配置
2. 生产环境中建议使用自己的高德地图API密钥
3. 美团API可能有访问限制，建议在生产环境中替换为其他服务

## 故障排除

如果部署失败，请检查：
1. package.json中的依赖是否正确
2. vercel.json配置是否正确
3. 环境变量是否设置正确
4. 代码中是否有语法错误

