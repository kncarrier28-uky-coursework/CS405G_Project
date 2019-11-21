let apiUrl;
if (process.env.NODE_ENV === "production")
  apiUrl = "http://knca244.cs.uky.edu:3010";
else apiUrl = "http://localhost:3010";

export default apiUrl;
