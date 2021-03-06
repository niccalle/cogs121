import React, { Component } from 'react';
import './RouteSearch.css';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';


class Search extends Component{
    state = {
        waypoints: 0,
        start: "",
        end: "",
        ways: [],
        startSelected: false,
        endSelected: false
    }
    render() {
        var along = [];
        for(var way = 0; way < this.state.waypoints; way++){
            along.push(this.createWayPoint(way));
        }
        return (
            <Form>
                <FormGroup>
                    {
                //     <Row>
                //         <Col md={12}>
                //             <FormControl type="text"
                //                 className="search-box-input"
                //                 placeholder="Start"
                //                 id="start"
                //                 onChange={this.props.handleChange}/>
                //         </Col>
                //     </Row>
                //     {along}
                //     <Row>
                //         <Col md={12}>
                //             <FormControl type="text" className="search-box-input" placeholder="End" id="end" onChange={this.props.handleChange}/>
                //         </Col>
                //     </Row>
                }
                    <Row>
                        <Col md={12}>
                            <Geosuggest
                                ref={el=>this._geoSuggest=el}
                                placeholder="Start"
                                inputClassName="start-input"
                                style={{'input': {'borderColor': this.state.startSelected? 'palegreen' : ""}}}
                                onSuggestSelect={(e) => this.updateStart(e)}
                                />
                        </Col>
                    </Row>
                    {along}
                    <Row>
                        <Col md={12}>
                            <Geosuggest
                                placeholder="End"
                                initialValue={this.props.initialStart}
                                inputClassName="end-input"
                                style={{'input': {'borderColor': this.state.startSelected? 'palegreen' : ""}}}
                                onSuggestSelect={(e) => this.updateEnd(e)}/>
                        </Col>
                    </Row>

                    <Row>{
                        // <Col md={4}>
                        //     <Button bsStyle="warning" className="search-box-input" onClick={() => this.addWayPoint()} block>
                        //         +
                        //     </Button>
                        // </Col>
                      }
                        <Col md={12}>
                            {
                                this.state.startSelected && this.state.endSelected &&(
                                    <Button bsStyle="success" className="search-box-input" onClick={() => this.props.handleClick(this.state.start, this.state.end)} block>
                                        Preview Route!
                                    </Button>
                                )
                            }
                            {
                                (!this.state.startSelected || !this.state.endSelected) &&(
                                    <Button bsStyle="success" className="search-box-input" onClick={() => this.props.handleClick(this.state.start, this.state.end)} block disabled>
                                        Preview Route!
                                    </Button>
                                )
                            }

                        </Col>
                    </Row>

                </FormGroup>
            </Form>
        )
    }
    updateStart(e){
        this.setState({start: e.label, startSelected: true});
    }

    updateEnd(e){
        this.setState({end: e.label, endSelected: true});
    }
    addWayPoint() {
        this.setState({waypoints: this.state.waypoints + 1});
    }

    createWayPoint(way){
        return (
            <Row key={way}>
                <Col md={12}>
                    <Geosuggest
                        ref={el=>this._geoSuggest=el}
                        placeholder={"Stop " + way}
                        inputClassName="start-input"
                        style={{'input': {'borderColor': this.state.startSelected? 'palegreen' : ""}}}
                        onSuggestSelect={(e) => this.updateWay(e, way)}
                        />
                    <div className="remove-way" onClick={() => this.removeWay(way)}>X</div>
                </Col>
            </Row>
        )
    }

    removeWay(way){
        var waypoints = this.state.ways;
        waypoints.splice(way);
        this.setState({ways: waypoints, waypoints: this.state.waypoints - 1});
    }
    updateWay(e, way){
        var waypoints = this.state.ways;
        waypoints[way] = e.label;
        this.setState({ways: waypoints});
    }
}

export default Search;
