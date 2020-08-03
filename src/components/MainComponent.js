import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

//state is obtained from store
//
const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),

    /**
     * Is a thunk that dispatchs
     * adding to dispatch to props so that it can be used
     */
    fetchDishes: () => { dispatch(fetchDishes())}
});


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        };
    }
    /**
     * LifeCycle method 
     * method called after view right after view is mounted
     */
    componentDidMount(){
        //calling fetch dises from matchDishes and loading to redux store
        this.props.fetchDishes();

    }


    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    //<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
    //<DishDetail dish={this.state.dishes.filter((dish) => dish.id == this.state.selectedDish)[0]} />

    render() {

        const HomePage = () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
                />
            );
        };


        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />    
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home" />
                </Switch>    

                

                

                <Footer/>
            </div>
        );
    }

}

//converts state from store to props of main component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />