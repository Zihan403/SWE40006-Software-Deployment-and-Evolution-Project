const app= require("./app");
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\t`);
  console.log(`Ctrl + click this URL: http://localhost:${PORT}/`);
  console.log('To stop the server, press Ctrl + C');
});
