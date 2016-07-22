import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap'

import NameAdderContainer from '../containers/NameAdderContainer'
import VisibleNameListContainer from '../containers/VisibleNameListContainer'
import FilterManager from './filterManager'

const style = {
    padding: 20,
    textAlign: 'center',
    display: 'inline-block'
};

export default React.createClass({
    render() {
        return (
            <div style={{textAlign: 'center', marginTop: 10}}>
                <Paper style={style} zDepth={2} >
                    <div style={{marginBottom: '25px'}}>
                        <Grid>
                            <Row>
                                <Col md={6} xs={12}>
                                    <NameAdderContainer style={{marginBottom: 20}}/>
                                </Col>
                                <Col md={6} xs={12}>
                                    <FilterManager />
                                </Col>
                            </Row>
                            <Clearfix/>
                        </Grid>
                    </div>
                    <Divider/>
                    <VisibleNameListContainer/>
                </Paper>
            </div>
        )
    }
});
