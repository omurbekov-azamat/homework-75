import React from 'react';
import {Button, Container, Grid, TextField} from "@mui/material";

function App() {
    return (
        <Container maxWidth='xl'>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField id="encode" label="Encode" name="encode" sx={{mr: 2}}/>
                    <Button type="button" color="primary" variant="contained">down</Button>
                </Grid>
                <Grid item xs>
                    <TextField id="password" label="Password" name="password"/>
                </Grid>
                <Grid item xs>
                    <TextField id="decode" label="Decode" name="decode" sx={{mr: 2}}/>
                    <Button type="button" color="secondary" variant="contained">up</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
