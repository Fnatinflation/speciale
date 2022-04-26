export default function Debugger(props) {

    return (
        < div style={{ height: "200px", overflow: "hidden" }} >

            <div style={{ overflowY: "scroll" }}>
                {
                    props.debugTexts.map(d => {
                        return (
                            <p style={{ padding: "0px", margin: "0px" }}>{d}</p>
                        )

                    })
                }
            </div>


        </div >
    )
}