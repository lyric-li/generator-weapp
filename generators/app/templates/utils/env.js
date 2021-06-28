const { envVersion = 'develop' } = __wxConfig;

/**
 * 环境映射关系
 * 小程序环境 - 环境
 * develop(开发版) - dev(开发)
 * trial(体验版) - test(测试)
 * release(正式版) - production(正式)
 */
const envMap = {
  'develop': 'dev', // 开发版
  'trial': 'test', // 体验版
  'release': 'prod', // 正式版
};

const config = {
  dev: {
    wxVersion: envVersion,
    maniuVersion: 'dev',
    gateway: '/gateway',
    baseUrl: 'https://xxx-dev.com',
  },
  test: {
    wxVersion: envVersion,
    maniuVersion: 'test',
    gateway: '/gateway',
    baseUrl: 'https://xxx-test.com',
  },
  pre: {
    wxVersion: envVersion,
    maniuVersion: 'pre',
    gateway: '/gateway',
    baseUrl: 'https://xxx-pre.com',
  },
  prod: {
    wxVersion: envVersion,
    maniuVersion: 'prod',
    gateway: '/gateway',
    baseUrl: 'https://xxx.com',
  },
};

const envstr = envMap[envVersion];
const env = config[envstr];
console.log('当前环境 env:', env);

export default env;
