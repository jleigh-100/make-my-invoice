import React from "react";
import { Button } from "@mui/material";
import ExampleDoc from "../exampleTogglExport.csv";

const Header = () => {
    const [clicked, setClicked] = React.useState(false);
    return (
    <>
    <h1>MakeMyInvoice</h1>
        <a href={ExampleDoc} download="ExampleDoc" target='_blank'>
            <Button onClick={() => setClicked(true)}
            className={'download'}>
                {!clicked ? "Click to download an example Toggl Export file" : "Simply drag the download to the box below!"}
                </Button>
        </a>
    </>
    )
}

export default Header;