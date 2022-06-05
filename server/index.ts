import { Request, Response } from "express";

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/run", async (req: Request, res: Response) => {
  let { language = "cpp", code } = req.body as any;
//   code = `
// #include<bits/stdc++.h>
// using namespace std;
// int main() {
//     vector<int> v;
//     int n; cin>>n;
//     for(int i=0; i<n; i++) {
//         int x; cin>>x;
//         v.push_back(x);
//     }
//     for(int i=0; i<10000000; i++) {}
//     for(auto it: v) cout<<it<<" ";
// }
// `;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let output;
  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);
    // we need to run the file and send the response
    if (language === "cpp") output = await executeCpp(filepath);
    else output = await executePy(filepath);

    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening"));
