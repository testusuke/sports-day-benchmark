import {ReactFlow, Controls, Background} from "reactflow";
import 'reactflow/dist/style.css';
import React from "react";


export const Flow = () => {
    return (
        <>
            <ReactFlow>
                <Background/>
                <Controls/>
            </ReactFlow>
        </>
    )
}

export default Flow;