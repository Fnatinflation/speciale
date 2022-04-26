import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import React from "react";
import { Button } from "react-bootstrap";

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    { ssr: false }
);
class EditorPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = { code: `function add(a, b) {\n  return a + b;\n}` }
    }

    render() {
        return (
            <div>
                <CodeEditor
                    value={this.props.code}
                    language="js"
                    placeholder="Please enter JS code."
                    onChange={(evn) => this.props.setCode(evn.target.value, this.props.index)}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        height: "60vh",
                        fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                    }}
                />
            </div >
        )
    }

} export default EditorPanel