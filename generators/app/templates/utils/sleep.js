
// 睡眠 (延时执行)
function sleep (n) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, n * 1000);
  });
}

export default sleep;
