/**
 * 自定义业务级别的异常类
 */
class ServiceError extends Error {
  constructor (errors) {
    super(errors);
    this.name = 'ServiceError';
    this.errors = errors;
  }
}

export default ServiceError;
