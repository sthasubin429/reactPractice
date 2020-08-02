import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button, Row, Col 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validRating = (val) => val >= 1 && val<6;

class CommentForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            isCommentOpen: false
        }

        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleCommentForm() {
        this.setState({
            isCommentOpen: !this.state.isCommentOpen
        });
    }

    handleSubmit(values) {
        this.toggleCommentForm();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleCommentForm}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

            <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleCommentForm} >
                <ModalHeader toggle={this.toggleCommentForm}> Submit Comment </ModalHeader>
                <ModalBody>
                        <LocalForm className="px-4" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                                <Control type="number" min="1" max="5" model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    validators={{
                                        required, isNumber, validRating
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Requred ',
                                        isNumber: 'Must be a Number',
                                        validRating: 'Rating Must be between 1 and 5'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" >Your Name</Label>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        required: 'Requred ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
    
}
   

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>

            </Card>
        </div>
    );
}

function RenderComments({comments}){
    if (comments != null){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm />
                
            </div>
        );
    }

    else{
        return (
            <div></div>
        );
    }
        
    
}



const DishDetail = (props)=> {

    if (props.dish != null)
            return (
                <div class="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>

                        
                    </div>

                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                        
                    </div>

                    
                </div>
            );

        return(
            <div></div>
        );
}



export default DishDetail;