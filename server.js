require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// 配置CORS 
app.use(cors()); 

// 解析JSON请求体 
app.use(express.json()); 

// 提供静态文件服务
app.use(express.static('.')); 
 
// 高德地图Key - 建议存储在环境变量中 
const AMAP_KEY = process.env.AMAP_KEY || '834b0ef90a0c08500b7a24dfdd66cf9ef';
 
// 美团IP定位代理 
app.get('/api/ip-loc',  async (req, res) => {
    try {
        const { ip } = req.query; 
        if (!ip) {
            return res.status(400).json({  error: 'IP地址不能为空' });
        }
        
        const response = await axios.get(`https://apimobile.meituan.com/locate/v2/ip/loc?rgeo=true&ip=${ip}`); 
        res.json(response.data); 
    } catch (error) {
        console.error('IP 定位错误:', error);
        res.status(500).json({  error: '获取IP定位信息失败' });
    }
});
 
// 美团经纬度定位代理 
app.get('/api/latlng-loc',  async (req, res) => {
    try {
        const { lat, lng } = req.query; 
        if (!lat || !lng) {
            return res.status(400).json({  error: '经纬度不能为空' });
        }
        
        const response = await axios.get(`https://apimobile.meituan.com/group/v1/city/latlng/${lat},${lng}?tag=0`); 
        res.json(response.data); 
    } catch (error) {
        console.error(' 经纬度定位错误:', error);
        res.status(500).json({  error: '获取经纬度定位信息失败' });
    }
});
 
// 高德地图地理编码服务 
app.get('/api/amap/geocode',  async (req, res) => {
    try {
        const { address, city } = req.query; 
        if (!address) {
            return res.status(400).json({  error: '地址不能为空' });
        }
        
        const response = await axios.get(`https://restapi.amap.com/v3/geocode/geo`,  {
            params: {
                key: AMAP_KEY,
                address: address,
                city: city || ''
            }
        });
        res.json(response.data); 
    } catch (error) {
        console.error(' 地理编码错误:', error);
        res.status(500).json({  error: '地理编码失败' });
    }
});
 
// 高德地图逆地理编码服务 
app.get('/api/amap/regeocode',  async (req, res) => {
    try {
        const { lng, lat } = req.query; 
        if (!lng || !lat) {
            return res.status(400).json({  error: '经纬度不能为空' });
        }
        
        const response = await axios.get(`https://restapi.amap.com/v3/geocode/regeo`,  {
            params: {
                key: AMAP_KEY,
                location: `${lng},${lat}`,
                extensions: 'all'
            }
        });
        res.json(response.data); 
    } catch (error) {
        console.error(' 逆地理编码错误:', error);
        res.status(500).json({  error: '逆地理编码失败' });
    }
});
 
// 启动服务器 
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});