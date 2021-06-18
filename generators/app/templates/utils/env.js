const { envVersion = 'develop' } = __wxConfig;


/**
 * 环境映射关系
 * 小程序环境 - 蛮牛环境
 * develop(开发版) - testing(测试)
 * trial(体验版) - testing(测试)
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
    baseUrl: 'https://xxx-dev.manniuhealth.com',
  },
  test: {
    wxVersion: envVersion,
    maniuVersion: 'test',
    gateway: '/gateway',
    baseUrl: 'https://xxx-test.manniuhealth.com',
  },
  pre: {
    wxVersion: envVersion,
    maniuVersion: 'pre',
    gateway: '/gateway',
    baseUrl: 'https://xxx-pre.manniuhealth.com',
  },
  prod: {
    wxVersion: envVersion,
    maniuVersion: 'prod',
    gateway: '/gateway',
    baseUrl: 'https://xxx.manniuhealth.com',
  },
};

const envstr = envMap[envVersion];
const env = config[envstr];
console.log('当前环境 env:', env);

export default env;
