import React from 'react';
import { makeStyles } from '@mui/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        minWidth: '600px',
        margin: '5px auto',
    },
    heading: {
        fontSize: '20rem',
        fontWeight: 'bold'
    },
    container: {
        backgroundColor: '#333',
        color: "#fff"
    }
}));

export default function HomeFAQ({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.container}
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{data.header}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.container}>
                    <Typography>
                        {data.body}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}