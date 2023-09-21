const user = async (req, res) => {
  await res.send("Hello World");
};

module.exports = {
  user,
};
