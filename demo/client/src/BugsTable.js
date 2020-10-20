import * as R from 'ramda';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

export default function BugsTable(props){
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Created By</TableCell>
                    <TableCell align="right">Created On</TableCell>
                    <TableCell align="right">Modified On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                R.map(bug => (
                    <TableRow key={bug.id} hover>
                        <TableCell component="th" scope="row">
                            <Link onClick={ ()=> {
                                if(props.onBugSelected){ 
                                    props.onBugSelected({selectedBugId: bug.id})
                                } 
                            } }>
                                {bug.title}
                            </Link>
                        </TableCell>
                        <TableCell align="right">{bug.createdBy}</TableCell>
                        <TableCell align="right">{bug.createdOn}</TableCell>
                        <TableCell align="right">{bug.modifiedOn}</TableCell>
                    </TableRow> 
                ), props.bugs)
            }
            </TableBody>
            </Table>
        </TableContainer>
    )
}
