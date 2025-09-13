const axios = require("axios");

// 高德地图Key - 建议存储在环境变量中
const AMAP_KEY = process.env.AMAP_KEY || "834b0ef90a0c08500b7a24dfdd66cf9ef";

// 美团IP定位代理
module.exports = async (req, res) => {
  if (req.url.startsWith("/api/ip-loc")) {
    try {
      const { ip } = req.query;
      if (!ip) {
        return res.status(400).json({ error: "IP地址不能为空" });
      }

      const response = await axios.get(
        `https://apimobile.meituan.com/locate/v2/ip/loc?rgeo=true&ip=${ip}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("IP 定位错误:", error);
      res.status(500).json({ error: "获取IP定位信息失败" });
    }
  } else if (req.url.startsWith("/api/latlng-loc")) {
    try {
      const { lat, lng } = req.query;
      if (!lat || !lng) {
        return res.status(400).json({ error: "经纬度不能为空" });
      }

      const response = await axios.get(
        `https://apimobile.meituan.com/group/v1/city/latlng/${lat},${lng}?tag=0`
      );
      res.json(response.data);
    } catch (error) {
      console.error(" 经纬度定位错误:", error);
      res.status(500).json({ error: "获取经纬度定位信息失败" });
    }
  } else if (req.url.startsWith("/api/amap/geocode")) {
    try {
      const { address, city } = req.query;
      if (!address) {
        return res.status(400).json({ error: "地址不能为空" });
      }

      const response = await axios.get(
        `https://restapi.amap.com/v3/geocode/geo`,
        {
          params: {
            key: AMAP_KEY,
            address: address,
            city: city || "",
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(" 地理编码错误:", error);
      res.status(500).json({ error: "地理编码失败" });
    }
  } else if (req.url.startsWith("/api/amap/regeocode")) {
    try {
      const { lng, lat } = req.query;
      if (!lng || !lat) {
        return res.status(400).json({ error: "经纬度不能为空" });
      }

      const response = await axios.get(
        `https://restapi.amap.com/v3/geocode/regeo`,
        {
          params: {
            key: AMAP_KEY,
            location: `${lng},${lat}`,
            extensions: "all",
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(" 逆地理编码错误:", error);
      res.status(500).json({ error: "逆地理编码失败" });
    }
  } else if (req.url.startsWith("/api/domestic-ip")) {
    try {
      const { ip } = req.query;
      const apiUrl = ip ? `https://ip9.com.cn/get?ip=${ip}` : "https://ip9.com.cn/get";
      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      console.error("国内IP查询错误:", error);
      res.status(500).json({ error: "获取国内IP信息失败" });
    }
  } else if (req.url.startsWith("/api/international-ip")) {
    try {
      const { ip } = req.query;
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      res.json(response.data);
    } catch (error) {
      console.error("国外IP查询错误:", error);
      res.status(500).json({ error: "获取国外IP信息失败" });
    }
  } else {
    res.status(404).json({ error: "API endpoint not found" });
  }
};
