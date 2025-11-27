const appStartTime = Date.now();

function getHealth(req, res) {
  const uptimeSeconds = Math.round((Date.now() - appStartTime) / 1000);

  console.log("this is my resp",uptimeSeconds)
  res.status(200).json({
    ok: true,
    version: '1.0',
    uptimeSeconds,
  });
}

module.exports = {
  getHealth,
};
