export const simulateApi = (data) => {
  return new Promise((resolve, reject) => {
    // 1–2 second delay
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      // 20% failure rate
      if (Math.random() < 0.2) {
        reject("Mock API Error");
      } else {
        resolve(data);
      }
    }, delay);
  });
};
