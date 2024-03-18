
const { generateFile } = require("./ExecuteCode/generateFile");

(async () => {
  try {
    const path = await generateFile(
      "java",
      'public class Main { public static void main(String[] args) { System.out.println("Hello, world!"); } }'
    );
    console.log(path);
  } catch (error) {
    console.log(error);
  }
})();
