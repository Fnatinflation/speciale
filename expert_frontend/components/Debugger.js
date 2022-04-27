export default function Debugger(props) {

    return (
        < div style={{ padding: "10px", marginTop: "5px", height: "16vh", backgroundColor: "grey", overflow: "hidden" }} >

            <div style={{ overflowY: "scroll" }}>
                {
                    props.debugTexts.map((d, i) => {
                        return (
                            <p key={i} style={{ fontSize: "12px", padding: "0px", margin: "0px" }}>{d}</p>
                        )

                    })
                }
            </div>


        </div >
    )
}