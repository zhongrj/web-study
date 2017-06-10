"use strict";
// import React from 'react';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import './index.css';
//
// import Hello from './components/Hello';
// import Test1 from './components/Test1';
// import Test2 from './components/Test2';
//
// ReactDOM.render(
//     <Router>
//         <div>
//             <ul>
//                 <li><Link  to="/#hello">Hello</Link ></li>
//                 <li><Link  to="/#test1">Test1</Link ></li>
//                 <li><Link  to="/#test2">Test2</Link ></li>
//             </ul>
//
//             <hr/>
//
//             <Route path="#hello" component={Hello}/>
//             <Route path="/#test1" component={Test1}/>
//             <Route path="/#test2" component={Test2}/>
//         </div>
//     </Router>,
//     document.getElementById('root')
// );



import React from 'react';
import ReactDOM from 'react-dom';
import Test from "./Test";

ReactDOM.render(
    <Test/>,
    document.getElementById('root')
);


// import React from 'react'
// import {render} from 'react-dom'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'
//
// const Home = () => (
//     <div>
//         <h2>Home</h2>
//     </div>
// )
//
// const About = () => (
//     <div>
//         <h2>About</h2>
//     </div>
// )
//
// const Topic = ({ match }) => (
//     <div>
//         <h3>{match.params.topicId}</h3>
//     </div>
// )
//
// const Topics = ({ match }) => (
//     <div>
//         <h2>Topics</h2>
//         <ul>
//             <li>
//                 <Link to={`${match.url}/rendering`}>
//                     Rendering with React
//                 </Link>
//             </li>
//             <li>
//                 <Link to={`${match.url}/components`}>
//                     Components
//                 </Link>
//             </li>
//             <li>
//                 <Link to={`${match.url}/props-v-state`}>
//                     Props v. State
//                 </Link>
//             </li>
//         </ul>
//
//         <Route path={`${match.url}/:topicId`} component={Topic}/>
//         <Route exact path={match.url} render={() => (
//             <h3>Please select a topic.</h3>
//         )}/>
//     </div>
// )
//
// const BasicExample = () => (
//     <Router>
//         <div>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/topics">Topics</Link></li>
//             </ul>
//
//             <hr/>
//
//             <Route exact path="/" component={Home}/>
//             <Route path="/about" component={About}/>
//             <Route path="/topics" component={Topics}/>
//         </div>
//     </Router>
// )
// render(
//     <BasicExample />,
//     document.getElementById('root')
// )
