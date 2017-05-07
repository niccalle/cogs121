import React, { Component } from 'react';
import './RouteSearch.css';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


class Search extends Component{
    state = {
        waypoints: 0
    }
    render() {
        var along = [];
        for(var way = 0; way < this.state.waypoints; way++){
            along.push(this.createWayPoint(way));
        }
        return (
            <Form>
                <FormGroup>
                    <Row>
                        <Col md={12}>
                            <FormControl type="text"  className="search-box-input" placeholder="Start" id="start" onChange={this.props.handleChange}/>
                        </Col>
                    </Row>
                    {along}
                    <Row>
                        <Col md={12}>
                            <FormControl type="text" className="search-box-input" placeholder="End" id="end" onChange={this.props.handeChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Button bsStyle="warning" className="search-box-input" onClick={() => this.addWayPoint()} block>
                                +
                            </Button>
                        </Col>
                        <Col md={8}>
                            <Button bsStyle="success" className="search-box-input" onClick={this.props.handleClick} block>
                                Preview Route!
                            </Button>
                        </Col>
                    </Row>

                </FormGroup>
            </Form>
        )
    }

    addWayPoint() {
        this.setState({waypoints: this.state.waypoints + 1});
    }

    createWayPoint(way){
        return (
            <Row key={way}>
                <Col md={12}>
                    <FormControl type="text"  className="search-box-input" placeholder={"Stop " + way} id={"way"+way} onChange={this.props.handleChange}/>
                </Col>
            </Row>
        )
    }
}

export default Search;
