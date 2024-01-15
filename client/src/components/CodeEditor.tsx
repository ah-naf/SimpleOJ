import Codemirror, { EditorFromTextArea } from "codemirror";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/brace-fold"; // If using brace languages like JavaScript or C++
import "codemirror/addon/fold/comment-fold"; // Optional, for folding comment blocks
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css"; // For styling the fold gutter

import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/isotope.css";
import "codemirror/theme/juejin.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/zenburn.css";
// import "codemirror/theme"
// ...other imports

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCurrentCode } from "../store/CodeSlice";

interface PropType {
  language: string;
  codeStub: { [key: string]: string };
  onCodeChange?: (newCode: string) => void;
  disabled?: boolean;
  theme?: string;
}

export default function CodeEditor({
  language,
  codeStub,
  onCodeChange,
  disabled = false,
  theme = "neo",
}: PropType) {
  const editorRef = useRef<EditorFromTextArea>();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    if (disabled && editorRef.current) {
      editorRef.current.setValue(codeStub[language]);
    }
  }, [disabled, codeStub, language]);

  // In CodeEditor component
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption("theme", theme);
    }
    // other useEffect code
  }, [theme]);

  useEffect(() => {
    if (!editorRef.current) {
      const editorId = document.getElementById(
        "realtimeEditor"
      ) as HTMLTextAreaElement;
      editorRef.current = Codemirror.fromTextArea(editorId, {
        mode: getMode(language),
        theme: theme,
        autoCloseBrackets: true,
        lineNumbers: true,
        tabSize: 2,
        tabindex: 2,
        indentWithTabs: true,
        readOnly: disabled ? "nocursor" : false,
        foldGutter: true, // Enable fold gutter
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      });
    }
    if (!disabled) {
      editorRef.current.setOption("readOnly", disabled ? "nocursor" : false);
      const tempLang = localStorage.getItem(`${location}-language`) || language;
      const tempStub =
        JSON.parse(
          localStorage.getItem(`${location}-${tempLang}-code`) as string
        ) || codeStub[tempLang];

      editorRef.current?.getDoc().setValue(tempStub);

      editorRef.current.on("change", (instance, changes) => {
        const code = instance.getValue();
        if (onCodeChange) onCodeChange(code);

        if (changes.origin !== "setValue") {
          dispatch(setCurrentCode(code));
          const tempLang =
            localStorage.getItem(`${location}-language`) || "cpp";
          localStorage.setItem(
            `${location}-${tempLang}-code`,
            JSON.stringify(code)
          );
        }
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [language, codeStub, onCodeChange, disabled]);

  return <textarea id="realtimeEditor" />;
}

function getMode(language: string) {
  switch (language) {
    case "cpp":
      return "text/x-c++src";
    case "c":
      return "text/x-csrc";
    case "py":
      return "text/x-python";
    default:
      return "text/plain";
  }
}
