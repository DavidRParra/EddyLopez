module.exports = {
  apps : [{
    name: "Eddy-Lopez-Page",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production",
      PORT: 3010,
    },
  }]
};