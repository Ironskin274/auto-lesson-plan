import md5 from 'md5';

// 定义请求配置的类型
interface RequestConfig {
    url: string;
    method: string;
    data?: string | Record<string, any>;
}

// 根据请求的地址，方式，参数，统一计算出当前请求的 md5 值作为 key
const getRequestKey = (config?: RequestConfig): string => {
    if (!config) {
        // 如果没有获取到请求的相关配置信息，根据时间戳生成
        return md5(new Date().toISOString());
    }

    const data = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
    return md5(config.url + '&' + config.method + '&' + data);
};

// 存储 key 值
const pending: Record<string, boolean> = {};

// 检查 key 值
const checkPending = (key: string): boolean => !!pending[key];

// 删除 key 值
const removePending = (key: string): void => {
    delete pending[key];
};

export {
    getRequestKey,
    pending,
    checkPending,
    removePending
};