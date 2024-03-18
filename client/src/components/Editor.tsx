import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import stub from "../codeStub";
import { setCurrentCode, setCurrentLang } from "../store/CodeSlice";
import CodeEditor from "./CodeEditor";

export default function Editor() {
  const [language, setLanguage] = useState("cpp");
  const [stubs, setStubs] = useState(stub);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const [theme, setTheme] = useState("neo"); // Default theme

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "neo");
    const localLanguage = localStorage.getItem(`${location}-language`);
    let curLang = language;
    let localCode;
    if (localLanguage !== null) {
      setLanguage(localLanguage);
      curLang = localLanguage;
      localCode = JSON.parse(
        localStorage.getItem(`${location}-${localLanguage}-code`) as string
      );
    } else
      localCode = JSON.parse(
        localStorage.getItem(`${location}-${language}-code`) as string
      );
    const temp = { ...stubs };
    temp[curLang] = localCode || (stub[curLang] as string);
    setStubs(temp);
    dispatch(setCurrentCode(temp[curLang]));
    dispatch(setCurrentLang(curLang));
  }, [location]);

  return (
    <>
      <div className="space-x-4">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            localStorage.setItem(`${location}-language`, e.target.value);
            const curStub =
              JSON.parse(
                localStorage.getItem(
                  `${location}-${e.target.value}-code`
                ) as string
              ) || stubs[e.target.value];

            dispatch(setCurrentCode(curStub));
            dispatch(setCurrentLang(e.target.value));
          }}
          className="p-2 text-xs pr-4 rounded-md font-bold bg-transparent border border-gray-300"
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="c">C</option>
          <option value="java">Java</option>
        </select>
        <select
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
            localStorage.setItem("theme", e.target.value);
          }}
          className="p-2 text-xs pr-4 rounded-md font-bold bg-transparent border border-gray-300"
        >
          <option value="juejin">Juejin</option>
          <option value="isotope">Isotope</option>
          <option value="neo">Neo</option>
          <option value="zenburn">Zenburn</option>
        </select>
      </div>
      <CodeEditor language={language} codeStub={stubs} theme={theme} />
    </>
  );
}
