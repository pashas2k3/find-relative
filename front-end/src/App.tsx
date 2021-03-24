// import React from 'react';

// // Can use https://github.com/formium/formik to avoid using everything from first principles


// export class AppC extends React.Component<{date: Date}, {}> {
//   render(){
//     return(
//       <div>
//         <h2> It is {this.props.date.toLocaleTimeString()} </h2>
//       </div>
//     )
//   }
// }

// export class Toggle extends React.Component<{},{isToggleOn: boolean}> {
//   constructor(props:{}) {
//     super(props);
//     this.state = {isToggleOn: true};

//     // This binding is necessary to make `this` work in the callback
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     this.setState(state => ({
//       isToggleOn: !state.isToggleOn
//     }));
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         {this.state.isToggleOn ? 'ON' : 'OFF'}
//       </button>
//     );
//   }
// }


// // Is the way to launch a different page or affect a different UI component by hoisting the 
// // two components together into one class with the two states?
// // Or should we use some other mechanism to stitch event handlers?

// // Landing page - drop down to select from
// //  

// export class AppS extends React.Component<{}, {date: Date}>{
//   //@ts-ignore
//   timerID: ReturnType<typeof setInterval>;
//   constructor(props: {date: Date}){
//     super(props);
//     this.state = {date: new Date()};
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }
//   componentDidMount(){
//     this.timerID = setInterval(()=> this.tick(), 1000);
//   }
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }

// export const App: React.FC = ()=> {
//   return (
//     <div className="App">
//       hi
//     </div>
//   );
// }

// // export default App;
